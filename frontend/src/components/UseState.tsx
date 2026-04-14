import addToCart, { IProduct } from './Visible';

const products: IProduct[] = [
  {
    id: 1,
    name: 'iPhone',
    price: 999,
    category: 'electronics',
    inStock: true,
  },
  {
    id: 2,
    name: 'idfsdfsdfhone',
    price: 99339,
    category: 'electronics',
    inStock: true,
  },
];
export default function ListP() {
  return (
    <div className="">
      {products.map((item) => (
        <div className="" key={item.id}>
          <p>{item.name}</p>
          <span>{item.price}</span>
          <button onClick={() => addToCart}>В корзину</button>
        </div>
      ))}
    </div>
  );
}
