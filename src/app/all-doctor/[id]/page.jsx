"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const PaymentForConfirmF = () => {
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false)

    const handlePayment = async () => {
        if (!amount) {
            alert("Please enter the amount!")
            return
        }

        setLoading(true)
        try {
            const res = await fetch("/api/init-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            })

            const data = await res.json()
            if (data.GatewayPageURL) {
                window.location.href = data.GatewayPageURL // Redirect to SSLCommerz Gateway
            } else {
                alert("Failed to create payment session.")
            }
        } catch (error) {
            console.error("Payment error:", error)
            alert("Something went wrong!")
        }
        setLoading(false)
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-gray-100">
            <Card className="w-full max-w-md shadow-2xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Confirm Payment
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount (BDT)</Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Link href={'/all-doctor'} variant="outline">Cancel</Link>
                    <Button onClick={handlePayment} disabled={loading}>
                        {loading ? "Processing..." : "Pay Now"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default PaymentForConfirmF
