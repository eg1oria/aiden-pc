function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },

    decrement() {
      count--;
    },

    getCount() {
      return count;
    },
  };
}

const counter = createCounter();

counter.increment();

const fetchUser = (id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id: 1, name: 'Elena' });
      } else {
        reject(new Error('Error'));
      }
    }, 1000);
  });
};

fetchUser(1)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

export async function Data(id: number) {
  try {
    const data = await fetchUser(id);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

const users = [
  { name: 'Анна', age: 25, active: true },
  { name: 'Борис', age: 30, active: false },
  { name: 'Вика', age: 22, active: true },
  { name: 'Глеб', age: 35, active: true },
];

const active = users.filter((u) => u.active);

const names = users.map((u) => u.name);

const found = users.find((u) => u.age > 28);

const hasInactive = users.some((u) => !u.active);

const allAdults = users.every((u) => u.age > 20);

const totalAge = users.reduce((sum, u) => sum + u.age, 0);

export const sorted = [...users].sort((a, b) => a.age - b.age);

console.log({ active, names, found, hasInactive, allAdults, totalAge });

export const people = [
  { name: 'Аня', city: 'Москва' },
  { name: 'Боря', city: 'Питер' },
  { name: 'Вика', city: 'Москва' },
  { name: 'Глеб', city: 'Питер' },
  { name: 'Даша', city: 'Казань' },
];

const user = () => {
  return new Promise((resolve, reject) => {
    const succes = true;

    if (succes) {
      resolve('Данные получены');
    } else {
      reject(new Error('Ошибка'));
    }
  });
};

user()
  .then((result) => console.log(result))
  .catch((err) => console.error(err));

export async function fetch() {
  try {
    const data = await user();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
export const letters = ['a', 'b', 'a', 'c', 'b', 'a'];

export interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

type CartItem = IProduct & {
  quantity: number;
};

interface ICart {
  items: CartItem[];
  totalPrice: number;
}

export default function addToCart(cart: ICart, product: IProduct): ICart {
  const existingIndex = cart.items.findIndex((item) => item.id == product.id);

  let newItems: CartItem[];

  if (existingIndex >= 0) {
    newItems = cart.items.map((item, index) =>
      index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item,
    );
  } else {
    newItems = [...cart.items, { ...product, quantity: 1 }];
  }

  const totalPrice = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return { items: newItems, totalPrice };
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

type TCartItem = Product & {
  quantity: number;
};

type TCart = {
  items: TCartItem[];
  totalPrice: number;
};

export function addCart(cart: TCart, product: Product): TCart {
  const exitingIndex = cart.items.findIndex((item) => item.id === product.id);

  let newItem: TCartItem[];

  if (exitingIndex >= 0) {
    newItem = cart.items.map((item, index) =>
      index == exitingIndex ? { ...item, quantity: item.quantity + 1 } : item,
    );
  } else {
    newItem = [...cart.items, { ...product, quantity: 1 }];
  }

  const totalPrice = newItem.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items: newItem, totalPrice };
}

const arr1 = [1, 2, 3, 4];
const arr2 = ['hello', 'return'];

function getLast<T>(arr: T[]): T {
  const lastItem = arr[arr.length - 1];

  return lastItem;
}

getLast(arr1);
getLast(arr2);
