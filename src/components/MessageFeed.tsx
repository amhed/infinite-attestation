'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchMessages } from '@/app/actions/messageActions';
import { Message } from '@/app/models/message';

export default function MessageFeed() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      const fetchedMessages = await fetchMessages();
      setMessages(fetchedMessages);
      setFilteredMessages(fetchedMessages);
    };
    loadMessages();
  }, []);

  const handleSearch = () => {
    if (searchTerm === '') {
      setFilteredMessages(messages);
    } else {
      const blockNumber = parseInt(searchTerm);
      const filtered = messages.filter(message => message.block_number === blockNumber);
      setFilteredMessages(filtered);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="number"
          placeholder="Search by block number"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {filteredMessages.map(message => (
        <Card key={message.id}>
          <CardHeader>
            <CardTitle>From: {message.attester}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{message.text}</p>
            <p className="text-sm text-gray-500 mt-2">Block: {message.block_number}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
