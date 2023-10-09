import { Link } from "react-router-dom";

export function MainPage() {
    return (
      <div>

        <br />
        
        <Link to={"/all"} style={{ color: "inherit", textDecoration: "none" }}>
          View All People
        </Link>

        <br />
        
        <Link to={"/search"} style={{ color: "inherit", textDecoration: "none" }}>
          Search for person
        </Link>

        <br />

        <Link to={"/add"} style={{ color: "inherit", textDecoration: "none" }}>
          Add a person
        </Link>

        <br />

        <Link to={"/change"} style={{ color: "inherit", textDecoration: "none" }}>
          Change a person
        </Link>

        <br />

        <Link to={"/remove"} style={{ color: "inherit", textDecoration: "none" }}>
          Remove a person
        </Link>
  
      </div>
    );
  }