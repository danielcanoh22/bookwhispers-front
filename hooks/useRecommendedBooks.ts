import { getRecommendedBooks } from "@/services/recommended";
import { Book } from "@/types/global";
import { useQuery } from "@tanstack/react-query";

export const useRecommendedBooks = () => {
  const { data, isLoading, isError, error } = useQuery<Book[]>({
    queryKey: ["recommendedBooks"],
    queryFn: getRecommendedBooks,
  });

  return {
    recommendedBooks: data,
    isLoading,
    isError,
    error,
  };
};
