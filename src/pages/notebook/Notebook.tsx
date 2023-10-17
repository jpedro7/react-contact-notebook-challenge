import AppError from "../../components/AppError/Error";
import Loading from "../../components/Loading/Loading";
import NoteCard from "../../components/NoteCard/NoteCard";
import { Note } from "../../types/Note";
import "./Notebook.css";
import { useQuery } from "react-query";

export default function Notebook() {
  const {
    data: notes,
    isFetching,
    isError,
  } = useQuery("notes", async () => {
    const response = await fetch("http://localhost:5000/notes");
    if (!response.ok) {
      throw new Error("Erro ao carregar os dados da lista de contatos");
    }

    return response.json();
  });

  if (isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <AppError />;
  }

  return (
    <div>
      <h1>Bloco de notas</h1>
      <div className="notebook">
        {notes.map((note: Note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            description={note.description}
          />
        ))}
      </div>
    </div>
  );
}
