# kha-porto — Portfolio Site

Portfolio pribadi (Rakha / RAFazarikha) dibangun dengan Next.js App Router.

## Stack
- Next.js (App Router, `output: standalone`), React 19
- Tailwind CSS v4 + shadcn/ui
- framer-motion, next-themes (5 tema), recharts, react-github-calendar
- i18n manual: route `app/[lang]/` dengan locale `en` dan `id`

## Struktur
- `app/[lang]/` — halaman: home, about, projects, contact, dashboard
- `dictionaries/en.json`, `id.json` — terjemahan, dimuat via `getDictionary(lang)`
- `project_data/projects.json` — data proyek, dipisah per bahasa (`id` / `en`)
- `app/api/github`, `app/api/wakatime` — statistik untuk dashboard

## Environment Variables
| Variable | Keterangan |
|---|---|
| `NEXT_PUBLIC_APP_URL` | URL produksi (public, dibaca saat build) |
| `GITHUB_ACCESS_TOKEN` | Token GitHub untuk API statistik (runtime) |
| `WAKATIME_API_KEY` | API key Wakatime (runtime) |

Salin `.env` sendiri; file ini masuk `.gitignore` dan tidak pernah di-commit.

## Menjalankan Lokal
```bash
npm install
npm run dev   # http://localhost:3000 → redirect ke /en (default locale, lihat proxy.ts)
```

## Deploy (Docker + GitHub Actions)
1. Push ke `main` memicu workflow `.github/workflows/deploy.yml`.
2. Workflow SSH ke VM (`VM_HOST`, `VM_USERNAME`, `VM_SSH_KEY`, `VM_PORT`), inject secrets
   ke `.env` di VM, lalu `docker-compose up -d --build`.
3. `docker-compose.yml` build image dari `Dockerfile` (multi-stage: deps → builder → runner,
   image `node:24-alpine`, user non-root, standalone output) dan expose port 3000.
4. Image lama dibersihkan dengan `docker image prune -f`.

Catatan: build Next.js terjadi **di dalam VM** — pastikan RAM VM cukup. `NEXT_PUBLIC_APP_URL`
harus tersedia saat build (diteruskan sebagai build arg), variabel API lain dibaca saat runtime.

## Konvensi Kode
`AGENTS.md` dan `CLAUDE.md` di root repo: versi Next ini punya breaking changes — selalu cek
dokumentasi lokal di `node_modules/next/dist/docs/` sebelum menulis kode.
