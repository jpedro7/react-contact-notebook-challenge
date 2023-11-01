import "./EditContact.css"
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppError from "../../components/AppError/Error";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";
import { Contact } from "../../types/Contact";
import { baseUrl } from "../../constants";

export default function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const {
    data: contact,
    isFetching,
    isError,
  } = useQuery(["contact"], async () => {
    const res = await fetch(`${baseUrl}/contacts/${id}`);

    if (!res.ok) {
      throw new Error("Erro ao carregar as informações do contato");
    }

    return res.json();
  }, {
    onSuccess: (data) => {
      setName(data.name);
      setPhone(data.phone);
      setEmail(data.email);
    },
  });

  const handleSubmit = useMutation(["contact"], async () => {
    const updatedContact: Contact = {
      id: contact.id,
      name: name,
      email: email,
      phone: phone,
    }

    if (name.trim().length === 0 || phone.trim().length === 0 || email.trim().length === 0) {
      window.alert("Todos os campos precisam estar preenchidos!");
      return;
    }

    const res = await fetch(`${baseUrl}/contacts/${updatedContact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
    });

    return res.json();
  }, {
    onSuccess: () => {
      navigate("/contacts");
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
      <h2>Editar contato</h2>
      <div className="edit-contact-container">
        <div>
          <div><label htmlFor="name">Nome</label></div>
          <input autoComplete="off" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <div><label htmlFor="phone">Número</label></div>
          <input autoComplete="off" type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <div><label htmlFor="name">Email</label></div>
          <input autoComplete="off" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div><button type="button" onClick={() => handleSubmit.mutate()}>Enviar</button></div>
      <div><Link to={"/contacts"}><button>Cancelar</button></Link></div>
    </div>
  )
}