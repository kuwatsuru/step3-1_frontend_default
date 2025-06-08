// app/api/logs/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const FASTAPI = process.env.NEXT_PUBLIC_API_ENDPOINT;

    // 環境変数が取れているかチェック
    if (!FASTAPI) {
      throw new Error("NEXT_PUBLIC_API_ENDPOINT が定義されていません");
    }

    if (!date) {
      return NextResponse.json(
        { error: "date クエリが必要です" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `${FASTAPI}/api/logs?date=${encodeURIComponent(date)}`
    );
    const body = await res.json();

    // FastAPI サーバー側のエラー詳細が返っていないかチェック
    if (!res.ok) {
      console.error("FastAPI Error", res.status, body);
      return NextResponse.json(
        { error: `FastAPI エラー: ${res.status}` },
        { status: res.status }
      );
    }

    return NextResponse.json(body);
  } catch (err) {
    // Next.js サーバーのコンソールに詳細を出しておく
    console.error("🐞 /api/logs route error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
