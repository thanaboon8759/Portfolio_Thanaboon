# Thanaboon Thongprada portfolio

Personal portfolio site, live at https://thanaboon8759.github.io/Portfolio_Thanaboon/

Built with Vite, React and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Run the content tests:

```bash
npm test
```

## Edit content

Projects, the featured project, certificates, skills and the timeline all live in `src/data.ts`.
PDFs and images go in `public/images/`.

## Deploy

Push to `main`. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the site and publishes it.
The repo's Settings → Pages → Source must be set to "GitHub Actions".
