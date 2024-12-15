create table if not exists attestations (
  id bigint primary key generated always as identity,
  attester text not null,
  block_number bigint not null,
  text text not null,
  index bigint not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists indexer_state (
  id text primary key default 'last_indexed_block',
  block_number bigint not null
);

-- Insert initial indexer state
insert into indexer_state (block_number) values (0)
on conflict (id) do nothing; 