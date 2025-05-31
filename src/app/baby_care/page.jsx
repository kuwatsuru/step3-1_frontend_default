"use client";
import Navbar02Page from "../../components/navbar-02/navbar-02";
import { useState, useEffect } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [parsedText, setParsedText] = useState(""); // GPT 補正後のテキスト

  //音声認識の初期化
  useEffect(() => {
    if (typeof window !== "undefined" && !recognition) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "ja-JP";
      recognition.continuous = true;
      recognition.interimResults = true;
      setRecognition(recognition);
    }
  }, []);

  //録音の開始・停止
  useEffect(() => {
    if (!recognition) return;

    if (isRecording) {
      recognition.start();
    } else {
      recognition.stop();
      setText("");
    }
  }, [isRecording, recognition]);

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

  //録音した「tect」をGPTに送る
  useEffect(() => {
    // isRecording が false に変化し、かつ録音中に1文字以上取得済み(text !== "")
    if (!isRecording && text) {
      (async () => {
        try {
          const now = new Date().toISOString();
          const res = await fetch(
            "https://app-001-step3-1-suzuyu-py-7.azurewebsites.net/api/record",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                utterance: text,
                recorded_at: now,
              }),
            }
          );
          if (!res.ok) throw new Error("API Error");
          const data = await res.json();
          // backendから返ってくる { parsed: { milktype, volume, timestamp } }
          // 今回は JSON オブジェクトを文字列化して表示すると仮定
          const obj = data.parsed;
          // 例: "ミルク 150 mL"
          const formatted = `種類: ${obj.milktype} ／ 量: ${obj.volume}mL `;
          setParsedText(formatted);

          // 送信後に「生テキスト(text)」は消す
          setText("");
        } catch (err) {
          console.error("バックエンド連携エラー:", err);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  return (
    <main>
      <Navbar02Page
        isRecording={isRecording}
        onToggleRecording={() => setIsRecording((prev) => !prev)}
      >
        {/* ─── ここが children で受け取り部分 ───────────────── */}
        <div className="p-4 max-w-screen-md mx-auto">
          {/* 録音中に出す「途中経過」 */}
          {transcript && (
            <div className="mt-2 text-gray-500 italic">
              （途中）{transcript}
            </div>
          )}

          {/* 録音停止後の「確定テキスト」 */}
          {text && (
            <div className="mt-4 text-gray-800 whitespace-pre-wrap">{text}</div>
          )}

          {/* GPT 補正後の結果 */}
          {parsedText && <div className="mt-4 text-blue-700">{parsedText}</div>}
        </div>
        {/* ──────────────────────────────────────────────── */}
      </Navbar02Page>
    </main>
  );
}
