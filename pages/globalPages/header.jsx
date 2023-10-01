import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className={"headerContainer"}>
      <div id={"header-one"}>
        <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
          People
        </Link>
      </div>

        <div id={"header-two"}>
          <Link to={"/login"}>
            Log in
          </Link>
      </div>
    </div>
  );
}
