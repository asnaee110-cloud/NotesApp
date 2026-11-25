


import { useEffect, useState } from "react";
import Header from "./Components/Header";
import NoteCreation from "./Components/NoteCreation";
import NoteList from "./Components/NoteList";
import SearchBar from "./Components/SearchBar";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showArchived, setShowArchived] = useState(false);

  // Save notes whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Create a new note
  function addNote(note) {
    const newNote = {
      ...note,
      id: crypto.randomUUID(),
      pinned: false,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes((previousNotes) => [newNote, ...previousNotes]);
  }

  // Update an existing note
  function updateNote(updatedNote) {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === updatedNote.id
          ? { ...updatedNote, updatedAt: new Date().toISOString() }
          : note
      )
    );
  }

  // Delete a note
  function deleteNote(id) {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );
  }

  // Pin or unpin a note
  function togglePin(id) {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  }

  // Archive or unarchive a note
  function toggleArchive(id) {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  }

  // Filter notes
  let filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());

    return matchesSearch && note.archived === showArchived;
  });

  // Sort notes
  filteredNotes.sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return Number(b.pinned) - Number(a.pinned);
    }

    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl space-y-8 p-5 sm:p-8">

        <Header />

        <NoteCreation
          notes={notes}
          onAddNote={addNote}
        />

        <SearchBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showArchived={showArchived}
          setShowArchived={setShowArchived}
        />

        <NoteList
          notes={filteredNotes}
          onUpdate={updateNote}
          onDelete={deleteNote}
          onPin={togglePin}
          onArchive={toggleArchive}
        />

      </div>
    </main>
  );
}

export default App;
