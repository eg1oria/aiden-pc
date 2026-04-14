type ListProps = {
  items: string[];
};

export default function List({ items }: ListProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
