# Siddharthsinh Raulji — Portfolio

Matthew-style portfolio built with React + Vite + Tailwind CSS + Framer Motion.

## Tech Stack
- **React 18** — UI library
- **Vite 5** — build tool & dev server
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion 11** — animations & transitions
- **React Router DOM 6** — client-side routing

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Add your photo
# Place your photo (background removed, PNG) at:
# public/photo.png

# 3. Start dev server
npm run dev

# 4. Open browser
# http://localhost:5173
```

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Cursor.jsx      # Custom smooth cursor
│   ├── Navbar.jsx      # Floating white nav card
│   └── Footer.jsx      # Simple footer
├── sections/
│   ├── Hero.jsx        # Landing — big name + photo
│   ├── About.jsx       # About + skill tags
│   ├── Skills.jsx      # Tech stack with progress bars
│   ├── Projects.jsx    # Selected work list
│   └── Contact.jsx     # Contact form
├── pages/
│   └── HomePage.jsx    # Assembles all sections
├── App.jsx             # Router setup
├── main.jsx            # Entry point
└── index.css           # Tailwind + global styles
```

## Customization

### Change your photo
Replace `public/photo.png` with your own PNG (transparent background).
The image uses `mix-blend-mode: multiply` to blend into the background.

### Update nav links
Edit `src/components/Navbar.jsx` → `navLinks` array.

### Update projects
Edit `src/sections/Projects.jsx` → `projects` array.

### Update skills
Edit `src/sections/Skills.jsx` → `layers` array.

### Change colors
Edit `tailwind.config.js`:
```js
colors: {
  bg:  '#e8e6e1',  // page background (Matthew grey)
  ink: '#111110',  // text / dark elements
}
```

## Backend (Node.js)

The contact form is ready to connect to a Node.js backend.
Replace the `handleSubmit` in `Contact.jsx`:

```js
const handleSubmit = async (e) => {
  e.preventDefault()
  await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  setSent(true)
}
```

Create `server/index.js`:
```js
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
app.use(express.json())

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body
  // send email via nodemailer
  res.json({ ok: true })
})

app.listen(3001)
```
