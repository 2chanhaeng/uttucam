# 🔥 UTTUCAM - AI Conversation Thermometer

**Emotion Temperature-Based Auto-Response Generator**
A fun yet practical AI-powered web app that analyzes the emotional tone of a message and recommends the most appropriate replies based on customizable response styles.

---

## 🧠 What is it?

**AI Conversation Thermometer** takes a user's input message (e.g., from a friend or coworker)  
→ analyzes the emotional "temperature" of the message (e.g., frustration, sadness, joy)  
→ visualizes it as a number (0°C to 100°C)  
→ and generates reply suggestions depending on the selected response strategy (empathize, calm, redirect, etc.).

---

## 🚀 Live Demo

(coming soon)

---

## ✨ Features

- 🔍 **Emotion Analysis**: Detect the emotion type and intensity from any free-text message.
- 🌡️ **Temperature Visualization**: Show emotional weight with a clear thermometer or progress bar.
- 🎯 **Response Style Selector**: Choose how you want to reply (e.g., Empathetic / Encouraging / Chill).
- 💬 **AI-Generated Replies**: Get 2-3 response suggestions tailored to the emotional context.
- 🧪 _(Optional)_: Predict how the chosen reply might impact the sender's emotion.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI / UX**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **AI / NLP**: [OpenAI](https://openai.com/)

---

## 📦 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/2chanhaeng/uttucam.git && cd ./uttucam

# 2. Install dependencies
yarn

# 3. Set up environment variables
# Add your API key and other settings
echo "
DATABASE_URL=***
DIRECT_URL=***
AUTH_SECRET=***
AUTH_GITHUB_ID=***
AUTH_GITHUB_SECRET=***
AUTH_DISCORD_ID=***
AUTH_DISCORD_SECRET=***
AUTH_RESEND_KEY=***
GOOGLE_GENERATIVE_AI_API_KEY=***
" >> .env.local

# 4. Generate Prisma client
yarn db:gen

# 5. Run the dev server
yarn dev
```

## Project Structure

- `/app`: Next.js App Router
- `/components`: Reusable UI components
- `/api`: Emotion analysis & response generation APIs
- `/types`: Shared TypeScript interfaces
- `/lib`: AI prompt logic and utils

## 🔒 Environment Variables (`.env.local`)

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 🧭 Roadmap

- [ ] Basic emotion analysis
- [ ] AI reply generation based on user-selected tone
- [ ] Emotional response simulation (change prediction)
- [ ] Share/export conversations
- [ ] Mobile-first UX enhancements
- [ ] Multi-language support

## 🤝 Contributing

Pull requests and ideas are welcome!
This project is a great playground for anyone interested in AI + UX experiments.

## 🙌 Acknowledgements

Inspired by human awkwardness, emotional friction, and the eternal struggle to text the “right thing.”
