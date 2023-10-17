import PhoneIcon from "../../assets/icons/phone.png";
import EmailIcon from "../../assets/icons/e-mail.png";
import AvatarPlaceholder from "../../assets/images/avatar.png";
import "./ContactCard.css";

type ContactCardInput = {
  name: string;
  email: string;
  phone: string;
  handleDelete: () => void;
  handleEdit: () => void;
};

export default function ContactCard({
  name,
  email,
  phone,
  handleDelete,
  handleEdit,
}: ContactCardInput) {
  return (
    <div className="card">
      <img className="card-image" src={AvatarPlaceholder} alt="avatar" />
      <h3>{name}</h3>
      <div className="card-contact-info">
        <img height="20px" src={PhoneIcon} alt="phone icon" />
        <p>{phone}</p>
      </div>
      <div className="card-contact-info">
        <img height="20px" src={EmailIcon} alt="e-mail icon" />
        <p>{email}</p>
      </div>
      <div>
        <button onClick={handleDelete}>Remover</button>
        <button onClick={handleEdit}>Editar</button>
      </div>
    </div>
  );
}
