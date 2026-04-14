'use client';

import { useState } from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const [editId, setEditId] = useState<number>();

  function handleEdit(id: number) {
    const contact = contacts.find((c) => c.id == id);
    if (!contact) return;
    setEditId(id);

    setEditName(contact.name);
    setEditEmail(contact.email);
  }

  function handleSave() {
    if (!editName.trim() || !editEmail.trim()) return;

    setContacts((prev) =>
      prev.map((c) =>
        c.id === editId ? { ...c, name: editName.trim(), email: editEmail.trim() } : c,
      ),
    );

    setEditId(undefined);
  }

  const searchContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function handleAdd() {
    if (!newName.trim() || !newEmail.trim()) return;

    const contact: Contact = { id: Date.now(), name: newName.trim(), email: newEmail.trim() };

    setContacts((prev) => [contact, ...prev]);

    setNewName('');
    setNewEmail('');
  }

  function handleDelete(id: number) {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h1>Контакты</h1>

      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="text"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleAdd}>Создать</button>

      <p>Поиск</p>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <p>Всего контактов {contacts.length}</p>

      {searchQuery ? (
        <p>
          Показано {searchContacts.length} из {contacts.length}
        </p>
      ) : null}
      <ul>
        {searchContacts.map((i) => (
          <li key={i.id}>
            {editId == i.id ? (
              <div>
                <div>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </div>
                <button onClick={() => setEditId(undefined)}>Отмена</button>
                <button onClick={handleSave}>Сохранить</button>
              </div>
            ) : (
              <div>
                <div>
                  <p>{i.name}</p>
                  <p>{i.email}</p>
                </div>
                <button onClick={() => handleDelete(i.id)}>Удалить контакт</button>
                <button onClick={() => handleEdit(i.id)}>Редактировать</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {contacts.length < 1 && <p>Список пуст</p>}
    </div>
  );
}
