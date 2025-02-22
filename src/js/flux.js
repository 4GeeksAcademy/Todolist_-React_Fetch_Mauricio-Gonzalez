import React, { useState, useEffect } from 'react';

const ToDoListApp = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ full_name: "", email: "", phone: "" });
  const agendaSlug = "my-agenda";

  // Obtener contactos
  useEffect(() => {
    fetch(`https://playground.4geeks.com/apis/fake/contact/agendas/${agendaSlug}/contacts`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          console.error("Data received is not an array");
        }
      })
      .catch(error => console.error(error));
  }, []);

  // Crear contacto
  const addContact = () => {
    fetch(`https://playground.4geeks.com/apis/fake/contact/agendas/${agendaSlug}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    })
      .then(response => response.json())
      .then(data => {
        if (data && !data.detail) { // Verifica que no sea un error de respuesta
          setContacts([...contacts, data]);
          setNewContact({ full_name: "", email: "", phone: "" });
        } else {
          console.error("Error adding contact:", data.detail || data);
        }
      })
      .catch(error => console.error("Error adding contact:", error));
  };

  // Actualizar contacto
  const updateContact = (contactId) => {
    fetch(`https://playground.4geeks.com/apis/fake/contact/agendas/${agendaSlug}/contacts/${contactId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    })
      .then(response => response.json())
      .then(updatedContact => {
        if (updatedContact && !updatedContact.detail) {
          setContacts(contacts.map(contact => (contact.id === contactId ? updatedContact : contact)));
        } else {
          console.error("Error updating contact:", updatedContact.detail || updatedContact);
        }
      })
      .catch(error => console.error("Error updating contact:", error));
  };

  // Eliminar contacto
  const deleteContact = (contactId) => {
    fetch(`https://playground.4geeks.com/apis/fake/contact/agendas/${agendaSlug}/contacts/${contactId}`, {
      method: "DELETE",
    })
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== contactId));
      })
      .catch(error => console.error("Error deleting contact:", error));
  };

  return (
    <div>
      <h2>Contact List</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.full_name} - {contact.phone} - {contact.email}
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
            <button onClick={() => updateContact(contact.id)}>Update</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Full Name"
        value={newContact.full_name}
        onChange={(e) => setNewContact({ ...newContact, full_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={newContact.email}
        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={newContact.phone}
        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
      />
      <button onClick={addContact}>Add Contact</button>
    </div>
  );
};

export default ToDoListApp;