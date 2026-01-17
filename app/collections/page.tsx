"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCollections } from "../context/CollectionContext";
import VideoPlayer from "../components/VideoPlayer";

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
    return <p className="p-6 text-center">Loading collections...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header (MATCH HOME UI) */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-red-600">My Collections</h1>
            <p className="text-sm text-gray-600">Manage your saved videos</p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            ⬅ Back to Search
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-6xl mx-auto p-6">
        {/* Create Collection */}
        <div className="flex gap-3 mb-10">
          <input
            className="border rounded-lg px-4 py-2 w-72 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="New collection name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-red-600 hover:bg-red-700 transition text-white px-5 rounded-lg"
            onClick={() => {
              if (!name.trim()) return;
              createCollection(name);
              setName("");
            }}
          >
            Create
          </button>
        </div>
{collections.length === 0 && (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <img
      src="https://img.freepik.com/premium-vector/no-data-concept-illustration_114360-26121.jpg"
      alt="No collections"
      className="w-72 mb-6"
    />
    <h3 className="text-xl font-semibold text-gray-700">
      No collections yet
    </h3>
    <p className="text-gray-500 mt-2">
      Create a collection to start saving videos
    </p>
  </div>
)}
{collections.length > 0 && (
    <div className="space-y-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white rounded-xl shadow-md p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700">
                  📁 {collection.name} ({collection.videos.length})
                </h2>

                <div className="flex gap-3 text-lg">
                  <button
                    title="Edit name"
                    onClick={() =>
                      setEditTarget({
                        id: collection.id,
                        name: collection.name,
                      })
                    }
                  >
                    ✏️
                  </button>

                  <button
                    title="Clear all videos"
                    onClick={() => setClearTarget(collection.id)}
                  >
                    🧹
                  </button>

                  <button
                    title="Delete collection"
                    onClick={() => setDeleteTarget(collection.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>

            {collection.videos.length === 0 && (
  <div className="flex flex-col items-center justify-center py-10 text-center">
    <img
      src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg"
      alt="No videos"
      className="w-64 mb-4"
    />
    <p className="text-gray-500">
      No videos in this collection
    </p>
  </div>
)}


              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {collection.videos.map((video) => (
                  <div
                    key={video.videoId}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={video.thumbnail}
                      className="cursor-pointer"
                      onClick={() => setActiveVideo(video.videoId)}
                    />

                    <div className="p-3 flex justify-between items-start gap-2">
                      <p className="text-sm font-medium line-clamp-2">
                        {video.title}
                      </p>

                      {/* Remove icon */}
                      <button
                        className="text-red-500 hover:text-red-700 text-lg cursor-pointer"
                        title="Remove video"
                        onClick={() =>
                          setRemoveTarget({
                            collectionId: collection.id,
                            videoId: video.videoId,
                          })
                        }
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
)}


        {/* Collections */}
        
      
      </section>
      {editTarget && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Edit Collection Name</h3>

            <input
              className="border rounded w-full px-3 py-2 mb-4"
              value={editTarget.name}
              onChange={(e) =>
                setEditTarget({ ...editTarget, name: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded cursor-pointer"
                onClick={() => setEditTarget(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Clear all videos?</h3>
            <p className="text-sm text-gray-600 mb-6">
              This will remove all videos from the collection.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-200 px-4 py-2 rounded cursor-pointer"
                onClick={() => setClearTarget(null)}
              >
                No
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
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

      {/* VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[80%] h-[80%] relative shadow-xl">
            <button
              className="absolute top-0 right-0  text-2xl text-gray-600 hover:text-black "
              onClick={() => setActiveVideo(null)}
            >
              ❌
            </button>

            <div className="w-full h-full p-6">
              <VideoPlayer videoId={activeVideo} />
            </div>
          </div>
        </div>
      )}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Delete collection?</h3>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
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

      {/* REMOVE CONFIRMATION MODAL */}
      {removeTarget && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm
 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Remove this video?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove this video from the collection?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setRemoveTarget(null)}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  removeVideoFromCollection(
                    removeTarget.collectionId,
                    removeTarget.videoId
                  );
                  setRemoveTarget(null);
                }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
