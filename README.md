# 📚 Clean Books

A simple and powerful RESTful API built with TypeScript, Express, and Zod for managing books. Designed for performance, clarity, and maintainability.

---

## 🚀 Features

- ✅ **Express 5** for routing and middleware
- 🛡️ **Zod** for schema validation
- 🧪 **Vitest** for testing
- 🛠️ **Biome** for linting and formatting
- 🔄 **Nodemon** for development auto-reloading
- ⚙️ **TypeScript** for type safety

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) (v10.11.0 used)

---

## 📁 Project Structure

```bash
./
├──src/
|  ├── features/
|  │   └── books/
|  │       ├── api/
|  │       |   ├── router.ts
|  │       |   └── validation.ts
|  │       ├── domain/
|  │       |   └── books.ts
|  │       ├── infrastructure/
|  │       |   └── bookRepository.ts
|  │       ├── test/
|  │       |   └── createBook.test.ts
|  │       └── usecase/
|  │           └── createBook.ts
|  ├── app.ts
|  └── server.ts
├── .gitignore
├── biome.json
├── package.json
├── README.md
└── tsconfig.json
```


---

## 🛠️ Scripts

| Command         | Description                          |
|----------------|--------------------------------------|
| `pnpm dev`      | Run in development mode with nodemon |
| `pnpm build`    | Compile TypeScript to JavaScript     |
| `pnpm start`    | Start the production build           |
| `pnpm debug`    | Start with Node debugger enabled     |
| `pnpm lint`     | Run linter (Biome)                   |
| `pnpm format`   | Format code with Biome               |
| `pnpm test`     | Run tests using Vitest               |

---

## 🧪 Testing

This project uses **Vitest** for unit testing. To run the tests:

```bash
pnpm test
```
