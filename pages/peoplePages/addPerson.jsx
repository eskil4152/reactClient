import { useState } from "react";
import { postJSON } from "../../tools/FetchJSON";
import { redirect, useNavigate } from "react-router-dom";

export function AddPerson() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);

    const [error, setError] = useState(null);

    async function addPerson() {
        if (firstName.trim() === "" || lastName.trim() === "" || isNaN(age) || age <= 0) {
            setError("Invalid data, please enter all fields accordingly")
            return;
        }
        
        const response = await postJSON(url = "/api/people/new", body = {
            firstName,
            lastName,
            age
        });

        if (response.status === 200) {
            navigate("/");
        } else if (response.status === 401) {
            setError("You are not authorized to add people")
        } else {
            setError("Failed to add person.");
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        addPerson();
    }

    return (
        <div>
            <h1>Add Person</h1>

            <form onSubmit={handleSubmit}>
                <br />
                <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <br />

                <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <br />

                <input 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

            <p style={{ color:"red" }}>{error}</p>

        </div>
    );
}