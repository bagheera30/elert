"use client";

import { useEffect, useState } from "react";
import { AlertData } from "@/lib/types";
import { Send, Trash2 } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  // ✅ FIX hydration
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const [formData, setFormData] = useState<AlertData>({
    type: "follow",
    username: "",
    message: "",
    amount: "",
  });

  const triggerAlert = async () => {
    if (!formData.username) {
      alert("Username wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Alert berhasil dikirim!");
        setFormData({ ...formData, username: "", message: "", amount: "" });
      } else {
        alert("❌ Gagal mengirim alert");
      }
    } catch (error) {
      alert("❌ Error: " + error);
    }
    setLoading(false);
  };

  const resetAlerts = async () => {
    if (confirm("Hapus semua alert dari database?")) {
      await fetch("/api/alert", { method: "DELETE" });
      alert("✅ Semua alert direset!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2">
          🎬 OBS Alert System
        </h1>
        <p className="text-gray-400 mb-6">
          Dashboard untuk testing alert stream
        </p>

        <div className="space-y-4">
          {/* TYPE */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Tipe Alert
            </label>
            <div className="flex gap-2 flex-wrap">
              {["follow", "donate", "sub", "raid", "host"].map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      type: type as AlertData["type"],
                    })
                  }
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    formData.type === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* USERNAME */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Nama user..."
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">
              Pesan (Opsional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            />
          </div>

          {/* DONATE */}
          {formData.type === "donate" && (
            <div>
              <label className="block text-gray-300 mb-2 font-medium">
                Jumlah Donasi
              </label>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
          )}

          {/* BUTTON */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={triggerAlert}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Mengirim..." : "Kirim Alert"}
            </button>

            <button
              onClick={resetAlerts}
              className="px-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
            >
              Reset
            </button>
          </div>
        </div>

        {/* OBS GUIDE */}
        <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <h3 className="text-white font-semibold mb-2">
            📌 Cara Menggunakan di OBS:
          </h3>

          <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
            <li>Buka OBS Studio</li>
            <li>Tambah Source → Browser</li>

            <li>
              URL:
              <code className="bg-gray-800 px-2 py-0.5 rounded text-blue-400 ml-2">
                {(origin || "YOUR_URL") + "/alert"}
              </code>
            </li>

            <li>Width: 1920, Height: 1080</li>
            <li>
              Custom CSS:
              <code className="text-xs ml-2">
                body {"{ background-color: rgba(0,0,0,0); }"}
              </code>
            </li>

            <li>Klik tombol "Kirim Alert"</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
