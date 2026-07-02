"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function AnnouncementBar() {
  const t = useTranslations("announcements");
  const announcements = [t("0"), t("1"), t("2")];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div className="bg-btn text-btn-text text-center py-2.5 px-4 text-sm tracking-wide">
      <p className="transition-opacity duration-500">{announcements[index]}</p>
    </div>
  );
}
