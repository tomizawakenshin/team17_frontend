"use client";

// import { getAllHanabi } from '@/actions/hanabi';
// import AllHanabi from '@/components/AllHanabi/AllHanabi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Home2 = () => {
  const router = useRouter();
  // const [hanabis, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   router.push("/login");
    // } else {
      const fetchData = async () => {
        try {
          // const result = await getAllHanabi("2024-09-13");
          // setData(result);
        } catch (error) {
          setError('データの取得に失敗しました');
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [router]);
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     router.push("/login");
  //   } else {
  //     const fetchData = async () => {
  //       try {
  //         // const result = await getAllHanabi("2024-09-13");
  //         // setData(result);
  //       } catch (error) {
  //         setError('データの取得に失敗しました');
  //         console.error('Error fetching data:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* <AllHanabi hanabis={hanabis} /> */}
    </div>
  );
};

export default Home2;

