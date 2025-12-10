# Contributing to **LaBase Backend**

*Last updated: 2025‑07‑07*

---

## 1  Project Snapshot

LaBase runs on **Vertical Slice Architecture** with Node.js 18+, TypeScript and Prisma/PostgreSQL. Each HTTP action lives in its own folder:

```
/src/modules/<module>/<feature>/<endpoint>/
  controller.ts   // handler (pure function)
  service.ts      // use‑case logic
  schema.ts       // Zod validation
  dto.ts          // z.infer<typeof schema>
  route.ts        // Express router
```

---

## 2  Development Conventions

### 2.1 Commit messages

Use **Conventional Commits** + **Gitmoji** for a readable history.

Bad ▶️

```bash
git commit -m "Added something"
```

Good ✅

```bash
git commit -m "feat: :sparkles: add login-with-email endpoint"
```

References: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) · [Gitmoji](https://gitmoji.dev/)

### 2.2 Branch naming

```
git checkout -b <type>/<module>/<short-description-kebab>
```

Example:
  
```
feature/auth/login-with-email
```

Types: `feature`, `fix`, `hotfix`, `docs`, `chore`, `test`.

---

## 3  Endpoint Creation Flow

1. Design endpoint (HTTP verb + path).
2. Scaffold the five files shown above.
3. Write Supertest end‑to‑end tests.
4. Open a Pull Request for peer review.
5. Merge to `main`.

Stay consistent and keep it simple—happy coding! 🚀
