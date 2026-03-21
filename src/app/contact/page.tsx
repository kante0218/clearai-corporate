"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    size: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-navy-950 tracking-tight">
            お問い合わせ
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            サービスに関するご質問・ご相談はお気軽にお問い合わせください
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        {submitted ? (
          /* Success State */
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-navy-950 mb-3">
              お問い合わせありがとうございます
            </h2>
            <p className="text-gray-600">
              2営業日以内にご連絡いたします。
            </p>
          </div>
        ) : (
          /* Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-950 mb-2">
                  お気軽にご相談ください
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  AI導入やサービスに関するご質問、お見積もりのご依頼など、
                  どのようなことでもお気軽にお問い合わせください。
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">メール</p>
                    <p className="text-sm text-gray-600">info@and-clearai.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">電話</p>
                    <p className="text-sm text-gray-600">03-XXXX-XXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-950">営業時間</p>
                    <p className="text-sm text-gray-600">
                      平日 9:00〜18:00（土日祝休み）
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-2xl border border-gray-200 p-8 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-navy-950 mb-2">
                      会社名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={form.company}
                      onChange={handleChange}
                      placeholder="株式会社〇〇"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-950 mb-2">
                      ご担当者名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="山田 太郎"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-navy-950 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="info@example.com"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy-950 mb-2">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="03-XXXX-XXXX"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-2">
                    従業員規模
                  </label>
                  <select
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-navy-950 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                  >
                    <option value="">選択してください</option>
                    <option value="~50名">〜50名</option>
                    <option value="51-200名">51〜200名</option>
                    <option value="201-500名">201〜500名</option>
                    <option value="501-1000名">501〜1000名</option>
                    <option value="1001名~">1001名〜</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-950 mb-2">
                    ご相談内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="ご質問やご相談内容をご記入ください"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-navy-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors duration-200 shadow-md shadow-accent/25 hover:shadow-lg hover:shadow-accent/30"
                >
                  送信する
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
