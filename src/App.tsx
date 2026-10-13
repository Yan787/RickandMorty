import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import ContentPage from "./pages/ContentPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route
          path="content"
          element={<Navigate to={"/content/users"} replace />}
        />
        <Route path="content/users" element={<ContentPage tab="users" />} />
        <Route path="content/posts" element={<ContentPage tab="posts" />} />
        <Route
          path="content/comments"
          element={<ContentPage tab="comments" />}
        />
        <Route path="content/*" element={<ContentPage tab="unknown" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
