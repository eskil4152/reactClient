import React, { useState } from "react";
import { fetchJSON, postJSON } from "../../tools/FetchJSON";

export function PersonCard ({ person }) {
    const { firstName, lastName, age } = person;
    return (
      <div>
        <p>
          {firstName} {lastName}, {age}
        </p>
      </div>
    );
}

export function FindPerson() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [fullNameFirst, setFullNameFirst] = useState("");
    const [fullNameLast, setFullNameLast] = useState("");

    const [result, setResult] = useState(null);
    const [error, setError] = useState(null)

    async function searchByFirstName(firstName){
        try {
            const { status, data } = await postJSON(url = "/api/people/search/first", content = {
                firstName
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

    async function searchByLastName(lastName) {
        try {
            const { status, data } = await postJSON(`/api/people/search/last`, body = {
                lastName
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

    async function searchByFullName(fullNameFirst, fullNameLast) {
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

    function handleSubmitFirst(e) {
        e.preventDefault();
        searchByFirstName(firstName);
      }
    
      function handleSubmitLast(e) {
        e.preventDefault();
        searchByLastName(lastName);
      }

      function handleSubmitFull(e) {
        e.preventDefault();
        searchByFullName(fullNameFirst, fullNameLast);
      }

    return (
        <div>
            <h1>Search for Person</h1>

            <h4>Search by first name:</h4>
            <form onSubmit={handleSubmitFirst}>
                <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <h4>Search by last name:</h4>
            <form onSubmit={handleSubmitLast}>
                <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <h4>Search by full name:</h4>
            <form onSubmit={handleSubmitFull}>
                <input
                    value={fullNameFirst}
                    onChange={(e) => setFullNameFirst(e.target.value)}
                />
                <input 
                    value={fullNameLast}
                    onChange={(e) => setFullNameLast(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <p>Result:</p>

            {
                Array.isArray(result) ? (
                    result.map((person) => (
                        <div id={person.id}>
                            <PersonCard key={person.id} person={person} />
                        </div>
                    ))
                ) : <p style={{ color: "red" }}>{error}</p>
            }

        </div>
    );
}