type Props = {
  name: string;
};

export default function Hello({ name }: Props) {
  const displayName = name && name.trim() !== '' ? name : 'Egor';

  return <h1>{displayName}</h1>;
}
