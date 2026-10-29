import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      <Link className="button button--large" to={"/content/users"}>
        Начать
      </Link>
    </div>
  );
}
