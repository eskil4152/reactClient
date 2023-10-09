import { useState } from "react";
import { postJSON } from "../../tools/FetchJSON";
import { redirect, useNavigate } from "react-router-dom";

export function PersonCard ({ person }) {
    const { id, firstName, lastName, age } = person;
    return (
        <div>
            <p>
                {id}, {firstName} {lastName}, {age}
            </p>
        </div>
    );
}

export function RemovePerson() {
    const [id, setId] = useState();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();

    const [ result, setResult ] = useState(null);

    const [error, setError] = useState(null);

    async function searchById() {
        try {
            const { status, data } = await postJSON("/api/people/search/id", body = {
                id
            });

            if (status === 404) {
                setResult(null)
                setError("Person not found");
            } else if (status === 200) {
                setResult(data);
                setError(null);
            } else {
                console.error("HTTP Error: " + status);
                setResult(null);
                setError("An error occurred while fetching data");
            }
        } catch (error) {
            console.error("Error " + this.error);
            setResult(null);
            setError("An error occurred while fetching data");
        }
    }

    async function searchByName(){
        try {
            const { status, data } = await postJSON(`/api/people/search/full`, body = {
                firstName,
                lastName
            });

            if (status === 404) {
                setResult(null)
                setError("Person not found");
            } else if (status === 200) {
                setResult(data);
                setError(null);
            } else {
                console.error("HTTP Error: " + status);
                setResult(null);
                setError("An error occurred while fetching data");
            }
        } catch (error) {
            console.error("Error " + this.error);
            setResult(null);
            setError("An error occurred while fetching data");
        }
    }
    

    function handleSubmitId(e){
        e.preventDefault();
        searchById();
    }

    function handleSubmitName(e){
        e.preventDefault();
        searchByName();
    }

    return (
        <div>
            <h1>Remove a person</h1>

            <h3>Search by id:</h3>
            <form onSubmit={handleSubmitId}>
                <input 
                    value={id}
                    type="number"
                    onChange={(e) => setId(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <h3>Search by name</h3>
            <form onSubmit={handleSubmitName}>
                <input
                    value={firstName}
                    placeholder="Firstname"
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    value={lastName}
                    placeholder="Lastname"
                    onChange={(e) => setLastName(e.target.value)}
                />

                <button>Search</button>
            </form>
            
            {
                result !== null ? (
                    result.map((person) => (
                        <div id={person.id}>
                            <PersonCard key={person.id} person={person} />
                        </div>
                    ))
                ) : null
            }
            
            <p style={{ color:"red" }}>{error}</p>

        </div>
    );
}