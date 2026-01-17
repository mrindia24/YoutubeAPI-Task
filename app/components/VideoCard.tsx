"use client";

import { useState } from "react";
import { useCollections } from "../context/CollectionContext";
import { Video } from "../types/video";

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

    // show toast
    setShowToast(true);

    // auto hide after 2s
    setTimeout(() => setShowToast(false), 2000);
  };

 return (
  <div className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
    {/* Thumbnail */}
    <img
      src={video.thumbnail}
      alt={video.title}
      className="w-full h-44 object-cover cursor-pointer"
      onClick={onPlay}
    />

    {/* Content */}
    <div className="p-4 flex flex-col flex-1">
      <h3 className="text-sm font-semibold line-clamp-2 mb-3">
        {video.title}
      </h3>

      {/* Push select to bottom */}
      {collections.length > 0 && (
        <select
          className="
            mt-auto w-full
            border rounded-md px-3 py-2
            text-sm bg-white
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

    {/* TOAST */}
    {showToast && (
      <div className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded shadow animate-fade">
        Saved to collection ✓
      </div>
    )}
  </div>
);

}
