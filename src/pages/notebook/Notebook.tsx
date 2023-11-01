import { useState } from "react";
import AppError from "../../components/AppError/Error";
import Loading from "../../components/Loading/Loading";
import NoteCard from "../../components/NoteCard/NoteCard";
import { queryClient } from "../../services/queryClient";
import { Note } from "../../types/Note";
import "./Notebook.css";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants";

export default function Notebook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {
    data: notes,
    isFetching,
    isError,
  } = useQuery("notes", async () => {
    const res = await fetch(`${baseUrl}/notes`);
    if (!res.ok) {
      throw new Error("Erro ao carregar os dados da lista de contatos");
    }

    return res.json();
  });

  const handleDeleteNote = useMutation(async (noteId: number) => {
    const res = await fetch(`${baseUrl}/notes/${noteId}`, {
      method: "DELETE",
    });

    return res.json();
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const handleEditNote = (noteId: number) => {
    navigate(`/notebook/${noteId}`);
  };

  const handleSubmit = useMutation(async () => {
    const id = new Date().getTime();

    const newNote: Note = {
      id: id,
      title: title,
      description: description,
    };

    if (title.trim().length === 0 || description.trim().length === 0) {
      window.alert("Preencha todos os campos para criar uma nova nota!");
      return;
    }

    const res = await fetch(`${baseUrl}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });

    if (!res.ok) {
      throw new Error("Falha na criação da nota.");
    }

    return res.json();
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
      setTitle("");
      setDescription("");
    }
  });

  if (isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <AppError />;
  }

  return (
    <div>
      <Link to="/"><button>Voltar</button></Link>
      <h1 className="notebook-title-label">Bloco de notas</h1>
      <div className="create-note-container">
        <div>
          <label htmlFor="title">Título</label>
          <input autoComplete="off" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Descrição</label>
          <input autoComplete="off" type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
      </div>
      <button className="create-note-button" type="button" onClick={() => handleSubmit.mutate()}>Criar</button>
      <div className="notebook">
        {notes.map((note: Note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            description={note.description}
            handleDelete={() => handleDeleteNote.mutate(note.id)}
            handleEdit={() => handleEditNote(note.id)}
          />  
        ))}
      </div>
    </div>
  );
}
