"use client";
import { Button } from "@/components/ui/button";
import * as motion from "framer-motion/client";

const VoiceInputButton = ({ isRecording, onToggleRecording }) => (
  <div className="flex items-center gap-1 flex-wrap mt-32">
    <Button
      asChild
      className="w-64 h-64 rounded-full flex items-center justify-center text-5xl"
      onClick={onToggleRecording}
    >
      <motion.button whileTap={{ scale: 0.85 }}>
        {isRecording ? "STOP" : " 🎙️ "}
      </motion.button>
    </Button>
  </div>
);
export default VoiceInputButton;
