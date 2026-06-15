function useFilteredSortedMovies(movies, search, selectedGenre, sortBy) {
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie?.description?.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "Todos" || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === "az") {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    }

    if (sortBy === "newest") {
      if (a.year > b.year) return -1;
      if (a.year < b.year) return 1;
      return 0;
    }

    if (sortBy === "oldest") {
      if (a.year < b.year) return -1;
      if (a.year > b.year) return 1;
      return 0;
    }

    return 0;
  });

  return { filteredMovies, sortedMovies };
}

export default useFilteredSortedMovies;
