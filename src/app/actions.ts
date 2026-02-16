'use server' // Bu satır çok önemli! Bu kodun sadece sunucuda çalışacağını belirtir.

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function createLink(formData: FormData) {
  // Formdan gelen verileri alıyoruz
  const url = formData.get("url") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string

  // Basit bir doğrulama yapma
  if (!url || !title) return

  // Veritabanına kayıt işlemi (INSERT INTO...)
  await prisma.link.create({
    data: {
      url,
      title,
      description,
    },
  })

  // Ana sayfayı yenile (veriler güncellensin)
  revalidatePath("/")
}