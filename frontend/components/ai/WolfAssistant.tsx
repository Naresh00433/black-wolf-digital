"use client";

import { useState } from "react";
import WolfButton from "./WolfButton";
import WolfChat from "./WolfChat";

export default function WolfAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <WolfButton onClick={() => setIsOpen(true)} />
      )}

      {isOpen && (
        <WolfChat onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}