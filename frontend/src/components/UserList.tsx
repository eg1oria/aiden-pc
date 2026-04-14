'use client';

import { useState } from 'react';

interface User {
  id: number;
  name: string;
}

interface Props {
  users: User[];
}
export default function UserList({ users }: Props) {
  const [id, setId] = useState<null | number>(null);

  const handteLine = (id: number) => {
    setId(id);
  };
  return (
    <>
      {users.map((user, index) => (
        <p
          key={index}
          style={{
            backgroundColor: id == user.id ? 'yellow' : 'black',
          }}
          onClick={() => handteLine(user.id)}>
          {user.name}
        </p>
      ))}
      <p>{id}</p>
    </>
  );
}
