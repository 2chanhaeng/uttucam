# 🔥 UTTUCAM - AI Conversation Helper

Uttucam is a AI assistant that helps you write better messages in conversations.
You can upload a screenshot of a chat room, and Uttucam will provide you with examples of answers that would work well in that conversation.

---

## 🚀 Live Demo

[uttucam.vercel.app](https://uttucam.vercel.app/)

---

## ✨ Features

- **AI-Powered**: Uses OpenAI's GPT-o4-mini to generate conversation suggestions.
- **Screenshot Upload**: Upload a screenshot of your chat room for context.
- **Text Suggestions**: Get multiple suggestions for responses based on the context of the conversation.
- **User-Friendly UI**: Built with Next.js and Tailwind CSS for a smooth user experience.

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
OPENAI_API_KEY=your_openai_api_key_here
" >> .env.local

# 4. Run the dev server
yarn dev
# or build and start
yarn build
yarn start
```

## Project Structure

- `/app`: Next.js App Router
- `/components`: Reusable UI components
- `/lib`: AI prompt logic and utils

## 🔒 Environment Variables (`.env.local`)

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 🤝 Contributing

Pull requests and ideas are welcome!
This project is a great playground for anyone interested in AI + UX experiments.

## 🙌 Acknowledgements

Inspired by human awkwardness, emotional friction, and the eternal struggle to text the “right thing.”
