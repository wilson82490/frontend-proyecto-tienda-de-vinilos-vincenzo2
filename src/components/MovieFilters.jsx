function MovieFilters({
  search,
  selectedGenre,
  sortBy,
  genres,
  onSearchChange,
  onGenreChange,
  onSortChange,
}) {
  return (
    <div className="movie-filters">
      <div>
        <label className="search-label" htmlFor="search">
          Buscar por titulo o descripción:
        </label>
        <input
          className="search-input"
          placeholder="Buscar por titulo o descripción..."
          type="search"
          name="search"
          id="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <select
        className="filter-select"
        value={selectedGenre}
        onChange={(event) => onGenreChange(event.target.value)}
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="default">Orden por defecto</option>
        <option value="az">A-Z</option>
        <option value="newest">Más nuevo</option>
        <option value="oldest">Más viejo</option>
      </select>
    </div>
  );
}

export default MovieFilters;
