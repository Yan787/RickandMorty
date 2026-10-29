import type { Comment } from "../../../entities/comment";
import { SectionShell } from "../../../shared/ui";

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
