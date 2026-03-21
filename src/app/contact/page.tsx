"use client";

import { useState, useEffect, useRef, FormEvent, type ReactNode } from "react";

/* ─── Scroll-triggered reveal ─── */
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
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] tracking-[0.25em] uppercase text-white/20 mb-6 font-medium">
      {children}
    </p>
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
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <section className="max-w-[1100px] mx-auto px-6 pt-40 pb-20">
        <Reveal>
          <Label>Contact</Label>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-extralight tracking-tight text-white/90 leading-[1.15]">
            お問い合わせ
          </h1>
        </Reveal>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-32 lg:pb-44">
        {submitted ? (
          /* Success State */
          <Reveal>
            <div className="max-w-[500px] mx-auto text-center py-20">
              <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg
                  className="w-7 h-7 text-white/35"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-[clamp(1.2rem,2.5vw,1.6rem)] font-extralight text-white/80 mb-4">
                お問い合わせありがとうございます
              </h2>
              <p className="text-[14px] text-white/30 font-light">
                2営業日以内にご連絡いたします。
              </p>
            </div>
          </Reveal>
        ) : (
          /* Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
            {/* Left: Info */}
            <Reveal className="lg:col-span-2">
              <div className="space-y-10">
                <div>
                  <p className="text-[14px] text-white/35 leading-[2.2] font-light">
                    AI導入やサービスに関するご質問、お見積もりのご依頼など、どのようなことでもお気軽にお問い合わせください。
                  </p>
                </div>

                <div className="space-y-8 pt-4">
                  <div>
                    <p className="text-[11px] tracking-[0.2em] text-white/25 font-medium mb-2">
                      EMAIL
                    </p>
                    <p className="text-[14px] text-white/50 font-light">
                      info@and-clearai.com
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] tracking-[0.2em] text-white/25 font-medium mb-2">
                      TEL
                    </p>
                    <p className="text-[14px] text-white/50 font-light">
                      03-XXXX-XXXX
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] tracking-[0.2em] text-white/25 font-medium mb-2">
                      営業時間
                    </p>
                    <p className="text-[14px] text-white/50 font-light">
                      平日 9:00〜18:00（土日祝休み）
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: Form */}
            <Reveal className="lg:col-span-3" delay={150}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[12px] text-white/35 tracking-[0.05em] mb-3">
                      会社名 <span className="text-white/15">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={form.company}
                      onChange={handleChange}
                      placeholder="株式会社〇〇"
                      className="w-full bg-transparent border-b border-white/10 focus:border-white/40 pb-3 text-[14px] text-white/60 font-light placeholder-white/15 outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-white/35 tracking-[0.05em] mb-3">
                      ご担当者名 <span className="text-white/15">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="山田 太郎"
                      className="w-full bg-transparent border-b border-white/10 focus:border-white/40 pb-3 text-[14px] text-white/60 font-light placeholder-white/15 outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[12px] text-white/35 tracking-[0.05em] mb-3">
                      メールアドレス <span className="text-white/15">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="info@example.com"
                      className="w-full bg-transparent border-b border-white/10 focus:border-white/40 pb-3 text-[14px] text-white/60 font-light placeholder-white/15 outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-white/35 tracking-[0.05em] mb-3">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="03-XXXX-XXXX"
                      className="w-full bg-transparent border-b border-white/10 focus:border-white/40 pb-3 text-[14px] text-white/60 font-light placeholder-white/15 outline-none transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] text-white/35 tracking-[0.05em] mb-3">
                    従業員規模
                  </label>
                  <select
                    name="size"
                    value={form.size}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/10 focus:border-white/40 pb-3 text-[14px] text-white/60 font-light outline-none transition-colors duration-300 appearance-none cursor-pointer"
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
                  <label className="block text-[12px] text-white/35 tracking-[0.05em] mb-3">
                    ご相談内容 <span className="text-white/15">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="ご質問やご相談内容をご記入ください"
                    className="w-full bg-transparent border-b border-white/10 focus:border-white/40 pb-3 text-[14px] text-white/60 font-light placeholder-white/15 outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-white text-black px-10 py-3.5 text-[12px] tracking-[0.1em] hover:bg-white/80 transition-colors duration-300"
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
