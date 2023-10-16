import PhoneIcon from "../../public/icons/phone.png";
import EmailIcon from "../../public/icons/e-mail.png";
import AvatarPlaceholder from "../../public/images/avatar.png";
import "./ContactCard.css";

type ContactCardInput = {
  name: string;
  email: string;
  phone: string;
};

export default function ContactCard({ name, email, phone }: ContactCardInput) {
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
    </div>
  );
}
