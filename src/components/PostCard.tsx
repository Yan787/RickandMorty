import { useState } from "react";
import type { Post } from "../models/models";
import PostComments from "./PostComments";

export function PostCard({ post }: { post: Post }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="card">
      <h3 className="card__title">{post.title}</h3>
      <p className="card__text">{post.body}</p>

      <div className="cards">
        <button className="button" onClick={() => setIsActive((prev) => !prev)}>
          {`${!isActive ? "Show" : "Hide"} comments`}
        </button>
        {isActive && <PostComments postId={post.id} />}
      </div>
    </div>
  );
}
