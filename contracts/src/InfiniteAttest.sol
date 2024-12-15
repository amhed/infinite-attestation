// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract InfiniteAttest {
    struct Attestation {
        address attester;
        string text;
    }
    
    // Mapping from block number to array of attestations
    mapping(uint256 => Attestation[]) public attestationsByBlock;
    
    event AttestationMade(
        address indexed attester,
        uint256 indexed blockNumber,
        string text,
        uint256 index
    );
    
    function attest(string calldata text) external {
        uint256 currentBlock = block.number;
        uint256 index = attestationsByBlock[currentBlock].length;
        
        attestationsByBlock[currentBlock].push(Attestation({
            attester: msg.sender,
            text: text
        }));
        
        emit AttestationMade(msg.sender, currentBlock, text, index);
    }
    
    function getAttestations(uint256 blockNumber) external view returns (Attestation[] memory) {
        return attestationsByBlock[blockNumber];
    }
} 