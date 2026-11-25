
import { useState } from "react";
import ColorPicker from "./ColorPicker";

function NoteCard({ note, onUpdate, onDelete, onPin, onArchive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState(note.color);

  function saveEdit() {
    if (!content.trim()) {
      alert("Content cannot be empty.");
      return;
    }

    if (title.length > 100) {
      alert("Title cannot exceed 100 characters.");
      return;
    }

    onUpdate({
      ...note,
      title: title.trim(),
      content: content.trim(),
      color,
    });

    setIsEditing(false);
  }

  return (
    <article className={`rounded-2xl border border-gray-200 p-5 shadow-sm ${note.color}`}>
      {isEditing ? (
        <>
          <input
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="mb-3 w-full rounded-lg border border-gray-200 bg-white/70 p-2 outline-none"
          />

          <textarea
            value={content}
            maxLength={5000}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white/70 p-2 outline-none"
            rows="5"
          />

          <div className="my-4">
            <ColorPicker color={color} setColor={setColor} />
          </div>

          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="rounded-lg bg-gray-200 px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2">
            <h3 className="break-words text-lg font-semibold text-gray-800">
              {note.title || "Untitled"}
            </h3>

            <button
              onClick={() => onPin(note.id)}
              title="Pin note"
              className="text-lg"
            >
              {note.pinned ? "📌" : "📍"}
            </button>
          </div>

          <p className="mt-3 whitespace-pre-wrap break-words text-gray-700">
            {note.content}
          </p>

          <p className="mt-4 text-xs text-gray-500">
            Created: {new Date(note.createdAt).toLocaleString()}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-300/60 pt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-white/70 px-3 py-1.5 text-sm"
            >
              Edit
            </button>

            <button
              onClick={() => {
                if (window.confirm("Delete this note?")) {
                  onDelete(note.id);
                }
              }}
              className="rounded-lg bg-white/70 px-3 py-1.5 text-sm text-red-600"
            >
              Delete
            </button>

            <button
              onClick={() => onArchive(note.id)}
              className="rounded-lg bg-white/70 px-3 py-1.5 text-sm"
            >
              {note.archived ? "Unarchive" : "Archive"}
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default NoteCard;
