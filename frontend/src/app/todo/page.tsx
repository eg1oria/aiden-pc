import Contacts from '@/components/Todo';
import UserList from '@/components/UserList';

export default function TodoPage() {
  const userList = [
    {
      id: 1,
      name: 'egor',
    },
    {
      id: 2,
      name: 'kfkf',
    },
    {
      id: 3,
      name: 'nur',
    },
  ];
  return (
    <div>
      <h1>Todo Page</h1>
      <p>This is the Todo page.</p>
      <Contacts />
      <UserList users={userList} />
    </div>
  );
}
