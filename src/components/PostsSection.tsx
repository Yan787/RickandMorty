import type { Post } from "../models/models";
import { PostCard } from "./PostCard";
import SectionShell from "./SectionShell.tsx";

export default function PostsSection({ url }: { url: string }) {
  return (
    <SectionShell
      url={url}
      renderFunc={(post: Post) => <PostCard key={post.id} post={post} />}
    />
  );
}
