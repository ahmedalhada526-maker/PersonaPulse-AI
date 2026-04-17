# PersonaPulse AI - Master of Behavioral Psychology & Strategic Communication

PersonaPulse AI is an ultra-premium AI SaaS platform designed to analyze linguistic patterns, decode hidden subtext, and architect strategic responses using behavioral psychology.

## Features

- **Linguistic Forensics:** Identify personality traits (MBTI, Big Five, Enneagram).
- **Subtext Decoding:** Uncover hidden intentions and emotional triggers.
- **Strategic Response Architecture:** Generate tailored responses for specific goals.
- **Freemium Model:** 10 free daily scans with a Pro upgrade option.
- **Multilingual Support:** Full support for English and Arabic (RTL).
- **Premium UI:** Cinematic Dark Mode with Glassmorphism and Bento Grid layout.

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. Clone the repository (if applicable).
2. Install the dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create a `.env.local` file in the root directory.
2. Add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the port specified in your console).

## GitHub Deployment

To host this project on GitHub Pages:

1. Create a GitHub repository and push your code.
2. In the repository settings, go to **Settings > Secrets and variables > Actions**.
3. Create a **New repository secret** called `GEMINI_API_KEY` and paste your API key.
4. Go to **Settings > Pages** and ensure "Build and deployment" is set to use **GitHub Actions**.
5. Each push to the `main` branch will automatically build and deploy to the `gh-pages` branch.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS 4.
- **Animations:** Motion (formerly Framer Motion).
- **Icons:** Lucide React.
- **AI:** Google Gemini API (@google/genai).
- **Internationalization:** i18next.
