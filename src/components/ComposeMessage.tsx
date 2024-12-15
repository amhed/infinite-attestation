"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ComposeMessage() {
  const [message, setMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const connectAndSend = async () => {
    if (!message) {
      toast({
        title: "Empty Message",
        description: "Please enter a message to send.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (!isConnected) {
        if (typeof window.ethereum === "undefined") {
          throw new Error("Ethereum provider not found. Please install MetaMask.")
        }

        await window.ethereum.request({ method: "eth_requestAccounts" })
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const connectedAddress = await signer.getAddress()
        setAddress(connectedAddress)
        setIsConnected(true)

        toast({
          title: "Wallet Connected",
          description: `Connected with address: ${connectedAddress}`,
        })
      }

      // Here you would typically interact with a smart contract to send the message
      // For this example, we'll just simulate sending the message
      console.log("Sending message:", message)
      
      // Simulate blockchain delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: "Message Sent",
        description: "Your message has been sent to the Ethereum network.",
      })
      setMessage("")
    } catch (error) {
      console.error("Failed to connect wallet or send message:", error)
      toast({
        title: "Operation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compose Message</CardTitle>
        <CardDescription>
          {isConnected
            ? `Connected: ${address}`
            : "Connect your wallet and send a message to the Ethereum network."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-[100px]"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={connectAndSend} disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : isConnected ? "Send Message" : "Connect Wallet & Send"}
        </Button>
      </CardFooter>
    </Card>
  )
}

