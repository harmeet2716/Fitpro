import React, { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80",
  "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=1920&q=80",
];

export default function Layout({ children }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 overflow-hidden">
      {/* Background image slider */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}


      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Floating words */}
      <span
        className="absolute text-m text-gray-200 font-bold animate-float"
        style={{ top: "10%", left: "5%" }}
      >
        Create new account here!
      </span>
      <span
        className="absolute text-m text-gray-200 font-bold animate-float"
        style={{ top: "70%", left: "70%" }}
      >
        Thank you!
      </span>

      {/* Children content */}
      <div className="relative z-10 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
