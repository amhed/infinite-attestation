'use server'

interface Message {
  id: number
  content: string
  sender: string
  blockNumber: number
}

export async function fetchMessages(): Promise<Message[]> {
  // Simulate fetching messages from a database
  return [
    { id: 1, content: 'Hello, Ethereum world!', sender: '0x1234...5678', blockNumber: 100 },
    { id: 2, content: 'This is a test message.', sender: '0x8765...4321', blockNumber: 101 },
    { id: 3, content: 'Blockchain messaging is cool!', sender: '0x2468...1357', blockNumber: 102 },
    { id: 4, content: 'Another message in a different block.', sender: '0x1357...2468', blockNumber: 200 },
    { id: 5, content: 'Testing search functionality.', sender: '0x5678...1234', blockNumber: 201 },
  ]
}
