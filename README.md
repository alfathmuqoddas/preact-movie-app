# Preact Movie App

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/~/github.com/alfathmuqoddas/preact-movie-app)

A fast, lightweight movie discovery application built with Preact, TypeScript, and Tailwind CSS. This app uses The Movie Database (TMDB) API to provide up-to-date information on movies and TV shows.

## 🚀 Features

- **Instant Search**: Search for movies and TV shows with a debounced, real-time dropdown.
- **Detailed Views**: Comprehensive information including overviews, cast, budget, revenue, and ratings.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS v4.
- **Fast Performance**: Powered by Preact and Vite for a minimal footprint and rapid loading.
- **State Management**: Uses Preact Signals for efficient, fine-grained reactivity.
- **Routing**: Client-side routing with `wouter-preact`.

## 🛠️ Tech Stack

- **Frontend**: [Preact](https://preactjs.com/)
- **State Management**: [@preact/signals](https://preactjs.com/guide/v10/signals)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [Wouter](https://github.com/molefrog/wouter)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **API**: [TMDB API](https://www.themoviedb.org/documentation/api)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)
- A TMDB API Key (Get one [here](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alfathmuqoddas/preact-movie-app.git
   cd preact-movie-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your TMDB API key:
   ```env
   VITE_API_KEY=your_tmdb_api_key_here
   ```

### Running Locally

```bash
pnpm dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
pnpm build
# or
npm run build
```

The production-ready files will be in the `dist` directory.

## 🐳 Docker Support

You can also run the application using Docker:

1. Build the image:
   ```bash
   docker build -t preact-movie-app .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 preact-movie-app
   ```

The app will be available at `http://localhost:8080`.

## 📂 Project Structure

- `src/assets`: Static assets and icons.
- `src/components`: Reusable UI components (cards, search bar, etc.).
- `src/hooks`: Custom hooks (e.g., `useFetch` for API calls).
- `src/layout`: Layout components.
- `src/pages`: Main application pages (Home, Search, Details, About).
- `src/store`: State management using Preact Signals.
- `public/`: Public assets.

## 📄 License

This project is open-source and available under the MIT License.
