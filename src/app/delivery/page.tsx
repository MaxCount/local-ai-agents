import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Доставка и оплата — LINUCHI",
  description: "Информация о доставке и оплате товаров LINUCHI",
};

export default function DeliveryPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Доставка и оплата</h1>
          <p className="text-xl text-gray-300">Удобные способы получить ваш заказ</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Delivery Methods */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg">1</span>
              Доставка почтой по Беларуси
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6">
                <h3 className="font-bold mb-4">Наложенный платёж</h3>
                <p className="text-gray-600 mb-4">
                  Бесплатная доставка почтой по Беларуси при заказе от 50 рублей.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span>Забор в почтовом отделении</span>
                    <span className="font-bold">3.00 руб</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span>Доставка на дом</span>
                    <span className="font-bold">6.00 руб</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Срок доставки</span>
                    <span className="font-bold">2-5 дней</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  * При весе посылки не более 3 кг
                </p>
              </div>
              <div className="bg-green-50 p-6 border-2 border-green-200">
                <h3 className="font-bold mb-4 text-green-800">Бесплатно от 50 руб!</h3>
                <p className="text-green-700">
                  При заказе от 50 рублей доставка почтой по Беларуси — БЕСПЛАТНАЯ!
                </p>
              </div>
            </div>
          </div>

          {/* Self Pickup */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg">2</span>
              Самовывоз в Борисове
            </h2>
            <div className="bg-gray-50 p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <p className="text-lg font-medium mb-2">Частное предприятие «ЛИНУЧИ»</p>
                  <p className="text-gray-600 mb-4">ул. Дзержинского, 90, офис 3</p>
                  <p className="text-sm text-gray-500">
                    Время самовывоза оговаривается по телефону:{" "}
                    <a href="tel:+375293870980" className="text-black font-bold hover:underline">
                      +375 29 387-09-80
                    </a>
                  </p>
                </div>
                <div className="w-full md:w-80 h-64 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p>Карта</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg">3</span>
              Способы оплаты
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">ЕРИП</h3>
                <p className="text-sm text-gray-600">Оплата картой, наличными, электронными деньгами</p>
              </div>
              <div className="bg-gray-50 p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Наложенный платёж</h3>
                <p className="text-sm text-gray-600">Оплата при получении на почте</p>
              </div>
              <div className="bg-gray-50 p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-black text-white rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2">Наличные</h3>
                <p className="text-sm text-gray-600">При самовывозе</p>
              </div>
            </div>
            
            {/* ЕРИП Details */}
            <div className="mt-8 bg-blue-50 p-6 border border-blue-200">
              <h3 className="font-bold mb-4">Оплата через ЕРИП</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Номер услуги:</p>
                  <p className="text-gray-600">4484141</p>
                </div>
                <div>
                  <p className="font-medium">УНП:</p>
                  <p className="text-gray-600">690625671</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-medium mb-2">Путь в дереве услуг:</p>
                <p className="text-gray-600 text-sm">
                  Система «Расчёт» → Интернет-магазины/сервисы → A-Z Латинские домены → S → Shop.linuchi.by
                </p>
              </div>
              <div className="mt-4">
                <p className="font-medium mb-2">iPay (с баланса телефона):</p>
                <p className="text-gray-600 text-sm">
                  Быстрая оплата на iPay.by. Комиссия: МТС — 3%, Life — 3,5%.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-black text-white p-8 text-center">
            <p className="text-gray-300 mb-4">Если вам неудобны эти условия, свяжитесь с нами</p>
            <p className="text-xl mb-4">Мы постараемся помочь!</p>
            <a 
              href="tel:+375293870980" 
              className="text-2xl font-bold hover:text-gray-300 transition-colors"
            >
              +375 29 387-09-80
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
