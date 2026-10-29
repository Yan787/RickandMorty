import type { Post } from "../../../entities/post";
import { PostCard } from "./PostCard";
import { SectionShell } from "../../../shared/ui";

export default function PostsSection({ url }: { url: string }) {
  return (
    <SectionShell
      url={url}
      renderFunc={(post: Post) => <PostCard key={post.id} post={post} />}
    />
  );
}
