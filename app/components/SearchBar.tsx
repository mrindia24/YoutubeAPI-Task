"use client";

import { useState } from "react";

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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Search YouTube videos..."
        className="flex-1 border px-4 py-2 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-red-600 text-white px-6 rounded">
        Search
      </button>
    </form>
  );
}
