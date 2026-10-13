import UsersSection from "../components/UsersSection";
import PostsSection from "../components/PostsSection";
import CommentsSection from "../components/CommentsSection";
import Tab from "../components/Tab";
import type { TabName } from "../types";
import { useEffect } from "react";


export default function ContentPage({ tab }: { tab: TabName }) {
  return (
    <>
      <div className="tabs">
        <Tab tabName={"users"}>Users</Tab>
        <Tab tabName={"posts"}>Posts</Tab>
        <Tab tabName={"comments"}>Comments</Tab>
      </div>
      <div className="cards">
        {tab === "users" && <UsersSection tabName={tab} />}
        {tab === "posts" && <PostsSection tabName={tab} />}
        {tab === "comments" && <CommentsSection tabName={tab} />}
      </div>
    </>
  );
}
