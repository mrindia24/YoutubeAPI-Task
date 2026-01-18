"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-6">
      <div
        className="
          flex items-center
          w-full
          bg-zinc-900
          border border-zinc-700
          rounded-full
          overflow-hidden
        "
      >
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            flex-1
            px-4 py-2.5
            bg-transparent
            text-gray-200 placeholder-gray-500
            outline-none
          "
        />

        <button
          type="submit"
          className="
            px-5
            h-full
            text-gray-300
            flex items-center justify-center
            transition
          "
          aria-label="Search"
        >
          <FiSearch size={18} />
        </button>
      </div>
    </form>
  );
}
