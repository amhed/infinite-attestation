import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
const CONTRACT_DEPLOY_BLOCK = 'DEPLOY_BLOCK_NUMBER'; // Add your contract's deploy block

const abi = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'attester', type: 'address' },
      { indexed: true, name: 'blockNumber', type: 'uint256' },
      { indexed: false, name: 'text', type: 'string' },
      { indexed: false, name: 'index', type: 'uint256' },
    ],
    name: 'AttestationMade',
    type: 'event',
  },
] as const;

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.ALCHEMY_URL),
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function GET() {
  // Verify cron secret
  const headersList = headers();
  const cronSecret = headersList.get('x-cron-secret');

  if (cronSecret !== process.env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Get last indexed block
    const { data: state } = await supabase.from('indexer_state').select('block_number').single();

    const fromBlock = state?.block_number || BigInt(CONTRACT_DEPLOY_BLOCK);
    const latestBlock = await client.getBlockNumber();

    // Get events
    const events = await client.getLogs({
      address: CONTRACT_ADDRESS,
      events: [abi[0]],
      fromBlock,
      toBlock: latestBlock,
    });

    // Insert events
    if (events.length > 0) {
      await supabase.from('attestations').insert(
        events.map(event => ({
          attester: event.args.attester,
          block_number: Number(event.args.blockNumber),
          text: event.args.text,
          index: Number(event.args.index),
        }))
      );
    }

    // Update last indexed block
    await supabase
      .from('indexer_state')
      .update({ block_number: Number(latestBlock) })
      .eq('id', 'last_indexed_block');

    return new Response('Success', { status: 200 });
  } catch (error) {
    console.error('Indexing error:', error);
    return new Response('Error', { status: 500 });
  }
}
