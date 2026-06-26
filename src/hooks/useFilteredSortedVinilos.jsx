function useFilteredSortedVinilos(vinilos, search, selectedGenre, sortBy) {
  const filteredVinilos = vinilos.filter((vinilo) => {
    const matchesSearch =
      vinilo.title.toLowerCase().includes(search.toLowerCase()) ||
      vinilo?.description?.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "Todos" || vinilo.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const sortedVinilos = [...filteredVinilos].sort((a, b) => {
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

  return { filteredVinilos, sortedVinilos };
}

export default useFilteredSortedVinilos;
