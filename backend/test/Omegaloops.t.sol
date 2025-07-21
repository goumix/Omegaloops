// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {Omegaloops} from "../src/Omegaloops.sol";

contract OmegaloopsTest is Test {
    Omegaloops public omegaloops;
    address public artist;
    address public buyer;

    // Sample data
    string public constant ARTIST_NAME = "Test Artist";
    string public constant SAMPLE_TITLE = "Test Sample";
    string public constant SAMPLE_CATEGORY = "Test Category";
    string public constant SAMPLE_DESCRIPTION = "Test Description";
    uint256 public constant NUMBER_OF_COPIES = 100;
    uint256 public constant SAMPLE_PRICE = 0.1 ether;
    string public constant SAMPLE_IPFS_HASH = "QmTestHashForSampleVideo123456789";

    function setUp() public {
        // Deploy the contract
        omegaloops = new Omegaloops();

        // Create test addresses
        artist = makeAddr("artist");
        buyer = makeAddr("buyer");

        // Fund the buyer with some ETH
        vm.deal(buyer, 10 ether);
    }

    function test_CreateSample() public {
        vm.startPrank(artist);

        // Create a sample
        omegaloops.createSample(
            ARTIST_NAME,
            SAMPLE_TITLE,
            SAMPLE_CATEGORY,
            SAMPLE_DESCRIPTION,
            NUMBER_OF_COPIES,
            SAMPLE_PRICE,
            SAMPLE_IPFS_HASH
        );

        // Get the created sample
        Omegaloops.Sample memory sample = omegaloops.getOneSample(0);

        // Verify sample data
        assertEq(sample.id, 0);
        assertEq(sample.addressArtist, artist);
        assertEq(sample.artist, ARTIST_NAME);
        assertEq(sample.title, SAMPLE_TITLE);
        assertEq(sample.category, SAMPLE_CATEGORY);
        assertEq(sample.description, SAMPLE_DESCRIPTION);
        assertEq(sample.numberOfCopies, NUMBER_OF_COPIES);
        assertEq(sample.priceNft, SAMPLE_PRICE);
        assertEq(sample.ipfsHash, SAMPLE_IPFS_HASH);

        // Verify token balance
        assertEq(omegaloops.balanceOf(artist, 0), NUMBER_OF_COPIES);

        vm.stopPrank();
    }

    function test_BuySample() public {
        // First create a sample
        vm.startPrank(artist);
        omegaloops.createSample(
            ARTIST_NAME,
            SAMPLE_TITLE,
            SAMPLE_CATEGORY,
            SAMPLE_DESCRIPTION,
            NUMBER_OF_COPIES,
            SAMPLE_PRICE,
            SAMPLE_IPFS_HASH
        );
        vm.stopPrank();

        // Now buy the sample
        vm.startPrank(buyer);

        uint256 initialArtistBalance = artist.balance;
        uint256 initialBuyerBalance = buyer.balance;

        omegaloops.buyNft{value: SAMPLE_PRICE}(0);

        // Verify ownership transfer
        assertEq(omegaloops.balanceOf(buyer, 0), 1);

        // Verify payment transfer
        assertEq(artist.balance, initialArtistBalance + SAMPLE_PRICE);
        assertEq(buyer.balance, initialBuyerBalance - SAMPLE_PRICE);

        // Verify sample copy count decreased
        Omegaloops.Sample memory sample = omegaloops.getOneSample(0);
        assertEq(sample.numberOfCopies, NUMBER_OF_COPIES - 1);

        vm.stopPrank();
    }

    // Test failure cases
    function testFail_CreateSampleWithZeroCopies() public {
        vm.startPrank(artist);
        omegaloops.createSample(
            ARTIST_NAME,
            SAMPLE_TITLE,
            SAMPLE_CATEGORY,
            SAMPLE_DESCRIPTION,
            0, // Zero copies should fail
            SAMPLE_PRICE,
            SAMPLE_IPFS_HASH
        );
        vm.stopPrank();
    }

    function testFail_CreateSampleWithTooManyCopies() public {
        vm.startPrank(artist);
        omegaloops.createSample(
            ARTIST_NAME,
            SAMPLE_TITLE,
            SAMPLE_CATEGORY,
            SAMPLE_DESCRIPTION,
            1001, // More than 1000 copies should fail
            SAMPLE_PRICE,
            SAMPLE_IPFS_HASH
        );
        vm.stopPrank();
    }

    function testFail_CreateSampleWithZeroPrice() public {
        vm.startPrank(artist);
        omegaloops.createSample(
            ARTIST_NAME,
            SAMPLE_TITLE,
            SAMPLE_CATEGORY,
            SAMPLE_DESCRIPTION,
            NUMBER_OF_COPIES,
            0, // Zero price should fail
            SAMPLE_IPFS_HASH
        );
        vm.stopPrank();
    }

    function testFail_CreateSampleWithPriceOverOne() public {
        vm.startPrank(artist);
        omegaloops.createSample(
            ARTIST_NAME,
            SAMPLE_TITLE,
            SAMPLE_CATEGORY,
            SAMPLE_DESCRIPTION,
            NUMBER_OF_COPIES,
            1.1 ether, // Price over 1 ETH should fail
            SAMPLE_IPFS_HASH
        );
        vm.stopPrank();
    }

    function test_GetAllSamples() public {
        vm.startPrank(artist);

        // Create multiple samples
        omegaloops.createSample(
            ARTIST_NAME,
            SAMPLE_TITLE,
            SAMPLE_CATEGORY,
            SAMPLE_DESCRIPTION,
            NUMBER_OF_COPIES,
            SAMPLE_PRICE,
            SAMPLE_IPFS_HASH
        );

        omegaloops.createSample(
            "Artist 2",
            "Sample 2",
            "Electronic",
            "Second test sample",
            50,
            0.05 ether,
            "QmSecondSampleHash"
        );

        vm.stopPrank();

        // Get all samples
        Omegaloops.Sample[] memory allSamples = omegaloops.getAllSamples();

        // Verify we have 2 samples
        assertEq(allSamples.length, 2);

        // Verify first sample
        assertEq(allSamples[0].artist, ARTIST_NAME);
        assertEq(allSamples[0].title, SAMPLE_TITLE);

        // Verify second sample
        assertEq(allSamples[1].artist, "Artist 2");
        assertEq(allSamples[1].title, "Sample 2");
    }

    function testFail_BuyNonExistentSample() public {
        vm.startPrank(buyer);
        omegaloops.buyNft{value: SAMPLE_PRICE}(999); // Non-existent sample ID
        vm.stopPrank();
    }

    function testFail_BuyWithInsufficientFunds() public {
        // First create a sample
        vm.startPrank(artist);
        omegaloops.createSample(
            ARTIST_NAME,
            SAMPLE_TITLE,
            SAMPLE_CATEGORY,
            SAMPLE_DESCRIPTION,
            NUMBER_OF_COPIES,
            SAMPLE_PRICE,
            SAMPLE_IPFS_HASH
        );
        vm.stopPrank();

        // Try to buy with insufficient funds
        vm.startPrank(buyer);
        omegaloops.buyNft{value: 0.05 ether}(0); // Less than SAMPLE_PRICE
        vm.stopPrank();
    }
}
