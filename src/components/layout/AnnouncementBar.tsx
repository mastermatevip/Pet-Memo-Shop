"use client";

import { useState, useEffect } from "react";
import { ANNOUNCEMENTS } from "@/config/brand";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-btn text-btn-text text-center py-2.5 px-4 text-sm tracking-wide">
      <p className="transition-opacity duration-500">{ANNOUNCEMENTS[index]}</p>
    </div>
  );
}
