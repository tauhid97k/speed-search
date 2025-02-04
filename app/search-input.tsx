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

      // Fetch results here
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
