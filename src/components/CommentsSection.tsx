import type { Comment } from "../models/models";
import SectionShell from "./SectionShell";

export default function CommentsSection({ url }: { url: string }) {
  return (
    <SectionShell
      url={url}
      renderFunc={(comment: Comment) => (
        <div className="card" key={comment.id}>
          <p className="card__text">User {comment.email}:</p>
          <h3 className="card__title">{comment.name}</h3>
          <p className="card__text">{comment.body} </p>
        </div>
      )}
    />
  );
}
