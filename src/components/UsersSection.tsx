import SectionShell from "./SectionShell";
import type { User } from "../models/models";

export default function UsersSection({ url }: { url: string }) {
  return (
    <SectionShell
      url={url}
      renderFunc={(user: User) => (
        <div className="card" key={user.id}>
          <p>{user.name}</p>
          <p>Email: {user.email}</p>
          <p>Number: {user.phone}</p>
          <p>Company: {user.company.name}</p>
        </div>
      )}
    />
  );
}
