import { useFetch } from "../../../shared/api";
import type { Comment } from "../../../entities/comment";
import { API_JPH_URL as URL } from "../../../shared/config";
import { Error, Loader } from "../../../shared/ui";

export default function PostComments({ postId }: { postId: number }) {
  const { data, isLoading, error } = useFetch<Comment[]>(
    `${URL}/comments?postId=${postId}`,
  );

  return (
    <>
      {isLoading && <Loader />}
      {error && <Error>{error}</Error>}
      {!isLoading &&
        data &&
        data.map((comment) => (
          <div className="card" key={comment.id}>
            <p className="card__text">User: {comment.email}</p>
            <h3 className="card__title">{comment.name}</h3>
            <p className="card__text">{comment.body}</p>
          </div>
        ))}
    </>
  );
}
