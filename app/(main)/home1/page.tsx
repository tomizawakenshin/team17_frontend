'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllHanabi } from "@/actions/hanabi";
import Firework from "@/components/Firework/Firework";
import TabMenu from "@/components/TabMenu/TabMenu";  // TabMenuをインポート
import { Hanabi } from "@/models/hanabi";  // Hanabiの型をインポート

export default function Home() {
  const router = useRouter();
  const [hanabis, setHanabis] = useState<Hanabi[] | null>(null); // 状態でhanabisを管理
  const [loading, setLoading] = useState(true); // ローディング状態
  const [selectedDate, setSelectedDate] = useState<string>("2024-09-14"); // 選択された日付を管理

  // 日付変更時のハンドラ
  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push("/login");
    } else {
      // Tokenがある場合にhanabiデータを取得
      const fetchData = async () => {
        try {
          const data = await getAllHanabi(selectedDate); // 選択された日付でデータを取得
          setHanabis(data);
        } catch (error) {
          console.error("Failed to fetch hanabis", error);
        } finally {
          setLoading(false); // データの取得が終わったらローディングを終了
        }
      };
      fetchData();
    }
  }, [router, selectedDate]); // selectedDateが変更されるたびにデータを取得

  if (loading) {
    return <div>Loading...</div>; // ローディング中の表示
  }

  return (
    <div className="">
      <TabMenu onDateChange={handleDateChange} /> {/* 日付変更ハンドラを渡す */}
      {hanabis && <Firework hanabis={hanabis} />} {/* データが取得できたらFireworkコンポーネントを表示 */}
    </div>
  );
}
