"use client";

import { useState } from "react";
import { useCollections } from "../context/CollectionContext";
import { Video } from "../types/video";
import { FiPlay } from "react-icons/fi";

interface Props {
  video: Video;
  onPlay?: () => void;
}

export default function VideoCard({ video, onPlay }: Props) {
  const { collections, addVideoToCollection } = useCollections();
  const [showToast, setShowToast] = useState(false);

  const selectedCollectionId =
    collections.find((col) =>
      col.videos.some((v) => v.videoId === video.videoId)
    )?.id || "";

  const handleSave = async (collectionId: string) => {
    if (!collectionId) return;

    await addVideoToCollection(collectionId, video);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="relative bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-600 transition flex flex-col">
      {/* Thumbnail */}
      <div
        className="relative cursor-pointer group"
        onClick={onPlay}
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-44 object-cover"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <FiPlay size={36} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-gray-200 line-clamp-2 mb-3">
          {video.title}
        </h3>

        {/* Save to Collection */}
        {collections.length > 0 && (
          <select
            className="
              mt-auto w-full
              bg-zinc-800 border border-zinc-700
              text-gray-200 text-sm
              rounded-md px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-red-500
              cursor-pointer
            "
            value={selectedCollectionId}
            onChange={(e) => handleSave(e.target.value)}
          >
            <option value="" disabled>
              Save to collection
            </option>

            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Toast */}
      {showToast && (
        <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded shadow">
          Saved ✓
        </div>
      )}
    </div>
  );
}
