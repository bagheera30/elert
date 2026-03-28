// components/AlertBox.tsx
"use client";

import { AlertData } from "@/lib/types";
import { Heart, DollarSign, Crown, Users, Monitor } from "lucide-react";

interface AlertBoxProps {
  alert: AlertData;
  visible: boolean;
}

const iconMap = {
  follow: Heart,
  donate: DollarSign,
  sub: Crown,
  raid: Users,
  host: Monitor,
};

const colorMap = {
  follow: "text-red-500 border-red-500",
  donate: "text-green-500 border-green-500",
  sub: "text-purple-500 border-purple-500",
  raid: "text-orange-500 border-orange-500",
  host: "text-blue-500 border-blue-500",
};

export default function AlertBox({ alert, visible }: AlertBoxProps) {
  const Icon = iconMap[alert.type] || Heart;
  const colorClass = colorMap[alert.type] || colorMap.follow;

  const titleMap = {
    follow: "Baru saja Follow!",
    donate: "Terima Kasih Donasi!",
    sub: "Baru saja Subscribe!",
    raid: "Raid Incoming!",
    host: "Sedang Host!",
  };

  return (
    <div
      className={`fixed bottom-16 left-16 transition-all duration-700 ease-out transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
      }`}
    >
      <div
        className={`bg-black/90 text-white p-10 rounded-2xl shadow-2xl border-l-[12px] ${
          colorClass.split(" ")[1]
        } min-w-[700px] backdrop-blur-md`}
      >
        <div className="flex items-center gap-8">
          <div
            className={`p-6 rounded-full bg-white/10 ${
              colorClass.split(" ")[0]
            }`}
          >
            <Icon size={70} strokeWidth={2.5} />
          </div>

          <div className="flex-1">
            <h2
              className={`text-4xl font-extrabold ${colorClass.split(" ")[0]}`}
            >
              {titleMap[alert.type]}
            </h2>

            <p className="text-3xl font-bold mt-2">{alert.username}</p>

            {alert.amount && (
              <p className="text-yellow-400 font-bold text-2xl mt-2">
                💰 Rp {alert.amount}
              </p>
            )}

            {alert.message && (
              <p className="text-gray-300 text-lg mt-3 italic line-clamp-2">
                "{alert.message}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
