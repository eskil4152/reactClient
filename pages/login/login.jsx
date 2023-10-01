import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postJSON } from "../../tools/FetchJSON";

export function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null)

  async function handleLogin(){
    var result = await postJSON("/login", body = {
      username,
      password,
    });

    if (result.status === 401)
      setError("The username and password do not match")
    else if (result.status === 200)
      navigate("/")
    else
      setError("Unknown error occured")
  }

  function handleSubmit(e){
    e.preventDefault();
    handleLogin();
  }

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
        <br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        <br />
        <button>Log in</button>
      </form>

      <p style={{ color: "red" }}>{error}</p>

      <br />

      <Link to={"/register"}><button>Register</button></Link>

    </div>
  )
}
