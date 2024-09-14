'use client';

import { Hanabi } from '@/models/hanabi';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsFire } from "react-icons/bs";

interface HanabiProps {
  hanabis: Hanabi[];
}

const AllHanabi = ({ hanabis }: HanabiProps) => {
  const [eventData, setEventData] = useState<Hanabi[]>(hanabis);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setEventData(hanabis);
  }, [hanabis]);

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
      <div className="flex overflow-x-auto space-x-4 mb-6 no-scrollbar">
        <button
          className={`px-4 py-2 ${selectedCategory === 'all' ? 'bg-gray-500 text-white' : 'bg-gray-200'} rounded-lg`}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>

        {['music', 'movie', 'comedy', 'art', 'hackathon', 'other'].map(category => (
          <button
            key={category}
            className={`px-4 py-2 ${selectedCategory === category ? `bg-${getColor(category)}-500 text-white` : 'bg-gray-200'} rounded-lg`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='mb-14'>
        {getFilteredEvents().map(event => (
          <Link href={`/comment/${(event.ID)}`} key={event.ID}>
            <div key={event.Name} className="flex items-center  py-4 border-t border-b border-gray-500">
              <img src={event.Photo} alt={event.Name} className="w-32 h-32 object-cover mr-4" />
              <div className="mx-10">
                <h1 className="text-xl font-bold">{event.Name}</h1>
                <p className={`mt-1 text-center text-white rounded-full shadow-sm bg-${getColor(event.Tag)}-500`}>
                  {event.Tag}
                </p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BsFire className="text-white mx-5" />
                  <p>{event.CommentCount}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

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

export default AllHanabi;
