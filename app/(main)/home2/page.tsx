'use client';

import React, { useState, useEffect } from 'react';

interface EventData {
  Name: string;
  Discription: string;
  Photo: string;
  UserId: number;
  User: string;
  Tag: string;
  CommentCount: number;
  Comment: string[];
}

const Home2Page: React.FC = () => {
  const [eventData, setEventData] = useState<EventData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function fetchEventData() {
      try {
        const responses = await Promise.all([
          fetch('/Hanabi.json'),
          fetch('/Hanabi2.json'),
          fetch('/Hanabi3.json'),
          fetch('/Hanabi4.json'),
          fetch('/Hanabi5.json')
        ]);
        const data = await Promise.all(responses.map(res => res.json()));
        setEventData(data);
      } catch (error) {
        console.error('Failed to fetch event data:', error);
      }
    }

    fetchEventData();
  }, []);

  const getFilteredEvents = () => {
    if (selectedCategory === 'all') {
      return eventData;
    } else {
      return eventData.filter(event => event.Tag === selectedCategory);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-2xl font-bold mb-4">イベント一覧</div>
      <div className="flex overflow-x-auto space-x-4 mb-6 space-x-4 no-scrollbar">
        <button className={`px-4 py-2 ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg`} onClick={() => setSelectedCategory('all')}>All</button>
        <button
            key='music'
            className={`px-4 py-2 ${selectedCategory === 'music' ? 'bg-green-500 text-white' : 'bg-gray-200'} rounded-lg`}
            onClick={() => setSelectedCategory('music')}
          >music
        </button>
        <button
            key='movie'
            className={`px-4 py-2 ${selectedCategory === 'movie' ? 'bg-yellow-500 text-white' : 'bg-gray-200'} rounded-lg`}
            onClick={() => setSelectedCategory('movie')}
          >movie
        </button>
        <button
            key='comedy'
            className={`px-4 py-2 ${selectedCategory === 'comedy' ? 'bg-orange-500 text-white' : 'bg-gray-200'} rounded-lg`}
            onClick={() => setSelectedCategory('comedy')}
          >comedy
        </button>
        <button
            key='art'
            className={`px-4 py-2 ${selectedCategory === 'art' ? 'bg-red-500 text-white' : 'bg-gray-200'} rounded-lg`}
            onClick={() => setSelectedCategory('art')}
          >art
        </button>
        <button
            key='hackathon'
            className={`px-4 py-2 ${selectedCategory === 'hackathon' ? 'bg-purple-500 text-white' : 'bg-gray-200'} rounded-lg`}
            onClick={() => setSelectedCategory('hackathon')}
          >hackathon
        </button>
        <button
            key='other'
            className={`px-4 py-2 ${selectedCategory === 'other' ? 'bg-gray-500 text-white' : 'bg-gray-200'} rounded-lg`}
            onClick={() => setSelectedCategory('other')}
          >other
        </button>
      </div>
      <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
      {getFilteredEvents().map((event, index) => (
        <div key={index} className="flex items-center my-4">
          <img src={event.Photo} alt={event.Name} className="w-32 h-32 object-cover mr-4" />
          <div className=" mx-10">
            <h1 className="text-xl font-bold">{event.Name}</h1>
            <p className="text-gray-500">{event.Tag}</p>
            <p className="text-gray-500">Comments: {event.CommentCount}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Home2Page;
