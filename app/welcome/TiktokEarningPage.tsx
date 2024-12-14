import React, { useState, useCallback } from 'react';
import { 
  Music2, 
  Sparkles, 
  Users, 
  PlayCircle, 
  TrendingUp, 
  Heart, 
  Share2, 
  Award, 
  Star, 
  RefreshCcw, 
  Zap 
} from 'lucide-react';

interface TikTokContent {
  id: number;
  creator: string;
  profilePic: string;
  videoThumbnail: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  earnings: number;
  category: 'Comedy' | 'Dance' | 'Education' | 'Lifestyle';
  challengeType: 'View' | 'Like' | 'Share' | 'Comment';
  requiredActions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tiktokVideoUrl: string;
}

interface TikTokChallenge {
  id: number;
  title: string;
  description: string;
  reward: number;
  requiredInteractions: number;
  currentProgress: number;
}

const tiktokContentData: TikTokContent[] = [
  {
    id: 1,
    creator: "EntrepreneurTok",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    videoThumbnail: "https://invoice.ng/blog/wp-content/uploads/2019/11/Startup-Launch-Hacks-from-Experienced-Entrepreneurs.jpg",
    title: "5 Startup Hacks Every Kenyan Entrepreneur Needs",
    views: 45000,
    likes: 2300,
    comments: 450,
    shares: 120,
    earnings: 15.50,
    category: 'Education',
    challengeType: 'View',
    requiredActions: 100,
    difficulty: 'Easy',
    tiktokVideoUrl: "https://www.tiktok.com/@entrepreneurtok/video/1"
  },
  {
    id: 2,
    creator: "CoolLifestyleTok",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    videoThumbnail: "https://travellingbase.com/wp-content/uploads/2023/04/Budget-Travel-Tips-featured-image-1024x569.jpeg",
    title: "Budget Travel Secrets in Kenya",
    views: 62000,
    likes: 3100,
    comments: 580,
    shares: 210,
    earnings: 22.75,
    category: 'Lifestyle',
    challengeType: 'Like',
    requiredActions: 200,
    difficulty: 'Medium',
    tiktokVideoUrl: "https://www.tiktok.com/@coollifestyletok/video/2"
  },
  {
    id: 3,
    creator: "ComedyKing",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    videoThumbnail: "https://i.ytimg.com/vi/fRagwOGDmGo/maxresdefault.jpg",
    title: "Hilarious Startup Pitch Parodies",
    views: 78000,
    likes: 4500,
    comments: 950,
    shares: 350,
    earnings: 35.25,
    category: 'Comedy',
    challengeType: 'Share',
    requiredActions: 50,
    difficulty: 'Hard',
    tiktokVideoUrl: "https://www.tiktok.com/@comedyking/video/3"
  }
];

const tiktokChallengesData: TikTokChallenge[] = [
  {
    id: 1,
    title: "TikTok Engagement Master",
    description: "Interact with 10 educational TikToks",
    reward: 50,
    requiredInteractions: 10,
    currentProgress: 3
  },
  {
    id: 2,
    title: "Viral Video Hunter",
    description: "Find and engage with trending content",
    reward: 75,
    requiredInteractions: 20,
    currentProgress: 7
  }
];

const TikTokContentCard: React.FC<{ 
  content: TikTokContent, 
  onInteract: (content: TikTokContent, interactionType: string) => void 
}> = ({ content, onInteract }) => {
  return (
    <div className="bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl transform transition-all hover:scale-105">
      <div className="relative">
        <img 
          src={content.videoThumbnail} 
          alt={content.title} 
          className="w-full h-96 object-cover filter brightness-75"
        />
        <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full flex items-center">
          <Music2 size={20} className="mr-2 text-white" />
          <span className="text-white font-bold">{content.category}</span>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <img 
            src={content.profilePic} 
            alt={content.creator} 
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <h3 className="text-xl font-bold text-white">{content.creator}</h3>
            <p className="text-white/80 text-sm">{content.title}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 text-white text-center">
          {[
            { icon: PlayCircle, value: content.views, label: 'Views' },
            { icon: Heart, value: content.likes, label: 'Likes' },
            { icon: Share2, value: content.shares, label: 'Shares' },
            { icon: Award, value: content.earnings.toFixed(2), label: 'Earnings' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/20 p-2 rounded-xl">
              <stat.icon size={24} className="mx-auto mb-1" />
              <span className="font-bold block">{stat.value}</span>
              <span className="text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 space-y-2">
          <div className={`
            w-full h-2 rounded-full 
            ${content.difficulty === 'Easy' ? 'bg-green-500' : 
              content.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}
          `}></div>
          <div className="flex justify-between text-white/80 text-sm">
            <span>Difficulty: {content.difficulty}</span>
            <span>Earn: ${content.earnings}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {['View', 'Like', 'Share', 'Comment'].map((action) => (
            <button
              key={action}
              onClick={() => {
                onInteract(content, action.toLowerCase());
                
                if (action === 'View') {
                  window.open(content.tiktokVideoUrl, '_blank');
                } else if (action === 'Like') {
                  content.likes++;
                } else if (action === 'Share') {
                  window.open(`https://www.tiktok.com/share?video=${content.id}`, '_blank');
                } else if (action === 'Comment') {
                  window.open(`${content.tiktokVideoUrl}/comments`, '_blank');
                }
              }}
              className="flex-1 bg-white/20 hover:bg-white/40 text-white py-2 rounded-xl transition-all flex items-center justify-center"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const TikTokChallengeCard: React.FC<{ 
  challenge: TikTokChallenge, 
  onCompleteChallenge: (challenge: TikTokChallenge) => void 
}> = ({ challenge, onCompleteChallenge }) => {
  const progressPercentage = (challenge.currentProgress / challenge.requiredInteractions) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 space-y-4 transform hover:scale-105 transition-all">
      <div className="flex justify-between items-center">
        <Zap className="text-yellow-400" size={32} />
        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
          Challenge
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-white">{challenge.title}</h3>
      <p className="text-white/80">{challenge.description}</p>
      
      <div className="w-full bg-white/30 rounded-full h-3 mt-4">
        <div 
          className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-white/80">
        <span>Progress: {challenge.currentProgress}/{challenge.requiredInteractions}</span>
        <span className="font-bold text-green-400">+${challenge.reward}</span>
      </div>
      
      <button
        disabled={challenge.currentProgress < challenge.requiredInteractions}
        onClick={() => onCompleteChallenge(challenge)}
        className={`
          w-full py-3 rounded-xl text-white font-bold transition-all
          ${challenge.currentProgress < challenge.requiredInteractions 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105'}
        `}
      >
        {challenge.currentProgress < challenge.requiredInteractions 
          ? 'In Progress' 
          : 'Claim Reward'}
      </button>
    </div>
  );
};

const TikTokEarningsPage: React.FC = () => {
  const [totalEarned, setTotalEarned] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);

  const handleTikTokInteraction = useCallback((content: TikTokContent, interactionType: string) => {
    const earningMultipliers = {
      'view': 0.1,
      'like': 0.3,
      'share': 0.5,
      'comment': 0.4
    };

    const earnedAmount = content.earnings * (earningMultipliers[interactionType as 'view' | 'like' | 'share' | 'comment'] || 0.1);
    setTotalEarned(prev => prev + earnedAmount);
  }, []);

  const handleCompleteChallenge = useCallback((challenge: TikTokChallenge) => {
    if (!completedChallenges.includes(challenge.id)) {
      setTotalEarned(prev => prev + challenge.reward);
      setCompletedChallenges(prev => [...prev, challenge.id]);
    }
  }, [completedChallenges]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 p-10">
      <div className="container mx-auto">
        <header className="text-center mb-16 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              TikTok Cash Accelerator
            </h1>
            <Music2 className="text-pink-400 animate-pulse" size={40} />
          </div>
          
          <div className="bg-white/20 px-6 py-3 rounded-full flex items-center space-x-4">
            <Sparkles className="text-yellow-400" />
            <span className="text-white font-semibold">
              Total Earned: ${totalEarned.toFixed(2)}
            </span>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
            <TrendingUp className="mr-4 text-pink-400" />
            TikTok Earning Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, value: '50K+', label: 'Active Creators', color: 'text-pink-400' },
              { icon: PlayCircle, value: '200K+', label: 'Videos Engaged', color: 'text-purple-400' },
              { icon: Award, value: '$50K+', label: 'Earnings Today', color: 'text-indigo-400' }
            ].map((highlight, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 flex items-center space-x-6 transform hover:-translate-y-2 transition-all"
              >
                <highlight.icon size={40} className={highlight.color} />
                <div>
                  <h3 className="text-2xl font-bold text-white">{highlight.value}</h3>
                  <p className="text-white/80">{highlight.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
            <Music2 className="mr-4 text-pink-500" />
            Trending TikTok Content
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {tiktokContentData.map((content) => (
              <TikTokContentCard 
                key={content.id} 
                content={content}
                onInteract={handleTikTokInteraction}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
            <RefreshCcw className="mr-4 text-yellow-400" />
            TikTok Challenges
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {tiktokChallengesData.map((challenge) => (
              <TikTokChallengeCard 
                key={challenge.id} 
                challenge={challenge}
                onCompleteChallenge={handleCompleteChallenge}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TikTokEarningsPage;
