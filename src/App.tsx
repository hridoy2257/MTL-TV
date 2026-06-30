/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Tv, Menu, X, PlayCircle } from 'lucide-react';
import { HlsPlayer } from './components/HlsPlayer';
import { AdminDashboard } from './components/AdminDashboard';
import { channels as staticChannels, CATEGORIES, Channel } from './data';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import Papa from 'papaparse';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [dynamicChannels, setDynamicChannels] = useState<Channel[]>([]);
  const [isAdminView, setIsAdminView] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const handleHashChange = () => setIsAdminView(window.location.hash === '#admin');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Listen to Firebase settings to get CSV URL
    const unsub = onSnapshot(doc(db, "settings", "sports"), (docSnap) => {
      if (docSnap.exists() && docSnap.data().csvUrl) {
        const url = docSnap.data().csvUrl;
        
        // Fetch and parse CSV
        Papa.parse(url, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedChannels: Channel[] = results.data.map((row: any, i) => ({
              id: `csv-${i}-${Date.now()}`,
              name: row.name || 'Unknown Channel',
              url: row.url || row.m3u8 || '',
              cat: row.category || row.cat || row.group || 'Sports',
              logo: row.logo || row.tvgLogo || 'https://placehold.co/64x64/0f172a/38bdf8?text=TV'
            })).filter(c => c.url);
            setDynamicChannels(parsedChannels);
          },
          error: (err) => {
            console.error("Error parsing CSV:", err);
          }
        });
      } else {
        setDynamicChannels([]);
      }
    }, (error) => {
      console.error("Error fetching settings:", error);
    });

    return () => unsub();
  }, []);

  const allChannels = useMemo(() => {
    return [...staticChannels, ...dynamicChannels];
  }, [dynamicChannels]);

  // Filter channels based on search and category
  const filteredChannels = useMemo(() => {
    return allChannels.filter((ch) => {
      const matchSearch = ch.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === 'all' || ch.cat === selectedCat;
      return matchSearch && matchCat;
    });
  }, [search, selectedCat, allChannels]);

  // Dynamically extract categories if there are new ones in CSV
  const allCategories = useMemo(() => {
    const cats = new Set(CATEGORIES);
    dynamicChannels.forEach(c => cats.add(c.cat));
    const sortedCats = Array.from(cats).filter(c => c !== 'all').sort();
    return ['all', ...sortedCats];
  }, [dynamicChannels]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Tv className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                MTL TV
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">Live Streaming</p>
            </div>
          </a>
          <div>
            <a 
              href={isAdminView ? "#" : "#admin"} 
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-slate-700 hover:border-cyan-500 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {isAdminView ? "Back to TV" : "Admin Dashboard"}
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 flex flex-col gap-8">
        
        {isAdminView ? (
          <AdminDashboard />
        ) : (
          <>
            {/* Player Section */}
            <section className="w-full">
              {activeChannel ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <HlsPlayer url={activeChannel.url} poster={activeChannel.logo} autoPlay />
                  
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src={activeChannel.logo} 
                        className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 shadow-inner object-cover"
                        alt=""
                      />
                      <div>
                        <h2 className="text-xl font-bold tracking-tight text-white">{activeChannel.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm letter-spacing-wide flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            Live
                          </span>
                          <span className="text-sm text-slate-400">{activeChannel.cat}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center shadow-lg">
                  <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                    <PlayCircle className="w-10 h-10 text-slate-500" />
                  </div>
                  <h2 className="text-2xl font-medium text-slate-300 mb-2">Select a Channel</h2>
                  <p className="text-slate-500 max-w-sm">Choose an active live stream from the list below to begin watching MTL TV.</p>
                </div>
              )}
            </section>

            {/* List Section */}
            <section className="flex flex-col gap-4 pb-12">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
                {/* Search */}
                <div className="relative w-full md:w-72 shrink-0">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search channels..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                  />
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide snap-x">
                  {allCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCat(cat)}
                      className={cn(
                        "snap-start px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                        selectedCat === cat 
                          ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20" 
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Channel Grid */}
              {filteredChannels.length === 0 ? (
                <div className="text-center py-20 text-slate-500 text-sm border border-slate-800 border-dashed rounded-xl">
                  <Search className="w-10 h-10 mx-auto mb-4 opacity-20" />
                  No channels found for "{search}".
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filteredChannels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => {
                        setActiveChannel(channel);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={cn(
                        "flex flex-col items-center gap-3 p-4 rounded-xl transition-all text-center group border shadow-sm",
                        activeChannel?.id === channel.id
                          ? "bg-cyan-500/10 border-cyan-500/30 ring-1 ring-cyan-500/50"
                          : "bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-700 hover:-translate-y-1"
                      )}
                    >
                      <div className="relative shrink-0">
                        <img 
                          src={channel.logo} 
                          alt={channel.name}
                          className="w-16 h-16 rounded-xl object-contain bg-slate-950 border border-slate-800 shadow-sm"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/64x64/0f172a/38bdf8?text=TV";
                          }}
                        />
                        {activeChannel?.id === channel.id && (
                          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-[3px] border-slate-900 animate-pulse" />
                        )}
                      </div>
                      <div className="flex-1 w-full min-w-0">
                        <div className={cn(
                          "font-semibold text-sm truncate",
                          activeChannel?.id === channel.id ? "text-cyan-400" : "text-slate-200"
                        )}>
                          {channel.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate mt-1">
                          {channel.cat}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}


