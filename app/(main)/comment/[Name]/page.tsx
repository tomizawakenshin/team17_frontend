'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import classNames from 'classnames';

interface CommentData {
  Content: string;
  UserID: number;
  User: { 
    Username: string;
    IconPhoto: string; // UserのIconPhotoを追加
  };
}

interface EventData {
  Name: string;
  Discription: string;
  Photo: string;
  Tag: string;
  CommentCount: number;
  Comment: CommentData[];  // コメントの型を修正
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
  const [eventData, setEventData] = useState<EventData | null>(null);
  const { Name } = useParams();

  useEffect(() => {
    if (Name) {
      const decodedName = decodeURIComponent(Name); // デコードした名前を取得
      const fetchEventData = async () => {
        try {
          const response = await fetch(`http://localhost:3002/hanabis`, {
            cache: 'no-store',
          });
          const data = await response.json();
          const hanabi = data.find((hanabi: EventData) => hanabi.Name === decodedName); // デコードした名前で検索
          if (!hanabi) {
            throw new Error('Event data not found');
          }
          setEventData(hanabi);
        } catch (error) {
          console.error('Error fetching event data:', error);
        }
      };

      fetchEventData();
    }
  }, [Name]);

  if (!eventData) {
    return <div>Loading...</div>;
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
          <p>Comments: {eventData.CommentCount}</p>
        </div>
      </div>
      <p className="mx-10">説明:</p> 
      <p className="mx-10">{eventData.Discription}</p>
      <div className="mb-14 my-10">
        {eventData.Comment.map((comment, index) => (
          <div key={index} className="flex items-center text-white py-2 border-t border-b border-gray-500">
            <img src={comment.User.IconPhoto} alt={`${comment.User.Username}'s icon`} className="w-12 h-12 rounded-full mr-4 mx-5" /> {/* アイコンを表示 */}
            <div>
              <p className='font-bold'>{comment.User.Username}</p>
              <p>{comment.Content}</p>
            </div>
          </div>
        ))}
        <div className="my-10 mb-10">
          <input type="text" className="bg-gray-200 border border-gray-500 text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500" placeholder="感想を書く"/>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
