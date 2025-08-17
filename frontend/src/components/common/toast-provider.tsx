"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#272A2E",
          color: "#FFFFFF",
          border: "1px solid #3A3D41",
          borderRadius: "12px",
          padding: "16px 20px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(8px)",
        },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: "#FFFFFF",
          },
          style: {
            border: "1px solid #10B981",
            background: "linear-gradient(135deg, #272A2E 0%, #1F2937 100%)",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#FFFFFF",
          },
          style: {
            border: "1px solid #EF4444",
            background: "linear-gradient(135deg, #272A2E 0%, #1F2937 100%)",
          },
        },
        loading: {
          iconTheme: {
            primary: "#3B82F6",
            secondary: "#FFFFFF",
          },
          style: {
            border: "1px solid #3B82F6",
            background: "linear-gradient(135deg, #272A2E 0%, #1F2937 100%)",
          },
        },
      }}
    />
  );
};
