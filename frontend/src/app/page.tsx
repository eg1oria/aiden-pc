import Header from '@/components/Header/Header';
import ScrollScene from '@/components/ScrollCube';

export default function Home() {
  return (
    <>
      <Header />
      <ScrollScene />

      <section className="h-[100vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-7xl font-black uppercase italic">Lain Case</h1>
          <p className="text-gray-500">Лимитированная серия корпусов</p>
        </div>
      </section>
      <section className="h-[150vh] flex items-center justify-start px-20">
        <div className="max-w-md space-y-4">
          <h2 className="text-4xl font-bold text-pink-500">Идеальная статика</h2>
          <p className="text-xl text-gray-300">
            В этой части страницы модель замерла в позиции Y=0 и немного сдвинулась вправо. Это
            позволяет вам спокойно прочитать текст, пока 3D объект остается в фокусе.
          </p>
          <div className="h-1 w-20 bg-pink-500"></div>
        </div>
      </section>

      <section className="h-[100vh] flex items-center justify-center">
        <div className="bg-white text-black p-10 rounded-full w-64 h-64 flex items-center justify-center text-center font-bold">
          КУПИТЬ СЕЙЧАС
        </div>
      </section>
    </>
  );
}
