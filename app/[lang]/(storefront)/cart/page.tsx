import { getDictionary } from "@/lib/dictionary"
import { CartClient } from "@/components/cart-client"

export const runtime = 'edge'

export default async function CartPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return <CartClient dict={dict.cart} />
}
