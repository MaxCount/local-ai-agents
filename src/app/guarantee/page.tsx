import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Гарантия — LINUCHI",
  description: "Гарантийные обязательства и условия возврата товаров LINUCHI",
};

export default function GuaranteePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Гарантия</h1>
          <p className="text-xl text-gray-300">Мы уверены в качестве наших изделий</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Main Guarantee */}
          <div className="mb-16">
            <div className="bg-green-50 border-2 border-green-200 p-8 mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-800">Гарантия 12 месяцев</h2>
                  <p className="text-green-700">На все наши изделия</p>
                </div>
              </div>
              <p className="text-green-700">
                Срок гарантии составляет 12 месяцев с момента покупки. Мы гарантируем качество всех наших изделий, 
                произведенных на нашем предприятии в Борисове.
              </p>
            </div>
          </div>

          {/* What is covered */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Гарантия распространяется на:
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Швы и строчки</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Молнии и застёжки</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ручки и крепления</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Фурнитура</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ткань и материалы</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Люверсы и кольца</span>
              </div>
            </div>
          </div>

          {/* What is NOT covered */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              Гарантия НЕ распространяется на:
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-red-50">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Механические повреждения</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Порезы и проколы</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Неправильную эксплуатацию</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Естественный износ</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Повреждение животными</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Стихийные бедствия</span>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Для возврата или обмена:</h2>
            <div className="bg-gray-50 p-8">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium">Сохраните чек или квитанцию</p>
                    <p className="text-sm text-gray-600">Подтверждение покупки необходимо для гарантийного обслуживания</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium">Свяжитесь с нами</p>
                    <p className="text-sm text-gray-600">Позвоните или напишите, опишите проблему</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium">Привезите товар или отправьте почтой</p>
                    <p className="text-sm text-gray-600">Мы проверим изделие и произведём ремонт или замену</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-black text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Контакты для гарантийных случаев</h2>
            <p className="text-xl mb-2">+375 (29) 387-09-80</p>
            <p className="text-gray-400">Пн-Пт 8:00-16:00</p>
            <p className="text-gray-400 mt-4">г. Борисов, ул. Дзержинского 90 офис 3</p>
          </div>
        </div>
      </section>
    </div>
  );
}
