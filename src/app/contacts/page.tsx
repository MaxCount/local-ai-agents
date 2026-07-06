import Link from "next/link";

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Контакты</h1>
          <p className="text-gray-400">LINUCHI — свяжитесь с нами</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-black transition-colors">
            Главная
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-black font-medium">Контакты</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Phone Section - Prominent */}
        <section className="mb-12">
          <div className="bg-black text-white p-8 md:p-12 text-center">
            <h2 className="text-lg md:text-xl font-medium mb-4 text-gray-300">
              Позвоните нам
            </h2>
            <a
              href="tel:+375293870980"
              className="text-4xl md:text-5xl lg:text-6xl font-bold hover:text-gray-300 transition-colors block mb-4"
            >
              +375 (29) 387-09-80
            </a>
            <p className="text-gray-400">Беларусь</p>
          </div>
        </section>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Address Card */}
          <div className="border-2 border-black p-6">
            <div className="flex items-start gap-4">
              <div className="bg-black p-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">
                  Адрес
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  г. Борисов, ул. Дзержинского 90 офис 3
                </p>
              </div>
            </div>
          </div>

          {/* Working Hours Card */}
          <div className="border-2 border-black p-6">
            <div className="flex items-start gap-4">
              <div className="bg-black p-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">
                  Режим работы
                </h3>
                <p className="text-gray-600">ПН-ПТ</p>
                <p className="text-2xl font-bold">8:00-16:00</p>
              </div>
            </div>
          </div>

          {/* Quick Call Card */}
          <div className="border-2 border-black p-6">
            <div className="flex items-start gap-4">
              <div className="bg-black p-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 uppercase tracking-wide">
                  Быстрый звонок
                </h3>
                <a
                  href="tel:+375293870980"
                  className="text-xl font-bold hover:text-gray-600 transition-colors"
                >
                  +375 (29) 387-09-80
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">
            На карте
          </h2>
          <div className="border-2 border-black">
            <div className="bg-gray-100 h-80 md:h-96 flex items-center justify-center relative">
              {/* Map Placeholder with Icon */}
              <div className="text-center">
                <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 mb-2">
                  г. Борисов, ул. Дзержинского 90 офис 3
                </p>
                <a
                  href="https://yandex.ru/maps/-/CCUBJ0wJxD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-black px-6 py-3 font-bold hover:bg-black hover:text-white transition-colors"
                >
                  Открыть на карте
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">
            О компании
          </h2>
          <div className="border-2 border-black p-8 md:p-10">
            <div className="flex items-start gap-6">
              <div className="hidden md:block flex-shrink-0">
                <div className="bg-black w-16 h-16 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Л</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">ЛИНУЧИ</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Частное производственное унитарное предприятие ЛИНУЧИ —
                  единственное специализированное предприятие в Республике Беларусь
                  по производству чехлов (футляров).
                </p>
                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500 text-sm uppercase tracking-wide">
                        УНП
                      </span>
                      <p className="font-bold text-lg">94828904801</p>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm uppercase tracking-wide">
                        Страна
                      </span>
                      <p className="font-bold text-lg">Беларусь</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black text-white p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Остались вопросы?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Мы всегда рады помочь! Свяжитесь с нами любым удобным способом или
            ознакомьтесь с информацией о доставке и гарантии.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+375293870980"
              className="inline-block bg-white text-black px-8 py-4 font-bold hover:bg-gray-200 transition-colors"
            >
              Позвонить
            </a>
            <Link
              href="/delivery"
              className="inline-block border-2 border-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-colors"
            >
              Доставка
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
