export const searchBooks = async (query: string, signal?: AbortSignal) => {
  if (!query) return [];

  try {
    const response = await fetch(
      `http://localhost:3000/search?title=${query}`,
      { signal }
    );

    console.log("Respuesta de la API:", response);

    if (!response.ok) throw new Error("Error al buscar libros");

    return response.json();
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("Petición cancelada");
    } else {
      console.error("Error en la búsqueda:", error);
    }
    return [];
  }
};
