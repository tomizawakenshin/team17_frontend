"use client";

import { getAllHanabi } from '@/actions/hanabi';
import AllHanabi from '@/components/AllHanabi/AllHanabi';
import React, { useEffect, useState } from 'react';

const Home2 = () => {
  const [hanabis, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllHanabi("2024-09-13");
        setData(result);
      } catch (error) {
        setError('データの取得に失敗しました');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AllHanabi hanabis={hanabis} />
    </div>
  );
};

export default Home2;

