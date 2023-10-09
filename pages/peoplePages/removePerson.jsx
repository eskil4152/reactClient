import { useState } from "react";
import { postJSON } from "../../tools/FetchJSON";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const [id, setId] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    
    const [firstNameSolo, setFirstNameSolo] = useState();
    const [lastNameSolo, setLastNameSolo] = useState();

    const [ result, setResult ] = useState(null);

    const [error, setError] = useState(null);

    async function deletePerson(passedId){
        await postJSON("api/people/delete", body = {
            passedId
        })

        navigate("/")
    }

    async function searchById() {
        try {
            const { status, data } = await postJSON("/api/people/search/id", body = {
                id
            });

            console.log(data);
            console.log(Array.isArray(data));

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

    async function searchByFirstName(){
        try {
            const { status, data } = await postJSON(url = "/api/people/search/first", content = {
                "firstName":firstNameSolo
            });

            if (status === 404) {
                setResult(null)
                setError("Person not found")
            } else if (status === 200) {
                setResult(data);
                setError(null)
            } else {
                console.error("HTTP Error: " + status);
                setResult(null);
                setError("An error occurred while fetching data");
            }
        } catch (error) {
            console.error("Error " + this.error);
            setResult(null)
            setError("An error occured while trying to fetch data")
        }
    }

    async function searchByLastName() {
        try {
            const { status, data } = await postJSON(`/api/people/search/last`, body = {
                "lastName":lastNameSolo
            })

            if (status === 404) {
                setResult(null)
                setError("Person not found")
            } else if (status === 200) {
                setResult(data);
                setError(null)
            } else {
                console.error("HTTP Error: " + status);
                setResult(null);
                setError("An error occurred while fetching data");
            }
        } catch (error) {
            console.error("Error " + this.error);
            setResult(null);
            setError("An error occured while trying to fetch data")
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

    function handleSubmitFirstName(e){
        e.preventDefault();
        searchByFirstName();
    }

    function handleSubmitLastName(e){
        e.preventDefault();
        searchByLastName();
    }

    return (
        <div>
            <h1>Remove a person</h1>

            <h3>Search by id:</h3>
            <form onSubmit={handleSubmitId}>
                <input 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <h3>Search by full name</h3>
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

            <h3>Search by first name</h3>
            <form onSubmit={handleSubmitFirstName}>
                <input
                    value={firstNameSolo}
                    placeholder="Firstname"
                    onChange={(e) => setFirstNameSolo(e.target.value)}
                />

                <button>Search</button>
            </form>

            <h3>Search by last name</h3>
            <form onSubmit={handleSubmitLastName}>
                <input
                    value={lastNameSolo}
                    placeholder="Lastname"
                    onChange={(e) => setLastNameSolo(e.target.value)}
                />

                <button>Search</button>
            </form>
            
            {
                result !== null ? (
                    Array.isArray(result) ? (
                        result.map((person) => (
                            <div id={person.id}>
                                <PersonCard key={person.id} person={person} />
                                <button onClick={() => deletePerson(person.id)}>Delete</button>
                            </div>
                        ))
                    ) : (
                        <div id={result.id}>
                            <PersonCard key={result.id} person={result} />
                            <button onClick={() => deletePerson(result.id)}>Delete</button>
                        </div>
                    )
                ) : null
            }
            
            <p style={{ color:"red" }}>{error}</p>

        </div>
    );
}