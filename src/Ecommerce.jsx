import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center px-4">
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        🚀 Coming Soon
      </h1>

      <p className="text-xl md:text-2xl mb-8 max-w-xl">
        We are working hard to bring you an amazing shopping experience.
        Stay tuned!
      </p>

      <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg">
        <p className="text-lg font-semibold">
          Launching Very Soon ✨
        </p>
      </div>

      <p className="mt-10 text-sm opacity-80">
        © {new Date().getFullYear()} ShopHub. All rights reserved.
      </p>
    </div>
  );
}
