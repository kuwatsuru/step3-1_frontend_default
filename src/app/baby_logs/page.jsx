"use client";
import { useState, useEffect } from "react";
import Navbar02Page from "../../components/navbar-02_copy/navbar-02";

export default function ActivityLogsPage() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [logs, setLogs] = useState({ feeding: [], diaper: [], sleep: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/logs?date=${date}`);
        if (!res.ok) throw new Error("Failed to fetch logs");
        const data = await res.json();
        setLogs({
          feeding: data.feeding || [],
          diaper: data.diaper || [],
          sleep: data.sleep || [],
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, [date]);

  return (
    <main>
      <Navbar02Page>
        <div className="p-4 max-w-screen-md mx-auto">
          <div className="mb-4 text-center">
            <label htmlFor="date" className="mr-2 font-medium">
              表示日付:
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded p-1"
            />
          </div>
          {loading && <p className="text-center">読み込み中…</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {/* 授乳ログ */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">授乳</h2>
            {logs.feeding.length === 0 ? (
              <p>データがありません。</p>
            ) : (
              <ul className="list-disc list-inside">
                {logs.feeding.map((log) => (
                  <li key={log.id}>
                    {/* 時刻 */}
                    {new Date(log.timestamp).toLocaleTimeString()} - 種類:{" "}
                    {log.milktype} ／ 量: {log.volume}mL
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* 排せつログ */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">排せつ</h2>
            {logs.diaper.length === 0 ? (
              <p>データがありません。</p>
            ) : (
              <ul className="list-disc list-inside">
                {logs.diaper.map((log) => (
                  <li key={log.id}>
                    {new Date(log.timestamp).toLocaleTimeString()} - 種類:{" "}
                    {log.diaper_type}
                    {log.diaper_type === "うんち" && (
                      <>
                        {" "}
                        (硬さ: {log.hardness || "－"}, 量:{" "}
                        {log.diaper_amount || "－"})
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* 睡眠ログ */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">睡眠／起床</h2>
            {logs.sleep.length === 0 ? (
              <p>データがありません。</p>
            ) : (
              <ul className="list-disc list-inside">
                {logs.sleep.map((log) => (
                  <li key={log.id}>
                    {new Date(log.timestamp).toLocaleTimeString()} -{" "}
                    {log.sleep_state === "sleep" ? "睡眠開始" : "起床"}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </Navbar02Page>
    </main>
  );
}
