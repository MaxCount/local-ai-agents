import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Индивидуальный пошив — LINUCHI",
  description: "Изготовление чехлов и сумок по вашим размерам на заказ",
};

export default function CustomPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-black text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Индивидуальный пошив</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Нужны чехлы по вашим точным размерам? Мы изготовим их специально для вас!
          </p>
          <p className="text-gray-400">
            Работаем с 2010 года. Собственное производство в Борисове.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Что мы предлагаем</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 text-center border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Любые размеры</h3>
              <p className="text-sm text-gray-600">Изготовим точно под ваши параметры</p>
            </div>
            <div className="bg-white p-6 text-center border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Выбор материала</h3>
              <p className="text-sm text-gray-600">Ткань, кожа, оксфорд — ваш выбор</p>
            </div>
            <div className="bg-white p-6 text-center border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Индивидуальный дизайн</h3>
              <p className="text-sm text-gray-600">Цвет, фурнитура, декоративные элементы</p>
            </div>
            <div className="bg-white p-6 text-center border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Срочные заказы</h3>
              <p className="text-sm text-gray-600">Изготовление от 1 дня</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Как заказать</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">1</div>
                <h3 className="font-bold mb-2">Свяжитесь с нами</h3>
                <p className="text-sm text-gray-600">Позвоните, напишите или оставьте заявку</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">2</div>
                <h3 className="font-bold mb-2">Опишите задачу</h3>
                <p className="text-sm text-gray-600">Расскажите что вам нужно и покажите размеры</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">3</div>
                <h3 className="font-bold mb-2">Получите расчёт</h3>
                <p className="text-sm text-gray-600">Мы рассчитаем стоимость и сроки</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">4</div>
                <h3 className="font-bold mb-2">Оформите заказ</h3>
                <p className="text-sm text-gray-600">После оплаты мы начнём производство</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we make */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Что мы можем изготовить</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="font-bold mb-4">Чехлы</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Для одежды</li>
                <li>• Для обуви</li>
                <li>• Для музыкальных инструментов</li>
                <li>• Для спортивного инвентаря</li>
                <li>• Для электроники</li>
              </ul>
            </div>
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="font-bold mb-4">Сумки и портпледы</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Дорожные сумки</li>
                <li>• Портпледы для одежды</li>
                <li>• Чехлы-переноски</li>
                <li>• Рюкзаки</li>
                <li>• Аксессуары</li>
              </ul>
            </div>
            <div className="bg-white p-6 border border-gray-200">
              <h3 className="font-bold mb-4">Нестандартные решения</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• По вашим эскизам</li>
                <li>• С нестандартными размерами</li>
                <li>• Корпоративные заказы</li>
                <li>• Серийное производство</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы сделать заказ?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Свяжитесь с нами и получите бесплатный расчёт стоимости
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+375293870980"
              className="bg-white text-black px-8 py-4 font-bold text-lg hover:bg-gray-200 transition-colors"
            >
              Позвонить
            </a>
            <a 
              href="https://wa.me/375293870980"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 font-bold text-lg hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </a>
            <a 
              href="https://t.me/+375293870980"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-4 font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              Telegram
            </a>
          </div>
          <p className="mt-8 text-2xl font-bold">+375 29 387-09-80</p>
          <p className="text-gray-400 mt-2">Пн-Пт 8:00-20:00</p>
        </div>
      </section>
    </div>
  );
}
