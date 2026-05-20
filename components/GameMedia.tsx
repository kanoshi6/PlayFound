import type { CSSProperties } from "react";
import { Gamepad2 } from "lucide-react";

type Props = {
  gradient: string;
  title: string;
  className?: string;
  label?: string;
};

function isImageSource(value: string) {
  return value.startsWith("/") || /^https?:\/\//i.test(value);
}

export function GameMedia({ gradient, title, className = "", label }: Props) {
  const image = isImageSource(gradient);

  return (
    <div
      className={`media-frame ${className}`}
      style={image ? undefined : ({ "--media-gradient": gradient } as CSSProperties)}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={gradient} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 z-10 p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            {label ? (
              <span className="mb-2 inline-flex rounded-full border border-white/20 bg-black/28 px-2.5 py-1 text-xs font-black text-white backdrop-blur">
                {label}
              </span>
            ) : null}
            <p className="max-w-[14rem] text-lg font-black leading-tight text-white drop-shadow">
              {title}
            </p>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/20 bg-black/26 text-white backdrop-blur">
            <Gamepad2 size={18} />
          </span>
        </div>
      </div>
    </div>
  );
}
