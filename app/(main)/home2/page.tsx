"use client";

import { getAllHanabi } from '@/actions/hanabi';
import AllHanabi from '@/components/AllHanabi/AllHanabi';
import TabMenu from '@/components/TabMenu/TabMenu'; // TabMenuをインポート
import { Hanabi } from '@/models/hanabi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Home2 = () => {
  const router = useRouter();
  const [hanabis, setData] = useState<Hanabi[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      const fetchData = async () => {
        try {
          const result = await getAllHanabi(selectedDate); // 選択された日付でデータを取得
          setData(result);
        } catch (error) {
          setError('データの取得に失敗しました');
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [router, selectedDate]); // selectedDateが変更されるたびにデータを取得

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <TabMenu onDateChange={handleDateChange} /> {/* TabMenuを表示し、日付変更ハンドラを渡す */}
      <AllHanabi hanabis={hanabis || []} />
    </div>
  );
};

export default Home2;
