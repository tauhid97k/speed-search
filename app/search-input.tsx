"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
      const data = await response.json();
      setSearchResults(data);
    };

    fetchResults();
  }, [input]);

  return (
    <div className="w-full max-w-md">
      <Command>
        <CommandInput
          value={input}
          onValueChange={setInput}
          placeholder="Search countries..."
          className="placeholder:text-zinc-500"
        />

        <CommandList>
          {searchResults?.results.length === 0 && !input ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : null}

          {searchResults?.results.length ? (
            <CommandGroup heading="Results">
              {searchResults?.results.map((result) => (
                <CommandItem key={result} value={result} onSelect={setInput}>
                  {result}
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}

          {searchResults?.results.length ? (
            <p className="p-2 text-xs text-zinc-500 border-t border-zinc-200">
              Found {searchResults.results.length} results in&nbsp;
              {searchResults?.duration.toFixed(0)}ms
            </p>
          ) : null}
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchInput;
