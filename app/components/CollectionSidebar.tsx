"use client";

import { useCollections } from "../context/CollectionContext";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CollectionSidebar({ open, onClose }: Props) {
  const { collections } = useCollections();
  const router = useRouter();

  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-bold text-lg cursor-pointer" onClick={() => {
              router.push("/collections");
              onClose();
            }}>📁 Collections</h2>
        <button onClick={onClose} className="text-xl">⬅️</button>
      </div>

    <ul className="p-4 space-y-3">
  {collections.length === 0 ? (
    <div className="flex flex-col items-center text-center mt-10">
      <img
        src="https://img.freepik.com/premium-vector/no-data-concept-illustration_114360-26121.jpg"
        alt="No collections"
        className="w-40 mb-4"
      />
      <p className="text-sm text-gray-500">
        No collections yet
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Create one to start saving videos
      </p>
    </div>
  ) : (
    collections.map((col) => (
      <li
        key={col.id}
        onClick={() => {
          router.push("/collections");
          onClose();
        }}
        className="cursor-pointer flex justify-between items-center px-3 py-2 rounded hover:bg-gray-100"
      >
        <span className="truncate">{col.name}</span>
        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
          {col.videos.length}
        </span>
      </li>
    ))
  )}
</ul>

    </div>
  );
}
