"use client";
import { useState } from "react";
import VoiceInputButton from "../components/voice_input_button";

export default function Home() {
  return (
    <main class="flex justify-center pt-24 min-h-screen">
      <VoiceInputButton />
    </main>
  );
}
