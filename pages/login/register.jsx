import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postJSON } from "../../tools/FetchJSON";

export function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null)

  async function handleRegister(){
    var result = await postJSON("/register", body = {
      username,
      password,
    });

    if (result.status === 409)
      setError("The username is already registered")
    else if (result.status === 200)
      navigate("/")
    else
      setError("Unknown error occured")
  }

  function handleSubmit(e){
    e.preventDefault();
    handleRegister();
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
        <br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
        <br />
        <button>Register</button>
      </form>

      <p style={{ color: "red" }}>{error}</p>
    </div>
  )
}
