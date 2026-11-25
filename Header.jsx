
function Header() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          NoteNest
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Your thoughts, beautifully organized.
        </p>
      </div>

      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
        My Notes
      </span>
    </header>
  );
}

export default Header;
