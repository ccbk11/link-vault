// 1. BU SATIRI EN ÜSTE EKLE:
export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/db";
import { createLink } from "./actions";
import { Link } from "@prisma/client";

// ... kodun geri kalanı aynı ...

// Bu bileşen "async" çünkü veritabanından veri bekleyecek
export default async function Home() {
  // 1. Veritabanındaki linkleri çek (SELECT * FROM Link ORDER BY createdAt DESC)
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Başlık Alanı */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            TEST BRANCH LinkVault 🚀
          </h1>
          <p className="text-slate-400 mt-2">DevOps & AI Destekli Link Arşivi</p>
        </header>

        {/* Ekleme Formu */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-10 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Yeni Link Ekle:</h2>
          {/* action kısmına az önce yazdığımız fonksiyonu veriyoruz */}
          <form action={createLink} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Başlık (Örn: Next.js Dersleri)"
                className="bg-slate-800 border border-slate-700 p-3 rounded text-white focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="url"
                name="url"
                placeholder="Link (https://...)"
                className="bg-slate-800 border border-slate-700 p-3 rounded text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <textarea
              name="description"
              placeholder="Açıklama (Opsiyonel)"
              className="bg-slate-800 border border-slate-700 p-3 rounded text-white focus:outline-none focus:border-blue-500 h-24"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-200"
            >
              Arşive Kaydet
            </button>
          </form>
        </div>

        {/* Link Listesi */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Arşivlenenler ({links.length})</h2>
          
          {links.length === 0 ? (
            <p className="text-center text-slate-500 py-10">Henüz hiç link eklenmemiş.</p>
          ) : (
            <div className="grid gap-4">
              {links.map((link) => (
                <div key={link.id} className="bg-slate-900 p-5 rounded-lg border border-slate-800 hover:border-slate-600 transition group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-blue-400 group-hover:text-blue-300">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.title}
                        </a>
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">{link.description}</p>
                    </div>
                    <span className="text-xs text-slate-600">
                      {link.createdAt.toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
