
function SearchBar({
  search,
  setSearch,
  sortBy,
  setSortBy,
  showArchived,
  setShowArchived,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search your notes..."
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 sm:max-w-sm"
      />

      <div className="flex gap-3">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A-Z</option>
        </select>

        <button
          onClick={() => setShowArchived(!showArchived)}
          className="rounded-xl bg-gray-800 px-4 py-2 text-white"
        >
          {showArchived ? "My Notes" : "Archive"}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
