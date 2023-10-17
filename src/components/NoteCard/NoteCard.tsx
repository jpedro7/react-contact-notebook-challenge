import "./NoteCard.css";

type NoteCardInput = {
  title: string;
  description: string;
};

export default function NoteCard({ title, description }: NoteCardInput) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
