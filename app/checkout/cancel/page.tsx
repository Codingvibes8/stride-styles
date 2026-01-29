"use client";

import Link from "next/link";
import { XCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <CardContent className="pt-8 pb-8 space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Checkout Cancelled
              </h1>
              <p className="text-muted-foreground">
                Your order was not completed. No charges have been made to your account.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 text-sm text-muted-foreground">
              <p>Your cart items have been saved. You can continue shopping or try again.</p>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button asChild size="lg">
                <Link href="/cart">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Return to Cart
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
