import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  DollarSign,
  Users,
  Share2,
  Smile,
  Sparkles,
  Award,
  Rocket,
  ChevronLeft
} from "lucide-react";
import "tailwindcss/tailwind.css";

const ProfilePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { user } = useUser();
  const [referralLink] = useState<string>(
    `https://kenyacashgenerator.com/referral/${user?.id}`
  );
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (): void => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 p-4 md:p-10 overflow-hidden">
      <div className="container mx-auto bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-6 md:p-10 space-y-8 overflow-hidden">
        <header className="flex justify-between items-center relative">
          <button
            onClick={onBack}
            className="group text-white bg-white/20 hover:bg-white/40 rounded-full p-2 flex items-center space-x-2 transition-all duration-300"
          >
            <ChevronLeft size={18} className="text-white group-hover:scale-110" />
            <span>Back</span>
          </button>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
            Your Profile
          </h1>
          <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" size={40} />
        </header>

        <section className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10 items-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-xl opacity-50 animate-spin-slow"></div>
            <img
              src={user?.imageUrl}
              alt={user?.fullName || "User"}
              className="relative w-36 h-36 rounded-full border-4 border-white/80 shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-6"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white">
              {user?.fullName || "Epic User"}
            </h2>
            <p className="text-white/90 text-lg">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="mr-4 text-yellow-400" />
            Earnings Explosion
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: <DollarSign size={40} className="text-green-400" />, 
                value: "$125.00", 
                label: "Total Earnings",
                bgClass: "bg-green-500/20 hover:bg-green-500/40"
              },
              { 
                icon: <Users size={40} className="text-blue-400" />, 
                value: "5", 
                label: "Referrals",
                bgClass: "bg-blue-500/20 hover:bg-blue-500/40"
              },
              { 
                icon: <Smile size={40} className="text-yellow-400" />, 
                value: "$25.00", 
                label: "Referral Earnings",
                bgClass: "bg-yellow-500/20 hover:bg-yellow-500/40"
              }
            ].map((card, index) => (
              <div 
                key={index} 
                className={`${card.bgClass} p-6 rounded-2xl shadow-xl transform transition-all duration-500 hover:-translate-y-2 flex items-center space-x-6`}
              >
                {card.icon}
                <div>
                  <h4 className="text-2xl font-bold text-white">{card.value}</h4>
                  <p className="text-white/90">{card.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Rocket className="mr-4 text-pink-400" />
            Referral Rocket
          </h3>
          <div className="bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
            <p className="text-white/90 mb-4">
              🚀 Blast off with referrals! Earn $5 for every cosmic traveler who joins!
            </p>
            <div className="mt-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 p-4 bg-white/20 text-white border border-white/30 rounded-xl focus:ring-4 focus:ring-pink-500/50 transition-all duration-300"
              />
              <button
                onClick={handleCopyLink}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:rotate-2 flex items-center justify-center"
              >
                <Share2 size={18} className="mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;