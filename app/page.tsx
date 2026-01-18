"use client";

import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import VideoCard from "./components/VideoCard";
import CollectionSidebar from "./components/CollectionSidebar";
import { Video } from "./types/video";
import VideoPlayer from "./components/VideoPlayer";
import { FiX } from "react-icons/fi";

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const loadDefaultVideos = async () => {
    try {
      setLoading(true);
      setVideos([]); // 🔥 clear before loading

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

  /* Search */
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    try {
      setHasSearched(true); // 🔥 mark as searched
      setLoading(true);
      setVideos([]); // clear old videos

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
  const resetToHome = async () => {
    setHasSearched(false);
    setActiveVideo(null);
    await loadDefaultVideos();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    loadDefaultVideos();
  }, []);

  return (
    <>
      {/* VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-3">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full h-[90%] md:w-[80%] md:h-[80%] relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition "
              onClick={() => setActiveVideo(null)}
            >
              <FiX size={22} />
            </button>

            <div className="w-full h-full p-3 md:p-6">
              <VideoPlayer videoId={activeVideo} />
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-zinc-950 text-gray-200 relative">
        {/* SIDEBAR */}
        <CollectionSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* HEADER */}
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="https://freepnglogo.com/images/all_img/1701508998white-youtube-logo-png.png"
                alt="YouTube"
                className="w-20"
              />
            </div>

            {/* Collections Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="
                flex items-center gap-2
                px-4 py-2 rounded-full
                bg-zinc-800 text-gray-300
                hover:bg-zinc-700 hover:text-white
                transition
              "
            >
              📁 Collections
            </button>
          </div>
        </header>

        {/* SEARCH + VIDEOS */}
        <section
          className={`
            max-w-7xl mx-auto px-4 md:px-6 py-6 transition-all
            ${sidebarOpen ? "md:ml-64" : ""}
          `}
        >
          {/* Search */}
          <SearchBar onSearch={handleSearch} />
          {hasSearched && !loading && (
            <div className="flex justify-end mt-3">
              <button
                onClick={resetToHome}
                className="
        flex items-center gap-2
        px-4 py-2 rounded-full
        bg-zinc-800 text-gray-300
        hover:bg-zinc-700 hover:text-white
        transition
      "
              >
                ⟲ Reset
              </button>
            </div>
          )}
          {/* Loading */}
          {loading && (
            <div className="flex justify-center mt-12">
              <div className="h-8 w-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Empty */}
          {!loading && videos.length === 0 && (
            <div className="w-[100%] h-[100%]  flex justify-center items-center ">
              <p className="text-center text-gray-400 mt-10">No videos found</p>
            </div>
          )}

          {/* Videos Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.videoId}
                  video={video}
                  onPlay={() => setActiveVideo(video.videoId)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
