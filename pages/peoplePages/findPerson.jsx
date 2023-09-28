import React, { useState } from "react";
import { fetchJSON } from "../../tools/FetchJSON";

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

    async function searchByFirstName(firstName){
        const response = await fetchJSON(`/api/people/search/first/${firstName}`)
        setResult(response);
    }

    async function searchByLastName(lastName) {
        const response = await fetchJSON(`/api/people/search/last/${lastName}`);
        setResult(response);
    }

    async function searchByFullName(fullNameFirst, fullNameLast) {
        const response = await fetchJSON(`/api/people/search/full/${fullNameFirst}/${fullNameLast}`);
        setResult(response);
    }

    function handleSubmitFirst(e) {
        e.preventDefault();
        searchByFirstName(firstName);
      }
    
      function handleSubmitLast(e) {
        e.preventDefault();
        searchByLastName(lastName);
      }

      function handleSubmitFull(e, f) {
        e.preventDefault();
        f.preventDefault();
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

            {result ? (
                Array.isArray(result) ? (
                    result.map((person) => (
                        <div id={person.id}>
                            <PersonCard key={person.id} person={person} />
                        </div>
                    ))
                ) : <PersonCard key={result.id} person={result} />
            ) : <p>No results</p>}

        </div>
    );
}