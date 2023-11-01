import "./editNote.css"
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppError from "../../components/AppError/Error";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";
import { Note } from "../../types/Note";
import { baseUrl } from "../../constants";

export default function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {
    data: note,
    isFetching,
    isError,
  } = useQuery(["note"], async () => {
    const res = await fetch(`${baseUrl}/notes/${id}`);

    if (!res.ok) {
      throw new Error("Erro ao carregar as informações do contato");
    }

    return res.json();
  }, {
    onSuccess: (data) => {
      setTitle(data.title);
      setDescription(data.description);
    },
  });

  const handleSubmit = useMutation(async () => {
    const updatedNote: Note = {
      id: note.id,
      title: title,
      description: description,
    }

    if (title.trim().length === 0 || description.trim().length === 0) {
      window.alert("Todos os campos precisam estar preenchidos!");
      return;
    }

    const res = await fetch(`${baseUrl}/notes/${updatedNote.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });

    return res.json();
  }, {
    onSuccess: () => {
      navigate("/notebook");
    },
  });

  if (isFetching) {
    return <Loading/>;
  }

  if (isError) {
    return <AppError/>;
  }

  return (
    <div>
      <h2>Editar nota</h2>
      <div className="edit-note-container">
        <div>
          <div><label htmlFor="name">Nome</label></div>
          <input autoComplete="off" type="text" id="name" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <div><label htmlFor="phone">Número</label></div>
          <input autoComplete="off" type="text" id="phone" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>
      <div><button type="button" onClick={() => handleSubmit.mutate()}>Enviar</button></div>
      <div><Link to={"/notebook"}><button>Cancelar</button></Link></div>
    </div>
  )
}