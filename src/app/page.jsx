"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Features01Page from "@/components/features-01/features-01";
import Timeline from "@/components/timeline-01/timeline-01";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl mt-10 mb-12 font-bold mb-6">
            解決したい課題
          </h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl text-left">
                誰の：赤ちゃんのお世話を1人でするママ・パパ
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl mb-4 text-left">
                どのような：
              </CardTitle>
              <CardContent>
                <CardTitle className="text-3xl mt-2 mb-4 text-left">
                  赤ちゃんのお世話はとにかく大変！
                </CardTitle>
                <ul className="list-disc pl-6 text-left">
                  <li className="text-2xl mb-4">3時間おきの授乳</li>
                  <li className="text-2xl mb-4">1日10回近いおむつ替え</li>
                  <li className="text-2xl mb-10">断続的な睡眠</li>
                </ul>

                <CardTitle className="text-3xl mt-2 mb-4 text-left">
                  けど記録はしたい！
                </CardTitle>
                <ul className="list-disc pl-6 text-left">
                  <li className="text-2xl mb-4">赤ちゃんの体調や発達の把握</li>
                  <li className="text-2xl mb-4">
                    自身の負担軽減、パートナーとの共有
                  </li>
                  <li className="text-2xl">後から振り返れる</li>
                </ul>
              </CardContent>
            </CardHeader>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl text-left">
                どうやって：🎙️ 声で記録 → AIが自動整理
              </CardTitle>
            </CardHeader>
          </Card>
          <div className="text-4xl">▼</div>
        </div>
        <Features01Page />
      </div>
    </div>
  );
}
