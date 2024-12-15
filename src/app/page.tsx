import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MessageFeed from "@/components/MessageFeed"
import ComposeMessage from "@/components/ComposeMessage"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ethereum Messaging App</h1>
      <Tabs defaultValue="feed">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feed">Message Feed</TabsTrigger>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <MessageFeed />
        </TabsContent>
        <TabsContent value="compose">
          <ComposeMessage />
        </TabsContent>
      </Tabs>
    </div>
  )
}

