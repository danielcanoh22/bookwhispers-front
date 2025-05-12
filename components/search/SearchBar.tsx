import { Input, InputField } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { ThemedView } from "../ThemedView";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../../services/search/api/books";
import { debounce } from "lodash";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 2) {
        onSearch(query);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <ThemedView className="p-4">
      <Input variant="rounded" size="md">
        <InputField
          placeholder="Buscar un libro..."
          value={query}
          onChangeText={setQuery}
        />
      </Input>
    </ThemedView>
  );
}
