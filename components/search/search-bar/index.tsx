import React, { useState, useEffect } from "react";
import { Input, InputField } from "@/components/ui/input";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length === 0 || query.length > 2) {
        onSearch(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <Input variant="rounded" size="md" className="bg-white">
      <InputField
        placeholder="Buscar un libro..."
        value={query}
        onChangeText={setQuery}
      />
    </Input>
  );
}
