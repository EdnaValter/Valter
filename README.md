# Valter Website

This repository contains the source for **Valter**, an informational website for web development collaboration and education.

Open `index.html` in a browser to get started. The site now features a responsive layout with a small JavaScript file (`script.js`) for navigation and form interactions. Pages include About, Services, and Contact along with a newsletter sign-up form.

## Running the optional email server

The project includes a small Node.js server (`server.js`) that sends emails for
the contact and newsletter forms. Create a `.env` file based on
`.env.example` with your SMTP credentials, then install dependencies and start
the server:

```bash
npm install
npm run server
```

The server listens on `PORT` (default `3000`) and exposes two endpoints under
`/api/contact` and `/api/newsletter`.
