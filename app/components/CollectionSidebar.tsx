"use client";

import { useCollections } from "../context/CollectionContext";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { MdCollectionsBookmark } from "react-icons/md";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CollectionSidebar({ open, onClose }: Props) {
  const { collections } = useCollections();
  const router = useRouter();

  const goToCollections = () => {
    router.push("/collections");
    onClose();
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-64
          bg-zinc-900 border-r border-zinc-800
          z-50 transform transition-transform duration-300
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h2
            className="flex items-center gap-2 font-semibold text-lg text-gray-200 cursor-pointer"
            onClick={goToCollections}
          >
            <MdCollectionsBookmark size={20} />
            Collections
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-800 transition text-gray-300"
          >
            <FiArrowLeft size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {collections.length === 0 ? (
            <div className="flex flex-col items-center text-center mt-10">
              <img
                src="/no-video.png"
                alt="No collections"
                className="w-40 mb-4 opacity-90"
              />
              <p className="text-sm text-gray-300">No collections yet</p>
              <p className="text-xs text-gray-500 mt-1">
                Create one to start saving videos
              </p>
            </div>
          ) : (
            collections.map((col) => (
              <div
                key={col.id}
                onClick={goToCollections}
                className="
                  cursor-pointer flex justify-between items-center
                  px-3 py-2 rounded-md
                  text-gray-300
                  hover:bg-zinc-800 hover:text-white
                  transition
                "
              >
                <span className="truncate">{col.name}</span>
                <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full">
                  {col.videos.length}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={goToCollections}
            className="
              w-full flex items-center justify-center gap-2
              px-4 py-2.5 rounded-full
              bg-red-600 text-white
              hover:bg-red-700
              active:scale-95
              transition
            "
          >
            <FiPlus size={18} />
            Add Collection
          </button>
        </div>
      </div>
    </>
  );
}
