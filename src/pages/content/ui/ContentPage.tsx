import UsersSection from "./UsersSection";
import PostsSection from "./PostsSection";
import CommentsSection from "./CommentsSection";
import UnknownSection from "./UnknownSection";
import Tab from "./Tab";
import type { TabName } from "../model/types";
import { API_JPH_URL as API } from "../../../shared/config";

const Endpoints = {
  users: "users",
  posts: "posts",
  comments: "comments",
} as const;

export default function ContentPage({ tab }: { tab: TabName }) {
  return (
    <>
      <div className="tabs">
        <Tab tabName={"users"}>Users</Tab>
        <Tab tabName={"posts"}>Posts</Tab>
        <Tab tabName={"comments"}>Comments</Tab>
      </div>
      <div className="cards">
        {tab === "users" && <UsersSection url={`${API}/${Endpoints.users}`} />}
        {tab === "posts" && <PostsSection url={`${API}/${Endpoints.posts}`} />}
        {tab === "comments" && (
          <CommentsSection url={`${API}/${Endpoints.comments}`} />
        )}
        {tab === "unknown" && <UnknownSection />}
      </div>
    </>
  );
}
