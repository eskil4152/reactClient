import { useState } from "react";

export function AddPerson() {

    const [firstName, newFirstName] = useState("");
    const [lastName, newLastName] = useState("");
    const [age, newAge] = useState(0);

    return (
        <div>
            <h1>Add Person</h1>

        </div>
    );
}