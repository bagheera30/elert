// app/alert/page.tsx
"use client";

import { useEffect, useState } from "react";
import AlertBox from "../components/AlertBox";
// import { AlertData } from '@/lib/types'; // Sesuaikan path jika Anda membuat types


// Definisikan tipe dasar sementara jika types belum digunakan di client
interface AlertData {
  type: "follow" | "donate" | "sub" | "raid" | "host";
  username: string;
  message: string;
  amount?: string;
  image?: string;
}

export default function AlertPage() {
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log("Polling dimulai..."); // Log untuk debugging

    const checkAlert = async () => {
      try {
        console.log("Fetching alert..."); // Log request
        const res = await fetch(`/api/alert?t=${Date.now()}`, {
          cache: "no-store", // Penting
        });

        console.log(`Fetch response status: ${res.status}`); // Log status

        if (!res.ok) {
          // Jika bukan 200 OK, mungkin ada error di API
          const errorText = await res.text();
          console.error("Error fetching alert:", res.status, errorText);
          return; // Jangan lanjutkan parsing
        }

        const data = await res.json();
        console.log("Received data:", data); // Log response

        if (data.alert) {
          console.log("Alert diterima, menampilkan...");
          setAlert(data.alert);
          setVisible(true);

          // Sembunyikan setelah 5 detik
          setTimeout(() => {
            console.log("Menyembunyikan alert...");
            setVisible(false);
            // Reset setelah animasi selesai (500ms)
            setTimeout(() => {
              console.log("Reset alert state...");
              setAlert(null);
            }, 500);
          }, 5000);
        } else {
          console.log("Tidak ada alert baru.");
        }
      } catch (error) {
        console.error("Gagal mengambil alert:", error);
      }
    };

    // Polling setiap 1 detik
    const interval = setInterval(checkAlert, 1000);
    return () => {
      console.log("Membersihkan polling interval...");
      clearInterval(interval);
    };
  }, []); // Hanya berjalan sekali saat mount

  // Render component jika alert ada
  if (!alert) {
    console.log("Render: Tidak ada alert untuk ditampilkan.");
    return null; // Tidak merender apa-apa jika tidak ada alert
  }

  console.log("Render: Menampilkan AlertBox...");
  return (
    <div className="w-screen h-screen bg-transparent overflow-hidden">
      <AlertBox alert={alert} visible={visible} />
    </div>
  );
}
