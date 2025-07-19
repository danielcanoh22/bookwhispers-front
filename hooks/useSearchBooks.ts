import { searchBooks } from "@/services/search";
import { useQuery } from "@tanstack/react-query";

export const useSearchBooks = (
  searchTerm: string,
  searchBy: "title" | "subject"
) => {
  const params = { [searchBy]: searchTerm };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookSearch", searchBy, searchTerm],

    queryFn: () => searchBooks(params),

    enabled: searchTerm.length > 2,
  });

  return {
    searchResults: data,
    isLoading,
    isError,
    error,
  };
};
