import { useState } from "react";
import AppError from "../../components/AppError/Error";
import ContactCard from "../../components/ContactCard/ContactCard";
import Loading from "../../components/Loading/Loading";
import { queryClient } from "../../services/queryClient";
import { Contact } from "../../types/Contact";
import "./Contacts.css";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants"

export default function Contacts() {
  const navigate = useNavigate();
  const [name, setName]  = useState("");
  const [phone, setPhone]  = useState("");
  const [email, setEmail]  = useState("");
  const {
    data: contacts,
    isFetching,
    isError,
  } = useQuery(["contacts"], async () => {
    const res = await fetch(`${baseUrl}/contacts`);

    if (!res.ok) {
      throw new Error("Erro ao carregar os dados da lista de contatos");
    }

    return res.json();
  });

  const handleDeleteContact = useMutation(async (contactId: number) => {
    const res = await fetch(`${baseUrl}/contacts/${contactId}`, {
      method: "DELETE"
    });

    return res.json();
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("contacts");
    },
  });

  const handleEditContact = (contactId: number) => {
    navigate(`/contacts/${contactId}`);
  };

  const handleSubmit = useMutation(async () => {
    const id = new Date().getTime();

    const newContact: Contact = {
      id: id,
      name: name,
      phone: phone,
      email: email,
    };

    if (name.trim().length === 0 || phone.trim().length === 0 || email.trim().length ===0) {
      window.alert("Preencha todos os campos para criar um contato!");
      return;
    }

    const res = await fetch(`${baseUrl}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    });

    if (!res.ok) {
      throw new Error("Falha na criação do contato.");
    }

    return res.json();
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("contacts");
      setName("");
      setPhone("");
      setEmail("");
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
      <h1 className="contact-title-label">Contatos</h1>
      <div className="create-contact-container">
        <div>
          <div><label htmlFor="name">Nome</label></div>
          <input autoComplete="off" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <div><label htmlFor="phone">Número</label></div>
          <input autoComplete="off" id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <div>
          <div><label htmlFor="email">Email</label></div>
          <input autoComplete="off" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
      </div>
      <button className="create-contact-button" type="button" onClick={() => handleSubmit.mutate()}>Criar</button>
      <div className="contacts">
        {contacts.map((contact: Contact) => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
            handleDelete={() => handleDeleteContact.mutate(contact.id)}
            handleEdit={() => handleEditContact(contact.id)}
          />
        ))}
      </div>
    </div>
  );
}
