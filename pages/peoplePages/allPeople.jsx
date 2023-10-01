import React, { useContext } from "react";
import { useLoading } from "../../tools/UseLoading"
import { fetchJSON } from "../../tools/FetchJSON"

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
  
  const Context = React.createContext({
    async fetchPeople() {
      return await fetchJSON("/api/people/all");
    },
  });

export function ViewAllPeople() {

    const { fetchPeople } = useContext(Context);

    const { loading, error, data } = useLoading(async () => await fetchPeople());

    if (loading)
      return "Loading..."
    if (error)
      return "Error"

    if (data.status === 404) {
      return (
        <div>
          <h1>All People</h1>
          <p>No people found...</p>
        </div>
      )
    } else if (data.status === 200) {
      return (
        <div>
              <h1>All People</h1>
              {
                data.data.map((person) => (
                    <div id={person.id}>
                        <PersonCard key={person.id} person={person} />
                    </div>
                ))
              }
          </div>
      )
    } else {
      return (
        <div>
          <h1>All People</h1>
          <p>{data.status} Unknown error occured</p>
        </div>
      )
    }
}