import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import {
  Youtube,
  Award,
  Star,
  DollarSign,
  Users,
  PlayCircle,
  Smile,
  User,
  Zap,
  Rocket,
  Gift,
  TrendingUp,
  Lock,
  Sparkles,
  CheckCircle2,
  Coffee,
  MousePointer,
  MessageCircle,
  Gamepad,
  Target,
  Lightbulb
} from "lucide-react";
import "tailwindcss/tailwind.css";

import ProfilePage from "./ProfilePage";
import TiktokEarningPage from "./TiktokEarningPage";

const clerkFrontendApi = "pk_test_aW4tcmF2ZW4tNDguY2xlcmsuYWNjb3VudHMuZGV2JA"; 

// Enhanced Video Interface
interface Video {
  id: number;
  title: string;
  thumbnail: string;
  youtubeLink: string;
  views: number;
  likes: number;
  earnings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  requiredEngagement: number;
  unlockTime: number; // Time in minutes to unlock
  category: 'Entrepreneurship' | 'Tech' | 'Finance' | 'Personal Growth';
}

// New Task Interface
interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  type: 'Survey' | 'Quiz' | 'Game' | 'Referral';
  icon: React.ElementType;
}

// New Challenge Interface
interface Challenge {
  id: number;
  title: string;
  description: string;
  reward: number;
  requiredActions: number;
  completed: boolean;
}

const videoData: Video[] = [
  {
    id: 1,
    title: "Hustling in Nairobi: Success Secrets",
    thumbnail: "https://cdn.create.vista.com/downloads/3d8b32e5-d62e-4f1b-9a8a-910ce354a40f_1024.jpeg",
    youtubeLink: "https://www.youtube.com/watch?v=uTKHHxtHaGM",
    views: 5420,
    likes: 342,
    earnings: 25.5,
    difficulty: 'Easy',
    requiredEngagement: 0,
    unlockTime: 1,
    category: 'Entrepreneurship'
  },
  {
    id: 2,
    title: "Digital Entrepreneurship in Kenya",
    thumbnail: "https://i.ytimg.com/vi/HySyIgpYx9o/maxresdefault.jpg",
    youtubeLink: "https://youtube.com/watch?v=example2",
    views: 3210,
    likes: 215,
    earnings: 18.75,
    difficulty: 'Medium',
    requiredEngagement: 25,
    unlockTime: 5,
    category: 'Tech'
  },
  {
    id: 3,
    title: "Side Hustle Masterclass",
    thumbnail: "https://i.ytimg.com/vi/bb6K0NcLxVk/maxresdefault.jpg",
    youtubeLink: "https://youtube.com/watch?v=example3",
    views: 6750,
    likes: 456,
    earnings: 35.2,
    difficulty: 'Hard',
    requiredEngagement: 50,
    unlockTime: 10,
    category: 'Finance'
  },
];

const taskData: Task[] = [
  {
    id: 1,
    title: "Quick Survey",
    description: "Complete a 5-minute market research survey",
    reward: 10,
    type: 'Survey',
    icon: MessageCircle
  },
  {
    id: 2,
    title: "Entrepreneurship Quiz",
    description: "Test your business knowledge",
    reward: 15,
    type: 'Quiz',
    icon: Target
  },
  {
    id: 3,
    title: "Referral Challenge",
    description: "Refer 3 friends and earn bonus",
    reward: 50,
    type: 'Referral',
    icon: Users
  }
];

const challengeData: Challenge[] = [
  {
    id: 1,
    title: "Beginner Hustler",
    description: "Watch 3 videos, complete 2 tasks",
    reward: 100,
    requiredActions: 5,
    completed: false
  },
  {
    id: 2,
    title: "Engagement Master",
    description: "Reach 75% platform engagement",
    reward: 250,
    requiredActions: 75,
    completed: false
  }
];

const VideoCard: React.FC<{ 
  video: Video, 
  onWatchClick: (video: Video) => void, 
  userEngagement: number,
  unlockedVideoIds: number[]
}> = ({ video, onWatchClick, userEngagement, unlockedVideoIds }) => {
  const canWatch = video.requiredEngagement === 0 || 
                   unlockedVideoIds.includes(video.id) || 
                   userEngagement >= video.requiredEngagement;

  return (
    <div className={`
      ${canWatch 
        ? 'bg-white shadow-xl' 
        : 'bg-gray-200 opacity-70 cursor-not-allowed'
      } rounded-2xl overflow-hidden transform transition-all 
      ${canWatch ? 'hover:scale-105 hover:shadow-2xl' : ''}
    `}>
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`
            w-full h-56 object-cover 
            ${canWatch ? 'filter brightness-95 hover:brightness-110' : 'filter grayscale'}
          `}
        />
        {!canWatch && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Lock size={48} className="text-white" />
          </div>
        )}
        <div className={`
          absolute bottom-3 right-3 
          ${video.difficulty === 'Easy' ? 'bg-green-500' : 
            video.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'} 
          text-white px-3 py-1 rounded-full flex items-center shadow-lg
        `}>
          <span className="text-sm font-semibold">{video.difficulty}</span>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <h3 className={`
          font-bold text-xl 
          ${canWatch ? 'text-gray-800 hover:text-blue-600' : 'text-gray-500'} 
          truncate transition-colors
        `}>
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
            onClick={() => canWatch && onWatchClick(video)}
            disabled={!canWatch}
            className={`
              ${canWatch 
                ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:shadow-lg' 
                : 'bg-gray-400 cursor-not-allowed'}
              text-white px-4 py-2 rounded-full transition-all flex items-center font-semibold text-sm
            `}
          >
            <DollarSign size={18} className="mr-2" />
            {canWatch ? 'Earn' : 'Locked'}
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskCard: React.FC<{ 
  task: Task, 
  onCompleteTask: (task: Task) => void 
}> = ({ task, onCompleteTask }) => {
  return (
    <div className="bg-white/10 p-6 rounded-2xl shadow-xl border border-white/20 hover:scale-105 transition-all">
      <div className="flex items-center mb-4">
        <task.icon size={40} className="text-blue-400 mr-4" />
        <h3 className="text-xl font-bold text-white">{task.title}</h3>
      </div>
      <p className="text-white/80 mb-4">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-green-400 font-bold text-lg">
          +${task.reward}
        </span>
        <button 
          onClick={() => onCompleteTask(task)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all"
        >
          Complete
        </button>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [isViewingProfile, setIsViewingProfile] = useState(false);
  const [earnedTotal, setEarnedTotal] = useState<number>(0);
  const [userEngagement, setUserEngagement] = useState<number>(0);
  const [unlockedVideoIds, setUnlockedVideoIds] = useState<number[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const { user } = useUser();

  const handleWatchClick = useCallback((video: Video): void => {
    window.open(video.youtubeLink, "_blank");
    setEarnedTotal((prev) => prev + video.earnings);
    setUserEngagement((prev) => Math.min(prev + 25, 100));
    
    // Schedule next video unlock
    setTimeout(() => {
      setUnlockedVideoIds(prev => {
        // Ensure we don't add duplicates
        const nextVideoId = videoData.find(
          v => !prev.includes(v.id) && v.requiredEngagement > 0
        )?.id;
        
        return nextVideoId && !prev.includes(nextVideoId) 
          ? [...prev, nextVideoId] 
          : prev;
      });
    }, video.unlockTime * 60 * 1000);
  }, []);

  const handleCompleteTask = useCallback((task: Task): void => {
    if (!completedTasks.includes(task.id)) {
      setEarnedTotal((prev) => prev + task.reward);
      setCompletedTasks(prev => [...prev, task.id]);
      setUserEngagement((prev) => Math.min(prev + 10, 100));
    }
  }, [completedTasks]);

  const userLevel = useMemo(() => {
    if (userEngagement < 25) return 'Beginner';
    if (userEngagement < 50) return 'Intermediate';
    if (userEngagement < 75) return 'Advanced';
    return 'Expert';
  }, [userEngagement]);

  if (isViewingProfile) {
    return <ProfilePage onBack={() => setIsViewingProfile(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 p-10">
      <div className="container mx-auto">
        {/* Header Section (Existing Code) */}
    
        <header className="text-center mb-16 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              Kenya Cash Generator
            </h1>
            <Rocket className="text-yellow-400 animate-bounce" size={40} />
          </div>
          
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => setIsViewingProfile(true)}
              className="bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full transition-all flex items-center"
            >
              <User size={18} className="mr-2" />
              Profile
            </button>

            <div className="bg-green-500/30 px-6 py-3 rounded-full">
              <span className="text-white font-bold text-xl">
                Total Earned: ${earnedTotal.toFixed(2)}
              </span>
            </div>

            <SignOutButton>
              <button className="bg-red-500/30 hover:bg-red-500/50 text-white px-4 py-2 rounded-full transition-all">
                Sign Out
              </button>
            </SignOutButton>
          </div>

          <div className="bg-white/20 px-6 py-3 rounded-full flex items-center space-x-4">
            <Zap className="text-yellow-400" />
            <span className="text-white font-semibold">
              User Level: {userLevel} ({userEngagement}%)
            </span>
            <div className="w-40 bg-white/30 rounded-full h-2.5">
              <div 
                className="bg-yellow-400 h-2.5 rounded-full" 
                style={{ width: `${userEngagement}%` }}
              ></div>
            </div>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
            <TrendingUp className="mr-4 text-yellow-400" />
            Platform Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, value: '100K+', label: 'Active Users', color: 'text-blue-400' },
              { icon: PlayCircle, value: '500K+', label: 'Videos Watched', color: 'text-green-400' },
              { icon: DollarSign, value: '$1M+', label: 'Total Earnings Today', color: 'text-yellow-400' }
            ].map((highlight, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 flex items-center space-x-6 transform hover:-translate-y-2 transition-all"
              >
                <highlight.icon size={40} className={`${highlight.color}`} />
                <div>
                  <h3 className="text-2xl font-bold text-white">{highlight.value}</h3>
                  <p className="text-white/80">{highlight.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
            <Youtube className="mr-4 text-red-400" />
            Earn Through Videos
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {videoData.map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                onWatchClick={handleWatchClick} 
                userEngagement={userEngagement}
                unlockedVideoIds={unlockedVideoIds}
              />
            ))}
          </div>
        </section>

        {/* Tasks Section */}

        <TiktokEarningPage />
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
            <Lightbulb className="mr-4 text-yellow-400" />
            Quick Earning Tasks
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {taskData.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onCompleteTask={handleCompleteTask}
              />
            ))}
          </div>
        </section>

        {/* More Sections... */}
        <footer className="text-center mt-20 text-white/80">
          <p className="text-sm font-medium">
            Developed by <span className="text-blue-400 hover:underline">Brian Itira</span> | © 2024 Kenya Cash Generator
          </p>
          <p className="text-xs mt-2 text-white/50">
            Disclaimer: Earnings based on actual engagement.
          </p>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <SignedIn>
        <AppContent />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
};

export default App;