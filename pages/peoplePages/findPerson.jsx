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

const firstNameContext = React.createContext({
    async searchByFirstName( variable ) {
      return await fetchJSON(`/api/people/search/first/${variable}`);
    },
  });

  const lastNameContext = React.createContext({
    async searchByLastName( variable ) {
        return await fetchJSON(`/api/people/search/last/${variable}`)
    },
  });

export function FindPerson() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [result, setResult] = useState(null);

    async function searchByFirstName(firstName){
        const response = await fetchJSON(`/api/people/search/first/${firstName}`)
        setResult(response);
    }

    async function searchByLastName(lastName) {
        const response = await fetchJSON(`/api/people/search/last/${lastName}`);
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