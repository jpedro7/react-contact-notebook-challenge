import ContactCard from "../../components/ContactCard";
import { Contact } from "../../types/Contact";
import "./Contacts.css";

export default function Contacts() {
  return (
    <div>
      <h1>Contatos</h1>
      <div className="contacts">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            email={contact.email}
            phone={contact.phone}
          />
        ))}
      </div>
    </div>
  );
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Raphael",
    email: "brito@gmail.com",
    phone: "+558190836728",
  },
  {
    id: 2,
    name: "Raphael",
    email: "brito@gmail.com",
    phone: "+558190836728",
  },
  {
    id: 3,
    name: "Raphael",
    email: "brito@gmail.com",
    phone: "+558190836728",
  },
  {
    id: 4,
    name: "Raphael",
    email: "brito@gmail.com",
    phone: "+558190836728",
  },
];
