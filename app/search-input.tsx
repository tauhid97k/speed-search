"use client";

import { useEffect, useState } from "react";

const SearchInput = () => {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  // Get results on input change
  useEffect(() => {
    const fetchResults = async () => {
      if (!input) return setSearchResults(undefined);

      const response = await fetch(`/api/search?q=${input}`);
    };

    fetchResults();
  }, [input]);

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default SearchInput;
