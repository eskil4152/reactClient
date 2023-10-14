import { Link } from "react-router-dom";

export function Header() {
  var token = localStorage.getItem("token")

  return (
    <div className={"headerContainer"}>
      <div id={"header-one"}>
        <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
          People
        </Link>
      </div>

        <div id={"header-two"}>
          {
            token == null ? (
              <Link to={"/login"}>
                Log in
              </Link>
            ) : "Logged In"
          }
      </div>
    </div>
  );
}
