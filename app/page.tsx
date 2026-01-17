"use client";

import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import VideoCard from "./components/VideoCard";
import CollectionSidebar from "./components/CollectionSidebar";
import { Video } from "./types/video";
import VideoPlayer from "./components/VideoPlayer";

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const loadDefaultVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/youtube");
      const data = await res.json();

      const formatted = data.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      setVideos(formatted);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/youtube?q=${query}`);
      const data = await res.json();

      const formatted = data.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      setVideos(formatted);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDefaultVideos();
  }, []);

  return (
    <>
      {/* VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-3">
          <div className="bg-white rounded-xl w-full h-[90%] md:w-[80%] md:h-[80%] relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-xl text-gray-600"
              onClick={() => setActiveVideo(null)}
            >
              ❌
            </button>

            <div className="w-full h-full p-3 md:p-6">
              <VideoPlayer videoId={activeVideo} />
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-gray-100 relative">
        {/* Sidebar */}
        <CollectionSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-6xl mx-auto p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/3840px-YouTube_Logo_2017.svg.png"
                alt="YouTube"
                className="w-16 md:w-20"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-red-600">
                  YouTube Playlist Curator
                </h1>
                <p className="text-xs md:text-sm text-gray-600">
                  Search videos and save them into collections
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition w-full md:w-auto"
            >
              📁 Collections
            </button>
          </div>
        </header>

        {/* Search & Videos */}
        <section
          className={`
            max-w-6xl mx-auto p-4 md:p-6 transition-all
            ${sidebarOpen ? "md:ml-64" : ""}
          `}
        >
          <SearchBar onSearch={handleSearch} />

          {loading && (
            <p className="text-center text-gray-500 mt-6">
              Loading videos...
            </p>
          )}

          {!loading && videos.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No videos found
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
            {videos.map((video) => (
              <VideoCard
                key={video.videoId}
                video={video}
                onPlay={() => setActiveVideo(video.videoId)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
