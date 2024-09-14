"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // useRouter を使用
import classNames from 'classnames';
import { BsFire } from "react-icons/bs";

interface CommentData {
  ID: number;
  Content: string;
  UserID: number;
  User: {
    Username: string;
    IconPhoto: string | null;
  };
  LikeCount: number;
  HasLiked: boolean;
}

interface EventData {
  ID: number;
  Name: string;
  Description: string;
  Photo: string;
  Tag: string;
  CommentCount: number;
  Comments: CommentData[];
}

const getColor = (category: string) => {
  switch (category) {
    case 'music': return 'red';
    case 'movie': return 'blue';
    case 'comedy': return 'purple';
    case 'art': return 'yellow';
    case 'hackathon': return 'green';
    case 'other': return 'orange';
    default: return 'gray';
  }
};

const EventPage = () => {
  const router = useRouter();  // useRouter を使用
  const { ID } = useParams();  // 動的IDを取得

  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");  // 新しいコメント用のステート
  const [sending, setSending] = useState(false);  // コメント送信中のステート

  useEffect(() => {
    const token = localStorage.getItem('token');  // ローカルストレージからJWTトークンを取得

    if (!token) {
      // トークンがない場合、ログインページにリダイレクト
      router.push("/login");
    } else {
      // イベントデータを取得する関数
      const fetchEventData = async () => {
        if (ID) {
          const decodedID = Array.isArray(ID) ? ID[0] : ID; // 配列の場合、最初の要素を取得

          try {
            const response = await fetch(`https://hanabibackenddeploy-production.up.railway.app/hanabi/getByID/${decodedID}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,  // Authorizationヘッダーにトークンを追加
                'Content-Type': 'application/json',
              },
              cache: 'no-store',
            });

            if (!response.ok) {
              throw new Error('イベントデータの取得に失敗しました');
            }

            const result = await response.json();
            const hanabiData = result["founded hanabi"];

            if (!hanabiData) {
              throw new Error('イベントデータが見つかりませんでした');
            }

            // 取得したデータをステートに保存
            setEventData(hanabiData);
          } catch (err) {
            console.error('Error fetching event data:', err);
            setError('イベントデータの取得に失敗しました');
          } finally {
            setLoading(false);
          }
        }
      };

      fetchEventData();
    }
  }, [ID, router]);  // ID と router を依存配列に含める

  // コメントを送信する関数
  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;  // コメントが空白の場合、何もしない
    const token = localStorage.getItem('token');
    if (!token || !ID) return;

    setSending(true);  // 送信中に設定

    try {
      const response = await fetch(`https://hanabibackenddeploy-production.up.railway.app/comment/create/${ID}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,  // コメント内容
        }),
      });

      if (!response.ok) {
        throw new Error('コメントの送信に失敗しました');
      }

      // コメントが成功したら、新しいコメントを追加し、フィールドをクリア
      const newCommentData: CommentData = await response.json();
      setNewComment("");  // 入力欄をクリア

      if (eventData) {
        // eventDataがnullでない場合にコメントリストを更新
        const updatedEventData: EventData = {
          ...eventData,
          Comments: [...eventData.Comments, newCommentData],  // 新しいコメントを追加
          CommentCount: eventData.CommentCount + 1,  // コメント数を更新
        };
        setEventData(updatedEventData);
      }

    } catch (error) {
      console.error('Error sending comment:', error);
      setError('コメントの送信に失敗しました');
    } finally {
      setSending(false);
      window.location.reload();
    }
  };

  // Enterキーでコメントを送信するハンドラ
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitComment();
    }
  };

  // いいねをトグルする関数
  const toggleLike = async (commentID: number, hasLiked: boolean) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(
        `https://hanabibackenddeploy-production.up.railway.app/like/${hasLiked ? 'unlike' : 'like'}/${commentID}`,
        {
          method: hasLiked ? 'DELETE' : 'POST', // いいね済みならDELETE、いいねしてなければPOST
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('いいねの更新に失敗しました');
      }

      // コメントのいいね状態を更新
      const updatedComments = eventData?.Comments.map((comment) => {
        if (comment.ID === commentID) {
          return {
            ...comment,
            LikeCount: hasLiked ? comment.LikeCount - 1 : comment.LikeCount + 1,
            HasLiked: !hasLiked,
          };
        }
        return comment;
      });

      setEventData((prev) =>
        prev ? { ...prev, Comments: updatedComments ?? [] } : prev
      );
    } catch (err) {
      console.error('Error updating like:', err);
      setError('いいねの更新に失敗しました');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!eventData) {
    return <div>データが見つかりませんでした</div>;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-4 flex items-center">
        <img src={eventData.Photo} alt="Event" className="w-32 h-32 mx-6 mr-4" />
        <div className="mx-10">
          <h1 className="text-xl font-bold">{eventData.Name}</h1>
          <div
            className={classNames(
              'mt-1 text-center text-white rounded-full shadow-sm',
              {
                'bg-red-500': eventData.Tag === 'music',
                'bg-blue-500': eventData.Tag === 'movie',
                'bg-purple-500': eventData.Tag === 'comedy',
                'bg-yellow-500': eventData.Tag === 'art',
                'bg-green-500': eventData.Tag === 'hackathon',
                'bg-orange-500': eventData.Tag === 'other',
                'bg-gray-500': eventData.Tag === 'gray'
              }
            )}
          >
            {eventData.Tag}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BsFire className="text-white mx-5" />
            <p>{eventData.CommentCount}</p>
          </div>
        </div>
      </div>
      <p className="mx-10">説明:</p>
      <p className="mx-10">{eventData.Description}</p>
      <div className="mb-14 my-10">
        {eventData.Comments && eventData.Comments.map((comment, index) => (
          <div key={index} className="flex items-center text-white py-4 border-b border-gray-500">
            <img
              src={comment.User?.IconPhoto ?? "/default-icon.png"}
              alt={`${comment.User?.Username || "Anonymous"}'s icon`}
              className="w-12 h-12 rounded-full mr-4"
            /> {/* IconPhotoを表示 */}
            <div className="flex-grow">
              <p className="font-bold">{comment.User?.Username || "Anonymous"}</p>
              <p>{comment.Content}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => toggleLike(comment.ID, comment.HasLiked)}
                className={`ml-4 ${comment.HasLiked ? 'text-red-500' : 'text-gray-500'}`}
              >
                ❤️ {comment.LikeCount}
              </button>
            </div>
          </div>
        ))}
        {/* コメント入力欄 */}
        <div className="flex my-10 mb-10">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}  // 入力フィールドの更新
            onKeyPress={handleKeyPress}  // Enterキーでコメントを送信
            className="flex-grow bg-gray-200 border border-gray-500 text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5 dark:bg-gray-700 dark:border-gray-500"
            placeholder="感想を書く"
            disabled={sending}  // 送信中は入力を無効化
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
