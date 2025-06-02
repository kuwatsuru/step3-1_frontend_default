import {
  Blocks,
  Bot,
  ChartPie,
  Film,
  MessageCircle,
  Settings2,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: MessageCircle,
    title: "ワンタップで起動",
    description: "大きなボタンとシンプルなUI",
  },
  {
    icon: Settings2,
    title: "声で簡単入力",
    description: "（例）「ミルク 150」「うんち　かため　少し」",
  },
  {
    icon: Blocks,
    title: "生成AIが自動分類",
    description: "OpenAI APIでジャンル分け（授乳、排せつ、睡眠など）",
  },
  {
    icon: Bot,
    title: "自動でDBへ保存",
    description: "ジャンルごとのテーブルに自動で記録",
  },
  {
    icon: Film,
    title: "ダッシュボードでいつでも振り返り",
    description: "日付ごとの記録を表示",
  },
  {
    icon: ChartPie,
    title: "取った記録は一元管理",
    description: "ぴよログなどの外部ツールへエクスポート.",
  },
];

const Features01Page = () => {
  return (
    <div className="py-12 flex flex-col items-center">
      <div className="min-h-screen flex items-center justify-center py-12">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center">
            手が離せない育児中でも、簡単記録
          </h2>
          <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col border rounded-xl py-6 px-5"
              >
                <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                  <feature.icon className="h-6 w-6" />
                </div>
                <span className="text-lg font-semibold">{feature.title}</span>
                <p className="mt-1 text-foreground/80 text-[15px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button className="mt-1 px-8 py-12 text-4xl text-center">
        <Link href="/baby_care">Try it now！</Link>
      </Button>
    </div>
  );
};

export default Features01Page;
