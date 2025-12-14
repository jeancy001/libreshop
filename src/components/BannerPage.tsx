import React, { useEffect, useState } from "react";
import { Pubs } from "../constants/Pub";
import { motion, AnimatePresence } from "framer-motion";

interface PubsPro {
  pub: Pubs[];
}

const BannerPage: React.FC<PubsPro> = ({ pub }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!pub || pub.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % pub.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [pub]);

  if (!pub || pub.length === 0) return null;

  return (
    <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-xl bg-black">
      <AnimatePresence mode="wait">
        {pub.map(
          (p, index) =>
            index === current && (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Product Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                      {p.name}
                    </h2>
                    <p className="text-sm md:text-base text-gray-200 mt-1">
                      ${p.price}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs md:text-sm font-semibold bg-emerald-500/90 text-white shadow">
                    Disponible
                  </span>
                </div>

                {/* Contact Card */}
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 w-64">
                  <h3 className="text-gray-800 font-semibold text-lg mb-2 text-center">
                    Contactez-nous
                  </h3>
                  <p className="text-sm text-gray-700">
                    📞 <span className="font-medium">+254 707 983 256</span>
                  </p>
                  <p className="text-sm text-gray-700 mt-1 break-all">
                    ✉️{" "}
                    <a
                      href="mailto:ttelectronicsapril2025@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      ttelectronicsapril2025@gmail.com
                    </a>
                  </p>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {pub.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              idx === current
                ? "bg-red-600 scale-125"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerPage;