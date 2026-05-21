import { NextRequest, NextResponse } from "next/server";

type SendCodeBody = {
  contact?: string;
  code?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isCode(value: string) {
  return /^\d{6}$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SendCodeBody;
    const contact = body.contact?.trim() ?? "";
    const code = body.code?.trim() ?? "";

    if (!isEmail(contact)) {
      return NextResponse.json({ ok: false, error: "Введите корректный email." }, { status: 400 });
    }

    if (!isCode(code)) {
      return NextResponse.json({ ok: false, error: "Код подтверждения должен состоять из 6 цифр." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM;

    if (!apiKey || !from || apiKey === "disabled") {
      return NextResponse.json({ ok: false, error: "Почтовый провайдер не настроен." }, { status: 503 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [contact],
        subject: "Код подтверждения PlayFound",
        text: `Ваш код PlayFound: ${code}. Код действует 10 минут.`,
        html: `
          <div style="font-family:Arial,sans-serif;background:#050906;color:#eef8ef;padding:24px;border-radius:18px">
            <h1 style="color:#9af2bf;margin:0 0 12px">PlayFound</h1>
            <p style="font-size:16px;line-height:1.5">Ваш код подтверждения:</p>
            <div style="font-size:34px;font-weight:800;letter-spacing:6px;color:#38d574;margin:18px 0">${code}</div>
            <p style="color:#9fb3a6">Код действует 10 минут. Если вы не создавали аккаунт, просто игнорируйте письмо.</p>
          </div>
        `
      })
    });

    if (!response.ok) {
      const details = await response.text();
      return NextResponse.json({ ok: false, error: details }, { status: response.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось отправить код.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
