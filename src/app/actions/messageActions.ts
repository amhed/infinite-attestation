'use server';

import { createClient } from '@supabase/supabase-js';
import { Message } from '../models/message';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function fetchMessages(): Promise<Message[]> {
  const { data, error } = await supabase
    .from('attestations')
    .select('id, text, attester, block_number')
    .order('block_number', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  return data || [];
}
