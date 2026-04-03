"use client";

import { useState, useEffect, useRef, FormEvent, type ReactNode } from "react";

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

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
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-16">
        <Reveal>
          <p className="text-sm font-semibold text-blue-600 mb-4">Contact</p>
          <h1 className="text-3xl font-bold text-gray-900">
            お問い合わせ
          </h1>
        </Reveal>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20 lg:pb-28">
        {submitted ? (
          /* Success State */
          <Reveal>
            <div className="max-w-md mx-auto text-center py-20">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-7 h-7 text-blue-600"
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
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                お問い合わせありがとうございます
              </h2>
              <p className="text-base text-gray-600">
                2営業日以内にご連絡いたします。
              </p>
            </div>
          </Reveal>
        ) : (
          /* Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left: Info */}
            <Reveal className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <p className="text-base text-gray-600 leading-relaxed">
                    AI導入やサービスに関するご質問、お見積もりのご依頼など、どのようなことでもお気軽にお問い合わせください。
                  </p>
                </div>

                <div className="space-y-6 pt-2">
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-500 mb-1">
                      EMAIL
                    </p>
                    <p className="text-base text-gray-900">
                      info@and-clearai.com
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-500 mb-1">
                      対応方法
                    </p>
                    <p className="text-base text-gray-900">
                      メール・オンライン面談
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-sm font-semibold text-gray-500 mb-1">
                      営業時間
                    </p>
                    <p className="text-base text-gray-900">
                      平日 9:00〜18:00（土日祝休み）
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: Form */}
            <Reveal className="lg:col-span-3" delay={150}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      会社名 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={form.company}
                      onChange={handleChange}
                      placeholder="株式会社〇〇"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ご担当者名 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="山田 太郎"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      メールアドレス <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="info@example.com"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="03-XXXX-XXXX"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    従業員規模
                  </label>
                  <select
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-200 appearance-none cursor-pointer bg-white"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ご相談内容 <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="ご質問やご相談内容をご記入ください"
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors duration-200 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 text-white font-semibold px-10 py-3.5 hover:bg-blue-700 transition-colors duration-300"
                  >
                    送信する
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        )}
      </section>
    </main>
  );
}
