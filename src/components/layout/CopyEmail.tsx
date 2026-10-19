"use client";
import { useState } from "react";
import { site } from "@/content/site";
export function CopyEmail() {
  const [message, setMessage] = useState("");
  return (
    <div>
      <button
        className="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(site.email);
            setMessage("Email copied.");
          } catch {
            setMessage(
              "Could not copy. Select the visible email address, or use the email link.",
            );
          }
        }}
      >
        Copy email <span aria-hidden="true">⧉</span>
      </button>
      <p
        role="status"
        className="small-note"
        style={{ minHeight: 24, marginTop: 12, maxWidth: 380 }}
      >
        {message}
      </p>
    </div>
  );
}
