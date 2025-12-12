import { notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createServerClient } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"

export default async function OrderConfirmationPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerClient()

  // Fetch order details
  const { data: order, error: orderError } = await supabase.from("orders").select("*").eq("id", params.id).single()

  if (orderError || !order) {
    notFound()
  }

  // Fetch order items with product details
  const { data: orderItems, error: itemsError } = await supabase
    .from("order_items")
    .select(`
      *,
      products (
        name,
        images
      )
    `)
    .eq("order_id", params.id)

  if (itemsError) {
    console.error("[v0] Error fetching order items:", itemsError)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">Thank you for your purchase. Your order has been received.</p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Order Number</p>
                <p className="font-medium">#{order.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p className="font-medium capitalize">{order.status}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Order Date</p>
                <p className="font-medium">
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Total</p>
                <p className="font-medium text-lg">{formatPrice(order.total)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Items Ordered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderItems?.map((item: any) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                    {item.products?.images?.[0] && (
                      <img
                        src={item.products.images[0] || "/placeholder.svg"}
                        alt={item.products.name}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.products?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(order.total / 1.08)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatPrice(order.total - order.total / 1.08)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button asChild variant="outline" className="flex-1 bg-transparent">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/dashboard">View My Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
