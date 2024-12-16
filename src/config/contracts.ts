export const INFINITE_ATTEST_ADDRESS = '0x148312bB99cd348AB02F6feA4767C4a8281A3dFD';
export const INFINITE_ATTEST_ABI = [
  {
    type: 'function',
    name: 'attest',
    inputs: [
      {
        name: 'text',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'attestationsByBlock',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'attester',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'text',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getAttestations',
    inputs: [
      {
        name: 'blockNumber',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct InfiniteAttest.Attestation[]',
        components: [
          {
            name: 'attester',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'text',
            type: 'string',
            internalType: 'string',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'AttestationMade',
    inputs: [
      {
        name: 'attester',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'blockNumber',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'text',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'index',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
];
