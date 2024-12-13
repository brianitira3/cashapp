import React, { useState } from 'react';
import { Youtube, Award, Star, DollarSign, Users, PlayCircle, Smile } from 'lucide-react';
import 'tailwindcss/tailwind.css'; 

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  youtubeLink: string;
  views: number;
  likes: number;
  earnings: number;
}

const videoData: Video[] = [
  {
    id: 1,
    title: 'Hustling in Nairobi: Success Secrets',
    thumbnail: 'https://cdn.create.vista.com/downloads/3d8b32e5-d62e-4f1b-9a8a-910ce354a40f_1024.jpeg',
    youtubeLink: 'https://www.youtube.com/watch?v=uTKHHxtHaGM',
    views: 5420,
    likes: 342,
    earnings: 25.50
  },
  {
    id: 2,
    title: 'Digital Entrepreneurship in Kenya',
    thumbnail: 'https://i.ytimg.com/vi/HySyIgpYx9o/maxresdefault.jpg',
    youtubeLink: 'https://youtube.com/watch?v=example2',
    views: 3210,
    likes: 215,
    earnings: 18.75
  },
  {
    id: 3,
    title: 'Side Hustle Masterclass',
    thumbnail: 'https://i.ytimg.com/vi/bb6K0NcLxVk/maxresdefault.jpg',
    youtubeLink: 'https://youtube.com/watch?v=example3',
    views: 6750,
    likes: 456,
    earnings: 35.20
  }
];

interface VideoCardProps {
  video: Video;
  onWatchClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onWatchClick }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-56 object-cover filter brightness-95 hover:brightness-110 transition-all"
        />
        <div className="absolute bottom-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full flex items-center shadow-lg">
          <Youtube size={18} className="mr-2" />
          <span className="text-sm font-semibold">YouTube</span>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <h3 className="font-bold text-xl text-gray-800 truncate hover:text-blue-600 transition-colors cursor-pointer">
          {video.title}
        </h3>
        <div className="flex justify-between items-center text-gray-600">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <Star size={18} className="mr-2 text-yellow-500" />
              <span className="font-semibold">{video.likes}</span>
            </div>
            <div className="flex items-center">
              <Award size={18} className="mr-2 text-green-500" />
              <span className="font-semibold">{video.views} Views</span>
            </div>
          </div>
          <button 
            onClick={() => onWatchClick(video)}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all flex items-center font-semibold text-sm"
          >
            <DollarSign size={18} className="mr-2" />
            Earn
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [earnedTotal, setEarnedTotal] = useState<number>(0);

  const handleWatchClick = (video: Video): void => {
    window.open(video.youtubeLink, '_blank');
    setEarnedTotal(prev => prev + video.earnings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 p-10">
      <div className="container mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Kenya Cash Generator
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text font-semibold">
              Watch. Engage. Earn.
            </span> 💰🚀
          </p>
          <div className="inline-block bg-green-100 px-6 py-3 rounded-full shadow-md">
            <span className="text-green-700 font-bold text-xl">
              Total Earned: ${earnedTotal.toFixed(2)}
            </span>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Platform Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
              <Users size={40} className="text-blue-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">100K+</h3>
                <p className="text-gray-600">Active Users</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
              <PlayCircle size={40} className="text-green-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">500K+</h3>
                <p className="text-gray-600">Videos Watched</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
              <DollarSign size={40} className="text-yellow-500" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">$1M+</h3>
                <p className="text-gray-600">Total Earnings today</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-10">
          {videoData.map(video => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onWatchClick={handleWatchClick} 
            />
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Smile size={40} className="text-yellow-500 mb-4" />
              <p className="text-gray-600">"This platform is amazing! I've earned $200 in just a month!"</p>
              <span className="text-gray-500 text-sm block mt-4">- Alex M.</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Smile size={40} className="text-yellow-500 mb-4" />
              <p className="text-gray-600">"A great way to monetize my free time. Highly recommended!"</p>
              <span className="text-gray-500 text-sm block mt-4">- Maria K.</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Smile size={40} className="text-yellow-500 mb-4" />
              <p className="text-gray-600">"Simple, effective, and fun. Love the idea!"</p>
              <span className="text-gray-500 text-sm block mt-4">- John D.</span>
            </div>
          </div>
        </section>

        <footer className="text-center mt-20 text-gray-500">
          <p className="text-sm font-medium">
            Developed by <span className="text-blue-600 hover:underline">Brian Itira</span> | © 2024 Kenya Cash Generator
          </p>
          <p className="text-xs mt-2 text-gray-400">
            Disclaimer: Earnings based on actual engagement.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
