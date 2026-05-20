export type Language = "ru" | "en";

export const translations = {
  ru: {
    meta: {
      languageName: "Русский"
    },
    nav: {
      home: "Главная",
      catalog: "Каталог",
      submit: "Добавить игру",
      developers: "Для разработчиков",
      about: "О проекте",
      support: "Поддержка",
      admin: "Админка",
      login: "Войти",
      register: "Регистрация",
      logout: "Выйти",
      myGames: "Мои игры",
      settings: "Настройки",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню"
    },
    common: {
      brandTagline: "Инди-открытия",
      watchGames: "Смотреть игры",
      addGame: "Добавить игру",
      forDevelopers: "Для разработчиков",
      details: "Подробнее",
      inWishlist: "В wishlist",
      wishlisted: "В wishlist",
      goToGame: "Перейти к игре",
      leaveReview: "Оставить отзыв",
      audienceInterest: "интерес аудитории",
      rating: "рейтинг",
      free: "Бесплатная",
      paid: "Платная",
      all: "Все",
      from: "от",
      month: "мес.",
      open: "Открыть",
      reset: "Сбросить",
      games: "игр",
      wishlist: "Wishlist",
      platform: "Платформа",
      status: "Статус",
      genre: "Жанр",
      price: "Цена"
    },
    genres: {
      horror: "Хоррор",
      rpg: "RPG",
      platformer: "Платформер",
      survival: "Выживание",
      puzzle: "Головоломка",
      visualNovel: "Визуальная новелла",
      strategy: "Стратегия",
      roguelike: "Рогалик"
    },
    statuses: {
      demo: "Демо",
      development: "В разработке",
      earlyAccess: "Ранний доступ",
      release: "Релиз"
    },
    sort: {
      newest: "Новые",
      popular: "Популярные",
      demos: "Демо",
      releases: "Релизы"
    },
    home: {
      heroEyebrow: "От демо до релиза",
      title: "PlayFound — место, где находят новые инди-игры",
      subtitle:
        "Помогаем разработчикам получить первых игроков, отзывы и внимание, а игрокам — находить интересные инди-проекты раньше остальных.",
      liveStats: ["12 игр в каталоге", "4 новых демо", "96% интерес недели"],
      weekTitle: "Игры недели",
      weekText:
        "Подборка проектов, которые уже можно показать друзьям, добавить в wishlist и обсудить с авторами.",
      demoTitle: "Новые демо",
      demoText:
        "Быстрый способ найти игру раньше остальных и помочь инди-разработчику получить первых игроков.",
      whyTitle: "Почему PlayFound",
      whyText:
        "Мы собираем русскоязычные инди-проекты в одном месте и даем им понятный путь от первой карточки до релизной кампании.",
      whyItems: [
        "Каталог, где игроки видят статус, платформы, демо и ссылки без лишнего шума.",
        "Медиа-формат: подборки, обзоры, интервью и закрепы помогают играм получать первые просмотры.",
        "Wishlist и интерес аудитории показывают, какие проекты стоит двигать дальше."
      ],
      howTitle: "Как это работает",
      howSteps: [
        {
          title: "Разработчик добавляет игру",
          text: "Карточка, демо, ссылки, скриншоты и короткая подача проекта."
        },
        {
          title: "Игроки находят открытия",
          text: "Фильтры, подборки и wishlist помогают быстро собрать личный список ожидания."
        },
        {
          title: "Проект растет",
          text: "Отзывы, публикации и промо-пакеты готовят игру к релизу."
        }
      ],
      playersTitle: "Для игроков",
      playersText:
        "Находите новые игры до хайпа, сохраняйте интересные демо и поддерживайте авторов обратной связью.",
      devsTitle: "Для разработчиков",
      devsText:
        "Получайте первые просмотры, тестируйте демо, собирайте отзывы и готовьте аудиторию без огромного бюджета.",
      futureTitle: "Будущее платформы",
      futureText:
        "PlayFound не является магазином игр на первом этапе. Но архитектура и бренд уже готовятся к будущей игровой витрине с профилями, отзывами, wishlists, лаунчером и собственными страницами разработчиков.",
      futureItems: ["Профили", "Отзывы", "Wishlists", "Лаунчер"],
      pricingTitle: "Тарифы продвижения",
      pricingText:
        "Мягкие пакеты для разных стадий: от бесплатной карточки до релизной серии публикаций.",
      viewCatalog: "Открыть каталог"
    },
    catalog: {
      eyebrow: "Каталог PlayFound",
      title: "Игры, которые можно найти раньше остальных",
      subtitle:
        "Ищите демо, релизы и проекты в разработке. Фильтры работают на mock data, wishlist сохраняется в браузере.",
      searchLabel: "Поиск по названию",
      searchPlaceholder: "Например, Taiga или Cosmodrome",
      genreLabel: "Жанр",
      platformLabel: "Платформа",
      statusLabel: "Статус",
      priceLabel: "Бесплатная/платная",
      sortLabel: "Сортировка",
      results: "Найдено",
      emptyTitle: "Ничего не найдено",
      emptyText: "Попробуйте сбросить фильтры или изменить поисковый запрос.",
      clearFilters: "Сбросить фильтры"
    },
    game: {
      screenshots: "Скриншоты",
      about: "Описание",
      whyTry: "Почему стоит попробовать",
      requirements: "Системные требования",
      minimum: "Минимальные",
      recommended: "Рекомендуемые",
      links: "Ссылки",
      similar: "Похожие игры",
      reviewToast: "Спасибо! В прототипе отзыв не отправляется, но место под механику уже есть.",
      pcOnly: "Для Web/Android версии системные требования не требуются.",
      added: "Игра добавлена в wishlist.",
      removed: "Игра удалена из wishlist."
    },
    submit: {
      eyebrow: "Заявка разработчика",
      title: "Добавить игру на PlayFound",
      subtitle:
        "Расскажите о проекте так, чтобы игроки быстро поняли жанр, стадию и причину добавить игру в wishlist.",
      fields: {
        title: "Название игры",
        genre: "Жанр",
        platform: "Платформа",
        status: "Статус разработки",
        gameLink: "Ссылка на игру",
        trailerLink: "Ссылка на трейлер",
        short: "Краткое описание",
        full: "Подробное описание",
        contact: "Контакт разработчика",
        screenshots: "Ссылка на скриншоты"
      },
      placeholders: {
        title: "Например, Signal From Taiga",
        gameLink: "Steam, VK Play, itch.io, RuStore или сайт",
        trailerLink: "YouTube/VK Video ссылка",
        short: "1-2 предложения для карточки каталога",
        full: "Что делает игру интересной, кому она подойдет, какая стадия разработки",
        contact: "Email, Telegram или VK",
        screenshots: "Папка, диск или публичная страница с материалами"
      },
      agreement:
        "Я согласен с правилами публикации и понимаю, что заявка отправляется на ручное рассмотрение.",
      submit: "Отправить на рассмотрение",
      success: "Заявка отправлена. Команда PlayFound свяжется с вами.",
      prototypeNote: "Данные остаются в прототипе и не отправляются на сервер.",
      noteTitle: "Что ускорит публикацию",
      noteItems: [
        "Покажите геймплей или демо, даже если проект еще сырой.",
        "Напишите честный статус: демо, ранний доступ, релиз или разработка.",
        "Добавьте ссылки, где игрок сможет поддержать проект или оставить отзыв."
      ]
    },
    support: {
      eyebrow: "Поддержка игроков",
      title: "Поможем с PlayFound, wishlist и страницами игр",
      subtitle:
        "Если что-то не работает, нужна помощь с карточкой игры или хочется предложить улучшение платформы, отправьте обращение. В прототипе оно попадет в локальную админку.",
      fields: {
        name: "Имя",
        contact: "Контакт",
        category: "Тема",
        priority: "Приоритет",
        subject: "Короткая тема",
        message: "Сообщение"
      },
      placeholders: {
        name: "Как к вам обращаться",
        contact: "Email, Telegram или VK",
        subject: "Например, wishlist не сохранился",
        message: "Опишите ситуацию, страницу игры или ожидаемое поведение"
      },
      categories: {
        account: "Аккаунт",
        wishlist: "Wishlist",
        gamePage: "Страница игры",
        developer: "Вопрос разработчика",
        other: "Другое"
      },
      priorities: {
        normal: "Обычный",
        high: "Срочный"
      },
      helpTitle: "Чем помогает поддержка",
      helpItems: [
        "Разбираем проблемы с wishlist, фильтрами и страницами игр.",
        "Принимаем предложения по каталогу и будущим функциям платформы.",
        "Передаем команде PlayFound сигналы от игроков и разработчиков."
      ],
      submit: "Отправить в поддержку",
      success: "Обращение создано. Оно появилось в админке PlayFound.",
      prototypeNote: "Обращение сохраняется локально в браузере, без отправки на сервер."
    },
    admin: {
      eyebrow: "Панель команды",
      title: "Админка PlayFound",
      subtitle:
        "Очередь заявок разработчиков и поддержка игроков в одном месте. Это mock-панель: статусы и заметки сохраняются в localStorage.",
      refresh: "Обновить",
      demoData: "Демо-данные",
      submissions: "Заявки игр",
      tickets: "Поддержка",
      users: "Игроки",
      developerRequests: "Заявки разработчиков",
      filter: "Фильтр",
      all: "Все",
      approve: "Принять",
      reject: "Отклонить",
      backToReview: "На рассмотрение",
      open: "Открыть",
      markInProgress: "В работу",
      markResolved: "Закрыть",
      approveDeveloper: "Подтвердить разработчика",
      messageToPlayer: "Сообщение игроку",
      messagePlaceholder: "Напишите короткое сообщение для игрока",
      sendMessage: "Отправить сообщение",
      moderation: "Модерация аккаунта",
      ban: "Забанить",
      unban: "Разбанить",
      banReason: "Причина бана",
      banReasonPlaceholder: "Причина, которую увидит команда",
      defaultBanReason: "Нарушение правил PlayFound",
      adminMessages: "Сообщения от админа",
      noMessages: "Сообщений пока нет.",
      verified: "Подтвержден",
      notVerified: "Не подтвержден",
      banned: "Забанен",
      active: "Активен",
      verificationCode: "Код",
      developerRequestText:
        "Игрок хочет получить профиль разработчика и отправлять игры на модерацию.",
      adminNote: "Внутренняя заметка",
      notePlaceholder: "Например: попросить новый трейлер или уточнить ссылку",
      description: "Описание",
      contact: "Контакт",
      player: "Игрок",
      link: "Ссылка",
      trailer: "Трейлер",
      created: "Создано",
      emptySubmissions: "Заявок пока нет. Отправьте игру или добавьте демо-данные.",
      emptyTickets: "Обращений пока нет. Отправьте запрос в поддержку или добавьте демо-данные.",
      emptyUsers: "Зарегистрированных игроков пока нет.",
      emptyDeveloperRequests: "Заявок на разработчика пока нет.",
      localOnly:
        "Важно: это client-only прототип с mock-авторизацией в localStorage. Для продакшена сюда нужно подключить базу данных, безопасные роли, уведомления и историю действий.",
      metrics: {
        pending: "На рассмотрении",
        approved: "Принято",
        openTickets: "Активные обращения",
        players: "Игроки",
        developerRequests: "Заявки разработчиков"
      },
      statuses: {
        submission: {
          pending: "На рассмотрении",
          approved: "Принято",
          rejected: "Отклонено"
        },
        ticket: {
          open: "Открыто",
          inProgress: "В работе",
          resolved: "Закрыто"
        },
        developerRequest: {
          pending: "На рассмотрении",
          approved: "Подтвержден",
          rejected: "Отклонен"
        }
      }
    },
    auth: {
      loginTitle: "Войти в PlayFound",
      loginSubtitle:
        "Войдите как игрок, разработчик или админ PlayFound. Сессия сохранится после перезагрузки.",
      registerTitle: "Создать аккаунт игрока",
      registerSubtitle:
        "Сначала создается аккаунт игрока. После регистрации подтвердите контакт 6-значным кодом.",
      verifyTitle: "Подтвердите аккаунт",
      verifySubtitle:
        "Мы отправили 6-значный код на контакт, который вы указали при регистрации.",
      verificationCode: "6-значный код",
      codeSent: "Код отправлен на контакт",
      demoCode: "Код для прототипа",
      verifyAction: "Подтвердить аккаунт",
      username: "Логин",
      displayName: "Имя",
      contact: "Контакт",
      password: "Пароль",
      usernamePlaceholder: "Например, player_found",
      displayNamePlaceholder: "Как вас показывать на сайте",
      contactPlaceholder: "Email, Telegram или VK",
      passwordPlaceholder: "Пароль для прототипа",
      submitLogin: "Войти",
      submitRegister: "Создать аккаунт",
      noAccount: "Нет аккаунта?",
      hasAccount: "Уже есть аккаунт?",
      createAccount: "Создать аккаунт",
      goLogin: "Войти",
      adminHint: "Админ-доступ скрыт от публичного интерфейса.",
      mockWarning:
        "Это mock-авторизация: пароли и сессии сохраняются в localStorage только для демонстрации.",
      errors: {
        missingFields: "Заполните все обязательные поля.",
        usernameTaken: "Такой логин уже занят.",
        invalidCredentials: "Неверный логин или пароль.",
        notAuthenticated: "Сначала войдите в аккаунт.",
        invalidCode: "Неверный код подтверждения.",
        accountNotVerified: "Аккаунт еще не подтвержден. Завершите регистрацию кодом.",
        accountBanned: "Аккаунт заблокирован администратором.",
        developerRequestExists: "Заявка разработчика уже отправлена."
      },
      roles: {
        player: "Игрок",
        developer: "Разработчик",
        admin: "Админ"
      },
      access: {
        loginRequiredTitle: "Нужен вход",
        loginRequiredText: "Чтобы продолжить, войдите или создайте аккаунт.",
        developerRequiredTitle: "Нужен аккаунт разработчика",
        developerRequiredText:
          "Добавлять игры можно только после подтверждения заявки разработчика.",
        adminRequiredTitle: "Доступ только для админа",
        adminRequiredText:
          "Войдите в аккаунт администратора, чтобы открыть панель команды."
      }
    },
    developerArea: {
      becomeTitle: "Станьте разработчиком PlayFound",
      becomeText:
        "У вас уже есть аккаунт игрока. Создайте связанный профиль разработчика, чтобы отправлять игры и смотреть активность.",
      guestTitle: "Нужен аккаунт игрока",
      guestText:
        "Сначала войдите или зарегистрируйтесь, затем отправьте заявку разработчика в нижней части настроек.",
      becomeAction: "Стать разработчиком",
      requestTitle: "Заявка на профиль разработчика",
      requestText:
        "Теперь developer-доступ выдается после модерации. Кнопка заявки спрятана внизу настроек сайта.",
      requestPendingTitle: "Заявка уже на рассмотрении",
      requestPendingText:
        "Админ PlayFound проверит аккаунт и подтвердит профиль разработчика, если все хорошо.",
      requestPendingBadge: "Ожидает решения админа",
      requestSettingsBadge: "Откройте настройки в header",
      developerReady: "Профиль разработчика активен",
      developerReadyText:
        "Теперь вы можете добавлять игры и отслеживать активность в кабинете.",
      myGamesTitle: "Мои игры",
      myGamesSubtitle:
        "Здесь собраны ваши заявки, статусы модерации и первые сигналы интереса аудитории.",
      emptyTitle: "Игр пока нет",
      emptyText: "Отправьте первую игру на рассмотрение, и она появится здесь.",
      views: "Просмотры",
      wishlistAdds: "Wishlist",
      feedback: "Отзывы",
      interest: "Интерес",
      events: "Последние события",
      ownerOnlyNote:
        "Кабинет показывает только игры текущего профиля разработчика.",
      goDevelopers: "Для разработчиков"
    },
    developers: {
      eyebrow: "Площадка внимания",
      title: "От первых игроков до релизной кампании",
      subtitle:
        "PlayFound помогает инди-разработчикам получить первые просмотры, собрать обратную связь и подготовить игру к следующему этапу.",
      benefits: [
        "Получите первых игроков",
        "Соберите отзывы",
        "Попадите в подборки",
        "Протестируйте демо",
        "Подготовьтесь к релизу",
        "Получите продвижение без огромного бюджета"
      ],
      flowTitle: "Что получает разработчик",
      flow: [
        {
          title: "Понятная карточка",
          text: "Жанр, платформы, статус, ссылки, теги и причина попробовать игру."
        },
        {
          title: "Промо без давления",
          text: "Подборки, закрепы, обзоры и интервью работают как медиа, а не как агрессивная реклама."
        },
        {
          title: "Сигналы интереса",
          text: "Wishlist, просмотры и реакции помогают понять, что улучшать перед релизом."
        }
      ],
      pricingTitle: "Тарифы",
      priceNote: "Цены тестовые и могут меняться по мере роста площадки.",
      ctaTitle: "Готовы показать игру?",
      ctaText:
        "Отправьте заявку, а мы поможем оформить проект так, чтобы игроки поняли его сильную сторону с первого экрана."
    },
    pricing: {
      free: {
        name: "Free",
        price: "0 ₽",
        text: "Карточка в каталоге",
        features: ["Базовая карточка", "Ссылки на площадки", "Теги и статус"]
      },
      start: {
        name: "Start",
        price: "990 ₽",
        text: "Публикация игры",
        features: ["Расширенная карточка", "Попадание в новые игры", "Советы по подаче"]
      },
      promo: {
        name: "Promo",
        price: "2990 ₽",
        text: "Обзор + закреп",
        features: ["Мини-обзор", "Закреп в подборке", "Промо в соцсетях"]
      },
      launch: {
        name: "Launch",
        price: "7990 ₽",
        text: "Серия публикаций + интервью + подборка",
        features: ["План релиза", "Интервью", "Серия материалов"]
      }
    },
    about: {
      eyebrow: "О PlayFound",
      title: "Площадка для новых игровых открытий",
      intro:
        "PlayFound — это медиа, каталог и стартовая площадка для русскоязычных инди-игр. Мы не строим магазин на первом шаге: сначала помогаем проектам получить внимание, а игрокам — находить интересные демо и релизы.",
      sections: [
        {
          title: "Почему проект создан",
          text: "Многие небольшие игры теряются между крупными релизами и алгоритмами больших площадок. PlayFound дает им отдельную витрину внимания."
        },
        {
          title: "Что получают разработчики",
          text: "Первые игроки, отзывы, wishlists, публикации и понятный способ проверить интерес до большого маркетингового бюджета."
        },
        {
          title: "Что получают игроки",
          text: "Живой каталог русскоязычного инди, демо раньше остальных, короткие описания без шума и возможность поддержать авторов."
        },
        {
          title: "Куда движется платформа",
          text: "В будущем PlayFound может стать полноценной игровой витриной с профилями, отзывами, wishlists, лаунчером и инструментами для разработчиков."
        }
      ],
      valuesTitle: "Принципы",
      values: ["Честная стадия проекта", "Уважение к игроку", "Поддержка малых команд", "От демо до релиза"]
    },
    settings: {
      title: "Настройки",
      subtitle: "Персонализация сохраняется в localStorage.",
      language: "Язык",
      theme: "Тема",
      compact: "Компактные карточки",
      compactText: "Больше игр помещается на экран каталога.",
      reduceAnimations: "Уменьшить анимации",
      reduceAnimationsText: "Переходы станут спокойнее.",
      darkGreen: "Dark Green",
      pureDark: "Pure Dark",
      light: "Light",
      developerAccessTitle: "Заявка разработчика",
      developerAccessText:
        "Отправьте заявку администратору. После подтверждения появятся «Мои игры» и доступ к отправке проектов.",
      developerAccessAction: "Отправить заявку",
      developerAccessPending: "Заявка на рассмотрении",
      developerAccessPendingText:
        "Админ видит вашу заявку в панели PlayFound и может подтвердить профиль разработчика.",
      developerAccessReady: "Профиль разработчика активен",
      developerAccessReadyText:
        "Вы можете отправлять игры и смотреть активность в кабинете.",
      developerAccessGuest:
        "Сначала войдите или создайте аккаунт игрока, затем отправьте заявку разработчика.",
      close: "Закрыть"
    },
    footer: {
      text: "PlayFound — медиа + каталог + площадка внимания для русскоязычных инди-игр.",
      disclaimer:
        "PlayFound не является магазином игр на первом этапе. Мы помогаем игрокам находить инди-проекты, а разработчикам — получать внимание.",
      contacts: "Контакты",
      socials: "Соцсети",
      email: "hello@playfound.ru"
    },
    notFound: {
      title: "Эта игра еще не найдена",
      text: "Возможно, карточка пока на рассмотрении или ссылка устарела.",
      action: "Вернуться в каталог"
    }
  },
  en: {
    meta: {
      languageName: "English"
    },
    nav: {
      home: "Home",
      catalog: "Catalog",
      submit: "Add game",
      developers: "For developers",
      about: "About",
      support: "Support",
      admin: "Admin",
      login: "Login",
      register: "Register",
      logout: "Logout",
      myGames: "My games",
      settings: "Settings",
      openMenu: "Open menu",
      closeMenu: "Close menu"
    },
    common: {
      brandTagline: "Indie discovery",
      watchGames: "Browse games",
      addGame: "Add game",
      forDevelopers: "For developers",
      details: "Details",
      inWishlist: "Wishlist",
      wishlisted: "Wishlisted",
      goToGame: "Go to game",
      leaveReview: "Leave review",
      audienceInterest: "audience interest",
      rating: "rating",
      free: "Free",
      paid: "Paid",
      all: "All",
      from: "from",
      month: "mo.",
      open: "Open",
      reset: "Reset",
      games: "games",
      wishlist: "Wishlist",
      platform: "Platform",
      status: "Status",
      genre: "Genre",
      price: "Price"
    },
    genres: {
      horror: "Horror",
      rpg: "RPG",
      platformer: "Platformer",
      survival: "Survival",
      puzzle: "Puzzle",
      visualNovel: "Visual novel",
      strategy: "Strategy",
      roguelike: "Roguelike"
    },
    statuses: {
      demo: "Demo",
      development: "In development",
      earlyAccess: "Early access",
      release: "Release"
    },
    sort: {
      newest: "Newest",
      popular: "Popular",
      demos: "Demos",
      releases: "Releases"
    },
    home: {
      heroEyebrow: "From demo to release",
      title: "PlayFound is where new indie games get found",
      subtitle:
        "We help developers get first players, feedback and attention, while players discover promising indie projects before everyone else.",
      liveStats: ["12 catalog games", "4 new demos", "96% weekly interest"],
      weekTitle: "Games of the week",
      weekText:
        "A curated set of projects you can share, wishlist and discuss with their creators right now.",
      demoTitle: "New demos",
      demoText:
        "A fast way to find a game early and help an indie developer get first players.",
      whyTitle: "Why PlayFound",
      whyText:
        "We gather Russian-speaking indie projects in one place and give them a clear path from first card to release campaign.",
      whyItems: [
        "A catalog where players see status, platforms, demos and links without noise.",
        "Media format: lists, reviews, interviews and pinned spots help games earn first views.",
        "Wishlist and audience interest show which projects deserve the next push."
      ],
      howTitle: "How it works",
      howSteps: [
        {
          title: "A developer adds a game",
          text: "Card, demo, links, screenshots and a short project pitch."
        },
        {
          title: "Players find discoveries",
          text: "Filters, collections and wishlist make it easy to build a personal watchlist."
        },
        {
          title: "The project grows",
          text: "Feedback, posts and promo packages prepare the game for release."
        }
      ],
      playersTitle: "For players",
      playersText:
        "Find new games before the hype, save promising demos and support creators with feedback.",
      devsTitle: "For developers",
      devsText:
        "Get first views, test demos, collect feedback and build an audience without a huge budget.",
      futureTitle: "Future platform",
      futureText:
        "PlayFound is not a game store at the first stage. But the product and brand are already prepared for a future game showcase with profiles, reviews, wishlists, launcher and developer pages.",
      futureItems: ["Profiles", "Reviews", "Wishlists", "Launcher"],
      pricingTitle: "Promotion plans",
      pricingText:
        "Soft packages for different stages: from a free card to a release publication series.",
      viewCatalog: "Open catalog"
    },
    catalog: {
      eyebrow: "PlayFound catalog",
      title: "Games to discover before everyone else",
      subtitle:
        "Search demos, releases and projects in development. Filters run on mock data, wishlist is stored in your browser.",
      searchLabel: "Search by title",
      searchPlaceholder: "Try Taiga or Cosmodrome",
      genreLabel: "Genre",
      platformLabel: "Platform",
      statusLabel: "Status",
      priceLabel: "Free/paid",
      sortLabel: "Sort",
      results: "Found",
      emptyTitle: "No games found",
      emptyText: "Try resetting filters or changing the search query.",
      clearFilters: "Clear filters"
    },
    game: {
      screenshots: "Screenshots",
      about: "About",
      whyTry: "Why try it",
      requirements: "System requirements",
      minimum: "Minimum",
      recommended: "Recommended",
      links: "Links",
      similar: "Similar games",
      reviewToast: "Thanks! Reviews are not submitted in the prototype yet, but the feature slot is ready.",
      pcOnly: "Web/Android versions do not require system requirements.",
      added: "Game added to wishlist.",
      removed: "Game removed from wishlist."
    },
    submit: {
      eyebrow: "Developer submission",
      title: "Add a game to PlayFound",
      subtitle:
        "Pitch your project so players quickly understand the genre, stage and reason to wishlist it.",
      fields: {
        title: "Game title",
        genre: "Genre",
        platform: "Platform",
        status: "Development status",
        gameLink: "Game link",
        trailerLink: "Trailer link",
        short: "Short description",
        full: "Full description",
        contact: "Developer contact",
        screenshots: "Screenshots link"
      },
      placeholders: {
        title: "For example, Signal From Taiga",
        gameLink: "Steam, VK Play, itch.io, RuStore or website",
        trailerLink: "YouTube/VK Video link",
        short: "1-2 sentences for the catalog card",
        full: "What makes the game interesting, who it is for, current development stage",
        contact: "Email, Telegram or VK",
        screenshots: "Folder, drive or public page with materials"
      },
      agreement:
        "I agree with publishing rules and understand that submissions are manually reviewed.",
      submit: "Send for review",
      success: "Submission sent. The PlayFound team will contact you.",
      prototypeNote: "Data stays in the prototype and is not sent to a server.",
      noteTitle: "What speeds up publishing",
      noteItems: [
        "Show gameplay or a demo, even if the project is still rough.",
        "Be honest about the status: demo, early access, release or development.",
        "Add links where players can support the project or leave feedback."
      ]
    },
    support: {
      eyebrow: "Player support",
      title: "Help with PlayFound, wishlist and game pages",
      subtitle:
        "If something breaks, you need help with a game page or want to suggest a platform improvement, send a ticket. In the prototype it goes to the local admin panel.",
      fields: {
        name: "Name",
        contact: "Contact",
        category: "Topic",
        priority: "Priority",
        subject: "Short subject",
        message: "Message"
      },
      placeholders: {
        name: "How should we call you",
        contact: "Email, Telegram or VK",
        subject: "For example, wishlist did not save",
        message: "Describe the situation, game page or expected behavior"
      },
      categories: {
        account: "Account",
        wishlist: "Wishlist",
        gamePage: "Game page",
        developer: "Developer question",
        other: "Other"
      },
      priorities: {
        normal: "Normal",
        high: "High"
      },
      helpTitle: "What support handles",
      helpItems: [
        "Issues with wishlist, filters and game pages.",
        "Suggestions for catalog and future platform features.",
        "Signals from players and developers for the PlayFound team."
      ],
      submit: "Send to support",
      success: "Ticket created. It is now visible in the PlayFound admin panel.",
      prototypeNote: "The ticket is saved locally in the browser, without a server."
    },
    admin: {
      eyebrow: "Team panel",
      title: "PlayFound admin",
      subtitle:
        "Developer submissions and player support in one place. This is a mock panel: statuses and notes are saved in localStorage.",
      refresh: "Refresh",
      demoData: "Demo data",
      submissions: "Game submissions",
      tickets: "Support",
      users: "Players",
      developerRequests: "Developer requests",
      filter: "Filter",
      all: "All",
      approve: "Approve",
      reject: "Reject",
      backToReview: "Back to review",
      open: "Open",
      markInProgress: "In progress",
      markResolved: "Resolve",
      approveDeveloper: "Approve developer",
      messageToPlayer: "Message to player",
      messagePlaceholder: "Write a short message for the player",
      sendMessage: "Send message",
      moderation: "Account moderation",
      ban: "Ban",
      unban: "Unban",
      banReason: "Ban reason",
      banReasonPlaceholder: "Reason visible to the team",
      defaultBanReason: "PlayFound rules violation",
      adminMessages: "Admin messages",
      noMessages: "No messages yet.",
      verified: "Verified",
      notVerified: "Not verified",
      banned: "Banned",
      active: "Active",
      verificationCode: "Code",
      developerRequestText:
        "The player wants a developer profile and access to submit games for moderation.",
      adminNote: "Internal note",
      notePlaceholder: "For example: ask for a new trailer or verify a link",
      description: "Description",
      contact: "Contact",
      player: "Player",
      link: "Link",
      trailer: "Trailer",
      created: "Created",
      emptySubmissions: "No submissions yet. Send a game or add demo data.",
      emptyTickets: "No tickets yet. Send a support request or add demo data.",
      emptyUsers: "No registered players yet.",
      emptyDeveloperRequests: "No developer requests yet.",
      localOnly:
        "Important: this is a client-only prototype with mock localStorage auth. Production needs a database, secure roles, notifications and action history.",
      metrics: {
        pending: "Pending",
        approved: "Approved",
        openTickets: "Active tickets",
        players: "Players",
        developerRequests: "Developer requests"
      },
      statuses: {
        submission: {
          pending: "Pending",
          approved: "Approved",
          rejected: "Rejected"
        },
        ticket: {
          open: "Open",
          inProgress: "In progress",
          resolved: "Resolved"
        },
        developerRequest: {
          pending: "Pending",
          approved: "Approved",
          rejected: "Rejected"
        }
      }
    },
    auth: {
      loginTitle: "Login to PlayFound",
      loginSubtitle:
        "Sign in as a player, developer or PlayFound admin. The session persists after reload.",
      registerTitle: "Create player account",
      registerSubtitle:
        "Registration creates a player account first. Confirm your contact with a 6-digit code after signup.",
      verifyTitle: "Verify your account",
      verifySubtitle:
        "We sent a 6-digit code to the contact you entered during registration.",
      verificationCode: "6-digit code",
      codeSent: "Code sent to contact",
      demoCode: "Prototype code",
      verifyAction: "Verify account",
      username: "Username",
      displayName: "Display name",
      contact: "Contact",
      password: "Password",
      usernamePlaceholder: "For example, player_found",
      displayNamePlaceholder: "How to show you on the site",
      contactPlaceholder: "Email, Telegram or VK",
      passwordPlaceholder: "Prototype password",
      submitLogin: "Login",
      submitRegister: "Create account",
      noAccount: "No account?",
      hasAccount: "Already have an account?",
      createAccount: "Create account",
      goLogin: "Login",
      adminHint: "Admin access is hidden from the public interface.",
      mockWarning:
        "This is mock auth: passwords and sessions are stored in localStorage for demo only.",
      errors: {
        missingFields: "Fill all required fields.",
        usernameTaken: "This username is already taken.",
        invalidCredentials: "Invalid username or password.",
        notAuthenticated: "Sign in first.",
        invalidCode: "Invalid verification code.",
        accountNotVerified: "Account is not verified yet. Finish signup with the code.",
        accountBanned: "This account was banned by an administrator.",
        developerRequestExists: "Developer request has already been sent."
      },
      roles: {
        player: "Player",
        developer: "Developer",
        admin: "Admin"
      },
      access: {
        loginRequiredTitle: "Login required",
        loginRequiredText: "Sign in or create an account to continue.",
        developerRequiredTitle: "Developer account required",
        developerRequiredText:
          "You can add games only after the developer request is approved.",
        adminRequiredTitle: "Admin access only",
        adminRequiredText:
          "Sign in with an administrator account to open the team panel."
      }
    },
    developerArea: {
      becomeTitle: "Become a PlayFound developer",
      becomeText:
        "You already have a player account. Create a linked developer profile to submit games and track activity.",
      guestTitle: "Player account required",
      guestText:
        "Sign in or register first, then send a developer request from the bottom of settings.",
      becomeAction: "Become developer",
      requestTitle: "Developer profile request",
      requestText:
        "Developer access is now granted after moderation. The request button lives at the bottom of site settings.",
      requestPendingTitle: "Request is under review",
      requestPendingText:
        "A PlayFound admin will check the account and approve the developer profile if everything is fine.",
      requestPendingBadge: "Waiting for admin decision",
      requestSettingsBadge: "Open settings in the header",
      developerReady: "Developer profile is active",
      developerReadyText:
        "You can now add games and track activity from your dashboard.",
      myGamesTitle: "My games",
      myGamesSubtitle:
        "Your submissions, moderation statuses and first audience interest signals live here.",
      emptyTitle: "No games yet",
      emptyText: "Submit your first game for review and it will appear here.",
      views: "Views",
      wishlistAdds: "Wishlist",
      feedback: "Feedback",
      interest: "Interest",
      events: "Recent events",
      ownerOnlyNote:
        "The dashboard shows only games from the current developer profile.",
      goDevelopers: "For developers"
    },
    developers: {
      eyebrow: "Attention platform",
      title: "From first players to release campaign",
      subtitle:
        "PlayFound helps indie developers get first views, collect feedback and prepare the game for the next stage.",
      benefits: [
        "Get first players",
        "Collect feedback",
        "Enter collections",
        "Test a demo",
        "Prepare for release",
        "Promote without a huge budget"
      ],
      flowTitle: "What developers get",
      flow: [
        {
          title: "Clear game card",
          text: "Genre, platforms, status, links, tags and the reason to try the game."
        },
        {
          title: "Promotion without pressure",
          text: "Collections, pinned spots, reviews and interviews work as media, not aggressive ads."
        },
        {
          title: "Signals of interest",
          text: "Wishlist, views and reactions help understand what to improve before release."
        }
      ],
      pricingTitle: "Plans",
      priceNote: "Prices are test values and may change as the platform grows.",
      ctaTitle: "Ready to show your game?",
      ctaText:
        "Send a submission and we will help shape the project so players understand its strongest hook from the first screen."
    },
    pricing: {
      free: {
        name: "Free",
        price: "0 ₽",
        text: "Catalog card",
        features: ["Basic card", "Platform links", "Tags and status"]
      },
      start: {
        name: "Start",
        price: "990 ₽",
        text: "Game publication",
        features: ["Expanded card", "New games placement", "Pitch advice"]
      },
      promo: {
        name: "Promo",
        price: "2990 ₽",
        text: "Review + pinned spot",
        features: ["Mini review", "Pinned collection slot", "Social promo"]
      },
      launch: {
        name: "Launch",
        price: "7990 ₽",
        text: "Publication series + interview + collection",
        features: ["Release plan", "Interview", "Content series"]
      }
    },
    about: {
      eyebrow: "About PlayFound",
      title: "A platform for new game discoveries",
      intro:
        "PlayFound is media, catalog and an attention platform for Russian-speaking indie games. We are not building a store on step one: first we help projects get attention and players find promising demos and releases.",
      sections: [
        {
          title: "Why it exists",
          text: "Many small games disappear between big releases and large-platform algorithms. PlayFound gives them a dedicated attention showcase."
        },
        {
          title: "What developers get",
          text: "First players, feedback, wishlists, publications and a clear way to test interest before a major marketing budget."
        },
        {
          title: "What players get",
          text: "A living catalog of Russian-speaking indie games, demos before everyone else, short low-noise descriptions and a way to support creators."
        },
        {
          title: "Where it goes",
          text: "In the future PlayFound can become a full game showcase with profiles, reviews, wishlists, launcher and developer tools."
        }
      ],
      valuesTitle: "Principles",
      values: ["Honest project stage", "Respect for players", "Support for small teams", "From demo to release"]
    },
    settings: {
      title: "Settings",
      subtitle: "Personalization is saved in localStorage.",
      language: "Language",
      theme: "Theme",
      compact: "Compact cards",
      compactText: "Fit more games on catalog screens.",
      reduceAnimations: "Reduce animations",
      reduceAnimationsText: "Transitions become calmer.",
      darkGreen: "Dark Green",
      pureDark: "Pure Dark",
      light: "Light",
      developerAccessTitle: "Developer request",
      developerAccessText:
        "Send a request to the administrator. After approval, My games and project submission access will appear.",
      developerAccessAction: "Send request",
      developerAccessPending: "Request under review",
      developerAccessPendingText:
        "The admin sees your request in the PlayFound panel and can approve the developer profile.",
      developerAccessReady: "Developer profile active",
      developerAccessReadyText:
        "You can submit games and track activity in your dashboard.",
      developerAccessGuest:
        "Sign in or create a player account first, then send a developer request.",
      close: "Close"
    },
    footer: {
      text: "PlayFound is media + catalog + attention platform for Russian-speaking indie games.",
      disclaimer:
        "PlayFound is not a game store at the first stage. We help players find indie projects and developers earn attention.",
      contacts: "Contacts",
      socials: "Socials",
      email: "hello@playfound.ru"
    },
    notFound: {
      title: "This game is not found yet",
      text: "Maybe the card is still under review or the link is outdated.",
      action: "Back to catalog"
    }
  }
} as const;

export type Translation = (typeof translations)[Language];
