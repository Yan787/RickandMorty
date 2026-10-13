import { NavLink } from "react-router-dom";
import type { TabName } from "../types";

export default function Tab({
  tabName,
  children,
}: {
  tabName: TabName;
  children: string;
}) {
  return (
    <NavLink
      to={`/content/${tabName}`}
      className={({ isActive }) =>
        isActive ? "tabs__tab tabs__tab--active" : "tabs__tab"
      }
    >
      {children}
    </NavLink>
  );
}
