"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCollections } from "../context/CollectionContext";
import VideoPlayer from "../components/VideoPlayer";
import { FiArrowLeft, FiEdit2, FiTrash2 } from "react-icons/fi";
import { MdClearAll } from "react-icons/md";

export default function CollectionsPage() {
  const {
    collections,
    loading,
    createCollection,
    removeVideoFromCollection,
    updateCollectionName,
    clearCollectionVideos,
    deleteCollection,
  } = useCollections();

  const router = useRouter();

  const [name, setName] = useState("");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // remove confirmation state
  const [removeTarget, setRemoveTarget] = useState<{
    collectionId: string;
    videoId: string;
  } | null>(null);
  const [editTarget, setEditTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [clearTarget, setClearTarget] = useState<string | null>(null);
  if (loading) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />

        {/* Text */}
        <p className="text-sm text-gray-400 tracking-wide">
          Loading your collections
        </p>
      </div>
    </div>
  );
}


 return (
    <main className="min-h-screen bg-zinc-950 text-gray-200">
      <header className="bg-zinc-900 border-b border-zinc-800">
       <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <div>
    <h1 className="text-xl sm:text-2xl font-bold text-red-500">
      My Collections
    </h1>
    <p className="text-xs sm:text-sm text-gray-400">
      Manage your saved videos
    </p>
  </div>

  <button
    onClick={() => router.push("/")}
    className="
      hidden sm:flex
      items-center gap-2
      px-4 py-2
      rounded-full
      bg-zinc-800 text-gray-300
      hover:bg-zinc-700 hover:text-white
      transition
    "
  >
    <FiArrowLeft size={18} />
    <span className="text-sm font-medium">Back to Search</span>
  </button>

  <button
    onClick={() => router.push("/")}
    className="
      sm:hidden
      absolute top-4 right-4
      p-2
      rounded-full
      text-gray-300
      hover: hover:text-white
      transition
    "
    aria-label="Close"
  >
    ✕
  </button>
</div>

      </header>
      <section className="max-w-6xl mx-auto p-6">
        <div className="flex gap-3 mb-10">
          <input
            className="bg-zinc-900 border border-zinc-700 text-gray-200 placeholder-gray-500 rounded-lg px-4 py-2 w-72 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="New collection name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={() => {
              if (!name.trim()) return;
              createCollection(name);
              setName("");
            }}
            className="px-6 py-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 active:scale-95 transition"
          >
            Create
          </button>
        </div>

        {/* NO COLLECTIONS */}
        {collections.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <img
              src="/no-video.png"
              className="w-72 mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-200">
              No collections yet
            </h3>
            <p className="text-gray-400 mt-2">
              Create a collection to start saving videos
            </p>
          </div>
        )}

        {/* COLLECTIONS */}
        {collections.length > 0 && (
          <div className="space-y-8">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-100">
                    📁 {collection.name} ({collection.videos.length})
                  </h2>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setEditTarget({
                          id: collection.id,
                          name: collection.name,
                        })
                      }
                      className="p-2 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    >
                      <FiEdit2 size={18} />
                    </button>

                    <button
                      onClick={() => setClearTarget(collection.id)}
                      className="p-2 rounded-full bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
                    >
                      <MdClearAll size={20} />
                    </button>

                    <button
                      onClick={() => setDeleteTarget(collection.id)}
                      className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* NO VIDEOS */}
                {collection.videos.length === 0 && (
                  <div className="flex flex-col items-center py-10 text-center">
                    <img
                      src="/no-video.png"
                      className="w-64 mb-4"
                    />
                    <p className="text-gray-400">
                      No videos in this collection
                    </p>
                  </div>
                )}

                {/* VIDEOS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {collection.videos.map((video) => (
                    <div
                      key={video.videoId}
                      className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-600 transition"
                    >
                      <img
                        src={video.thumbnail}
                        className="cursor-pointer w-full"
                        onClick={() => setActiveVideo(video.videoId)}
                      />

                      <div className="p-3 flex justify-between gap-2">
                        <p className="text-sm font-medium text-gray-200 line-clamp-2">
                          {video.title}
                        </p>

                        <button
                          onClick={() =>
                            setRemoveTarget({
                              collectionId: collection.id,
                              videoId: video.videoId,
                            })
                          }
                          className="p-2 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>


      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-[80%] h-[80%] p-4 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setActiveVideo(null)}
            >
              ✕
            </button>
            <VideoPlayer videoId={activeVideo} />
          </div>
        </div>
      )}

      {/* EDIT */}
      {editTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Edit Collection Name
            </h3>
            <input
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 mb-4"
              value={editTarget.name}
              onChange={(e) =>
                setEditTarget({ ...editTarget, name: e.target.value })
              }
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-zinc-700 rounded"
                onClick={() => setEditTarget(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded"
                onClick={() => {
                  updateCollectionName(editTarget.id, editTarget.name);
                  setEditTarget(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {clearTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-96">
            <p className="mb-6">Clear all videos from this collection?</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-zinc-700 rounded"
                onClick={() => setClearTarget(null)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded"
                onClick={() => {
                  clearCollectionVideos(clearTarget);
                  setClearTarget(null);
                }}
              >
                Yes, Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-96">
            <p className="mb-6">Delete this collection permanently?</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-zinc-700 rounded"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded"
                onClick={() => {
                  deleteCollection(deleteTarget);
                  setDeleteTarget(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {removeTarget && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-96">
            <p className="mb-6">Remove this video from the collection?</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-zinc-700 rounded"
                onClick={() => setRemoveTarget(null)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded"
                onClick={() => {
                  removeVideoFromCollection(
                    removeTarget.collectionId,
                    removeTarget.videoId
                  );
                  setRemoveTarget(null);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
