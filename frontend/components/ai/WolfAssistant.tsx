"use client";

import { useState } from "react";
import WolfButton from "./WolfButton";
import WolfChat from "./WolfChat";

export default function WolfAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WolfButton onClick={() => setOpen(!open)} />

      {open && <WolfChat />}
    </>
  );
}