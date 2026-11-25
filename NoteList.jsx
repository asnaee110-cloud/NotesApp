
import NoteCard from "./NoteCard";

function NoteList({ notes, onUpdate, onDelete, onPin, onArchive }) {
  if (notes.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-500">
          No notes found
        </h2>
        <p className="mt-2 text-gray-400">
          Your notes will appear here.
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onPin={onPin}
          onArchive={onArchive}
        />
      ))}
    </section>
  );
}

export default NoteList;
