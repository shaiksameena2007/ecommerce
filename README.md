# Myntra Clone - Modern eCommerce Website

A modern and fully functional e-commerce web application, inspired by Myntra. This project provides a comprehensive online shopping experience with a clean user interface, seamless navigation, and smooth animations.

## 🚀 Features

- **Product Discovery**: Browse a wide range of products with dedicated pages for Home, Shop, and detailed Product Views.
- **Cart & Wishlist**: Easily add products to your cart for checkout or save them to your wishlist for later.
- **User Authentication**: Secure Login and Signup flows for user accounts.
- **Checkout Process**: Streamlined checkout experience for placing orders.
- **User Dashboard**: Dedicated Profile section for managing user details, Order Tracking, and Return Requests.
- **Interactive UI**:
  - Fully responsive design for all screen sizes.
  - Smooth page transitions and element animations using Framer Motion.
  - Interactive ChatBot component for customer assistance.

## 💻 Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 📂 Project Structure

```text
src/
├── components/      # Reusable UI components (Navbar, Footer, ChatBot, etc.)
├── context/         # React Context for global state management
├── pages/           # Application pages (Home, Shop, Cart, Profile, etc.)
├── utils/           # Utility functions and helpers
├── App.jsx          # Main application component
├── AppRouter.jsx    # Centralized routing configuration
├── index.css        # Global CSS and Tailwind directives
└── main.jsx         # Application entry point
```

## 🛠️ Installation & Setup

1. **Clone the repository** (or download the source code):
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**:
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173/` by default.

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the app into static files for production in the `dist/` directory.
- `npm run preview`: Previews the production build locally.

## 📄 License

This project is licensed under the MIT License.
