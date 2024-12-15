// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import "../src/InfiniteAttest.sol";

contract InfiniteAttestTest is Test {
    InfiniteAttest public infiniteAttest;
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");
    
    function setUp() public {
        infiniteAttest = new InfiniteAttest();
        vm.deal(user1, 1 ether);
        vm.deal(user2, 1 ether);
    }
    
    function test_MultipleAttestsSameBlock() public {
        string memory text1 = "First attestation";
        string memory text2 = "Second attestation";
        
        // Both users attest in same block
        vm.prank(user1);
        infiniteAttest.attest(text1);
        
        vm.prank(user2);
        infiniteAttest.attest(text2);
        
        InfiniteAttest.Attestation[] memory attestations = infiniteAttest.getAttestations(block.number);
        assertEq(attestations.length, 2, "Should have 2 attestations");
        assertEq(attestations[0].attester, user1, "Wrong attester for first attestation");
        assertEq(attestations[0].text, text1, "Wrong text for first attestation");
        assertEq(attestations[1].attester, user2, "Wrong attester for second attestation");
        assertEq(attestations[1].text, text2, "Wrong text for second attestation");
    }
    
    function test_EmitsEvent() public {
        string memory testText = "Testing events";
        
        vm.prank(user1);
        vm.expectEmit(true, true, false, true);
        emit InfiniteAttest.AttestationMade(user1, block.number, testText, 0);
        
        infiniteAttest.attest(testText);
    }
} 