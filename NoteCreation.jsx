
import { useState } from "react";
import ColorPicker from "./ColorPicker";

function NoteCreation({ notes, onAddNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("bg-white");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) {
      setError("Note content cannot be empty.");
      return;
    }

    if (title.length > 100) {
      setError("Title cannot exceed 100 characters.");
      return;
    }

    const duplicate = notes.some(
      (note) =>
        note.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        note.content.trim().toLowerCase() === content.trim().toLowerCase()
    );

    if (duplicate) {
      setError("This note already exists.");
      return;
    }

    onAddNote({
      title: title.trim(),
      content: content.trim(),
      color,
      tags: [],
    });

    setTitle("");
    setContent("");
    setColor("bg-white");
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        placeholder="Title (optional)"
        className="mb-4 w-full border-b border-gray-200 pb-3 text-lg font-semibold outline-none"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={5000}
        rows="4"
        placeholder="Take a note..."
        className="w-full resize-none outline-none"
      />

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ColorPicker color={color} setColor={setColor} />

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          Add Note
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}

      <p className="mt-2 text-xs text-gray-400">
        {title.length}/100 title characters · {content.length}/5000 content characters
      </p>
    </form>
  );
}

export default NoteCreation;
