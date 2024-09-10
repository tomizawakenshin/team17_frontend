'use client';

import { useEffect, useState } from 'react';

interface EventData {
  Name: string;
  Discription: string;
  Photo: string;
  Tag: string;
  CommentCount: number;
  Comment: string[];
}

const EventPage = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch('/Hanabi.json');
        if (!response.ok) {
          throw new Error('Failed to fetch event data');
        }
        const data: EventData = await response.json();
        setEventData(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, []);

  if (!eventData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
        <div className="container mx-auto px-4 py-4 flex items-center">
        <img src={eventData.Photo} alt="Event" className="w-32 h-32 w-1/3 mr-4" />
        <div className="mx-10">
            <h1 className="text-xl font-bold">{eventData.Name}</h1>
            <p>Tag: {eventData.Tag}</p>
            <p>Comments: {eventData.CommentCount}</p>
        </div>
        </div>
        <p className='mx-10'>説明:</p> 
        <p className='mx-10'>{eventData.Discription}</p>
        <div style={{ maxHeight: '50vh', overflowY: 'auto' }} className='my-4'>
        {eventData.Comment.map((comment, index) => (
        <p key={index} className='text-white mx-10'>{comment}</p>
        ))}
    </div>
  </div>
    
  );
};

export default EventPage;
