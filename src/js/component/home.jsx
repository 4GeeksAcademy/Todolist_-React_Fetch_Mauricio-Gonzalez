import React, { useEffect, useState } from "react";

const API_BASE_URL = "https://playground.4geeks.com/apis/fake/contact/";

const ToDoListApp = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    full_name: "",
    phone: "",
    email: "",
  });

  // Obtener contactos desde la API
  useEffect(() => {
    fetch(API_BASE_URL)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          console.error("Data received is not an array");
        }
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  // Manejar cambios en el formulario de nuevo contacto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Agregar contacto
  const addContact = () => {
    fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify(newContact),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setContacts((prevContacts) => [...prevContacts, data]))
      .catch((error) => console.error("Error adding contact:", error));
  };

  // Eliminar contacto
  const deleteContact = (id) => {
    fetch(`${API_BASE_URL}${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setContacts((prevContacts) =>
            prevContacts.filter((contact) => contact.id !== id)
          );
        }
      })
      .catch((error) => console.error("Error deleting contact:", error));
  };

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id}>
              {contact.full_name} - {contact.phone} - {contact.email}
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No contacts available</li>
        )}
      </ul>
      <h3>Add New Contact</h3>
      <input
        type="text"
        name="full_name"
        value={newContact.full_name}
        placeholder="Full Name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        value={newContact.phone}
        placeholder="Phone"
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        value={newContact.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <button onClick={addContact}>Add Contact</button>
    </div>
  );
};

export default ToDoListApp;