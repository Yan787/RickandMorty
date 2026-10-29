# React Practice 1

Учебное приложение на React и TypeScript: пользователи, посты и комментарии из API. Использует React Router, SCSS и Vite.

## Запуск

В папке проекта выполните:

```sh
yarn install --frozen-lockfile
yarn dev
```

Откройте адрес из вывода Vite. В `.env` должна быть переменная `VITE_API_JPH_URL` — базовый адрес API с ресурсами `/users`, `/posts` и `/comments`. Конфигурация читается в `src/shared/config/env.ts`.

| Команда | Назначение |
| --- | --- |
| `yarn dev` | Сервер разработки |
| `yarn build` | Проверка TypeScript и сборка в `dist/` |
| `yarn preview` | Просмотр готовой сборки |
| `yarn lint` | Проверка ESLint |

## Маршруты

| Адрес | Поведение |
| --- | --- |
| `/` | Кнопка «Начать», ведущая на `/content/users` |
| `/content` | Перенаправление на `/content/users` |
| `/content/users` | Пользователи |
| `/content/posts` | Посты с раскрывающимися комментариями |
| `/content/comments` | Все комментарии |
| `/content/*` | Неизвестный раздел внутри страницы контента |
| Остальные адреса | Страница 404 |

## Компоненты

Все указанные props обязательны. «Нет» в колонке тестов означает отсутствие автоматических тестов в репозитории, а не успешный тестовый прогон.

| Компонент и файл | Для чего нужен | Что принимает (props) | Имеет тесты |
| --- | --- | --- | --- |
| `App` — `src/app/App.tsx` | Определяет маршруты, страницы и перенаправление | Без props. Требует роутер, подключённый в `src/main.tsx` | Нет |
| `WelcomePage` — `src/pages/welcome/ui/WelcomePage.tsx` | Показывает кнопку перехода к пользователям | Без props. Требует роутер для `Link` | Нет |
| `ContentPage` — `src/pages/content/ui/ContentPage.tsx` | Показывает вкладки и выбранную секцию; собирает URL API | `tab: TabName` — выбранный раздел | Нет |
| `NotFoundPage` — `src/pages/not-found/ui/NotFoundPage.tsx` | Показывает `404 not found` | Без props | Нет |
| `Tab` — `src/pages/content/ui/Tab.tsx` | Ссылка на `/content/${tabName}` с выделением активной вкладки | `tabName: TabName`; `children: string` — подпись. Требует роутер | Нет |
| `SectionShell<T>` — `src/shared/ui/SectionShell.tsx` | Загружает массив и выводит загрузку, ошибку либо список | `url: string`; `renderFunc: (item: T) => React.ReactNode` — отображение элемента. Возвращаемый элемент должен иметь стабильный `key` | Нет |
| `UsersSection` — `src/pages/content/ui/UsersSection.tsx` | Через `SectionShell` показывает имя, email, телефон и компанию | `url: string` — адрес API с ответом `User[]` | Нет |
| `PostsSection` — `src/pages/content/ui/PostsSection.tsx` | Через `SectionShell` показывает карточки постов | `url: string` — адрес API с ответом `Post[]` | Нет |
| `CommentsSection` — `src/pages/content/ui/CommentsSection.tsx` | Через `SectionShell` показывает email, заголовок и текст комментариев | `url: string` — адрес API с ответом `Comment[]` | Нет |
| `PostCard` — `src/pages/content/ui/PostCard.tsx` | Показывает пост и кнопку раскрытия комментариев; хранит `isActive` | `post: Post` — объект поста | Нет |
| `PostComments` — `src/pages/content/ui/PostComments.tsx` | Загружает `/comments?postId=…`; показывает комментарии, загрузку и ошибки | `postId: number`. Базовый URL берёт из конфигурации | Нет |
| `Loader` — `src/shared/ui/Loader.tsx` | Показывает `Loading...` | Без props | Нет |
| `Error` — `src/shared/ui/Error.tsx` | Показывает сообщение со стилем ошибки | `children: string` — текст сообщения | Нет |
| `UnknownSection` — `src/pages/content/ui/UnknownSection.tsx` | Выводит «Не найдена такая страница» через `Error` | Без props | Нет |

При скрытии комментариев `PostComments` размонтируется и отменяет запрос. При повторном раскрытии выполняется новый запрос: кэширования нет.

## Типы данных

Объявлены в `src/entities/user/model/types.ts`, `src/entities/post/model/types.ts` и `src/entities/comment/model/types.ts`:

- `Post`: `userId: number`, `id: number`, `title: string`, `body: string`.
- `Comment`: `postId: number`, `id: number`, `name: string`, `email: string`, `body: string`.
- `User`: `id: number`; строки `name`, `username`, `email`, `phone`, `website`; `address` со строками `street`, `suite`, `city`, `zipcode` и `geo: { lat: string; lng: string }`; `company` со строками `name`, `catchPhrase`, `bs`.

`TabName` из `src/pages/content/model/types.ts`: `"users" | "posts" | "comments" | "unknown"`.

Типы TypeScript не проверяют структуру ответа API во время выполнения.

## Хук useFetch

`src/shared/api/useFetch.ts` экспортирует `useFetch<T>(url: string)`. Выполняет GET-запрос при монтировании и изменении URL.

| Возвращаемое поле | Тип | Назначение |
| --- | --- | --- |
| `data` | `T \| null` | Полученные данные; изначально `null` |
| `isLoading` | `boolean` | Признак загрузки; изначально `true` |
| `error` | `string \| null` | HTTP-ошибка или сообщение сетевой ошибки |

Хранит URL вместе с результатом. Пока текущий URL отличается от URL сохранённого результата, возвращает `data: null`, `error: null` и `isLoading: true` без синхронного сброса состояния в эффекте. Использует `AbortController` для отмены запроса при изменении URL или размонтировании; отменённые запросы не обновляют состояние. При возврате к URL последнего сохранённого результата показывает этот результат во время нового запроса. Повторная загрузка без изменения URL не предусмотрена. Тестов хука нет.

## Проверка чистоты и качества кода

Проверено 29 октября 2026 года. Под чистотой здесь понимаются отсутствие побочных эффектов при рендере и поддерживаемость исходников.

### Чистота рендера

При ручном просмотре не обнаружены запросы, изменения внешних данных или прямые изменения DOM во время рендера компонентов. Запросы выполняются в `useEffect` хука `useFetch`, состояние `PostCard` меняется обработчиком нажатия.

`SectionShell`, секции списков и `PostComments` зависят от состояния загрузки; `PostCard` имеет локальное состояние. `App`, `Tab` и `WelcomePage` используют контекст роутера. Их результат зависит не только от props, поэтому это не математически чистые функции только от входных параметров. Наличие состояния и эффектов само по себе не нарушает чистоту рендера React.

### Автоматические проверки

| Проверка | Результат |
| --- | --- |
| `yarn build` | Успешно: проверка TypeScript и production-сборка Vite |
| `yarn lint` | Успешно: ошибок и предупреждений ESLint нет |
| Автоматические тесты | Нет тестовых файлов, конфигурации тестового раннера и команды `test` в `package.json` |

Успешная сборка не подтверждает правильность поведения в браузере. TypeScript переведён на версию 6.0.3, совместимую с установленным `typescript-eslint`. Синхронный сброс состояния в эффекте `useFetch` устранён; проверка ESLint проходит.

### Замечания по исходникам

- `CommentsSection` и `PostComments` повторяют разметку комментария: можно выделить общий компонент.
- `SectionShell` и `PostComments` не показывают сообщение для пустого массива. В `SectionShell` также нет явного завершающего `return null` для отсутствующих данных.
- `useFetch` приводит ответ к `T` без проверки структуры. Некорректный ответ может вызвать ошибку отображения. Наличие `VITE_API_JPH_URL` также не проверяется.
- В `NotFoundPage` используются inline-стили вместо общего SCSS. В импортах смешаны пути с расширением `.tsx` и без него.
- Для доступности можно добавить `role="status"` у загрузки, `role="alert"` у ошибки и `aria-expanded` у кнопки комментариев.

### Рекомендуемые тесты

- `useFetch`: успешный ответ, HTTP- и сетевая ошибки, отмена запроса и смена URL.
- `SectionShell`: загрузка, ошибка, пустой массив и вывод списка.
- `PostCard` / `PostComments`: раскрытие, скрытие, правильный `postId` и отмена запроса при скрытии.
- Маршруты и `Tab`: переходы, активная вкладка, перенаправление `/content` и оба вида неизвестных адресов.
- Секции списков: вывод полей пользователя, поста и комментария на тестовых данных.

## Структура FSD

```text
src/
  app/                 # Маршруты, глобальные стили, публичный App
  pages/
    welcome/           # Стартовая страница
    content/           # Вкладки, списки, раскрытие комментариев
    not-found/         # Страница 404
  entities/
    user/model/        # Тип пользователя
    post/model/        # Тип поста
    comment/model/     # Тип комментария
  shared/
    api/               # useFetch
    config/            # Настройки API
    ui/                # Loader, Error, SectionShell
  main.tsx             # Подключение React и BrowserRouter
```

Импорты направлены вниз: `app → pages → entities → shared` (промежуточные слои можно пропускать). Слайсы одного слоя не импортируют друг друга. Внешние потребители используют публичные `index.ts` слайсов и сегментов Shared; внутри слайса допустимы прямые относительные импорты. Тип вкладок принадлежит `pages/content/model`. Слои `features` и `widgets` пока не нужны: композиция списков и раскрытие комментариев используются только на странице контента.

Правила структуры: [документация Feature-Sliced Design](https://feature-sliced.design/docs/concepts/app-splitting).
