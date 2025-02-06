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

interface SearchResults {
  results: string[];
  duration: number;
}

const SearchInput = () => {
  const [input, setInput] = useState<string>("");
  const [debouncedInput, setDebouncedInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults | undefined>(
    undefined
  );

  // Debounce Input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  // Get results on debounced input change
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedInput) {
        return setSearchResults(undefined);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search?q=${debouncedInput}`
      );
      const data = await response.json();
      setSearchResults(data);
    };

    fetchResults();
  }, [debouncedInput]);

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
          {searchResults?.results.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : null}

          {searchResults?.results.length ? (
            <CommandGroup heading="Results">
              {searchResults?.results.map((result) => (
                <CommandItem
                  key={result}
                  value={result}
                  onSelect={(selectedValue) => {
                    setDebouncedInput("");
                    setInput(selectedValue);
                  }}
                >
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
