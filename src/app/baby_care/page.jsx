"use client";
import Navbar02Page from "../../components/navbar-02/navbar-02";
import { useState, useEffect } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "ja-JP";
      recognition.continuous = true;
      recognition.interimResults = true;
      setRecognition(recognition);
    }
  }, []);

  useEffect(() => {
    if (!recognition) return;
    if (isRecording) {
      recognition.start();
    } else {
      recognition.stop();
      setText("");
    }
  }, [isRecording]);

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event) => {
      const results = event.results;
      for (let i = event.resultIndex; i < results.length; i++) {
        if (results[i].isFinal) {
          setText((prevText) => prevText + results[i][0].transcript);
          setTranscript("");
        } else {
          setTranscript(results[i][0].transcript);
        }
      }
    };
  }, [recognition]);

  //5秒で録音オフ
  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => {
        setIsRecording(false);
      }, 5000); // 5後に録音停止

      return () => clearTimeout(timer); // 録音が途中で停止した場合、タイマーを解除
    }
  }, [isRecording]);

  return (
    <main>
      <Navbar02Page
        isRecording={isRecording}
        onToggleRecording={() => setIsRecording((prev) => !prev)}
      />
    </main>
  );
}
