import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { SunIcon } from "lucide-react";
import VoiceInputButton from "../../app/components/voice_input_button";

export default function Navbar02Page({
  isRecording,
  onToggleRecording,
  children,
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button>Sign Up</Button>
            <Button size="icon" variant="outline">
              <SunIcon />
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-4xl mt-8">
          <div>音声で入力してください</div>
          <div>
            <br></br>
          </div>
          <div className="text-3xl font-bold text-gray-700">🍼　ミルク 150</div>
          <div className="text-3xl font-bold text-gray-700">
            🚽　うんち 硬め いっぱい
          </div>
          <div className="text-3xl font-bold text-gray-700">
            💤　起きたよ　/　寝たよ
          </div>
        </div>
        <VoiceInputButton
          isRecording={isRecording}
          onToggleRecording={onToggleRecording}
        />

        {children}
      </div>
    </div>
  );
}
