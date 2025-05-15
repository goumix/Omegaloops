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
            SAMPLE_PRICE
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
            SAMPLE_PRICE
        );
        vm.stopPrank();

        // Now buy the sample
        vm.startPrank(buyer);

        // Record initial balances
        uint256 initialArtistBalance = artist.balance;
        uint256 initialBuyerBalance = buyer.balance;

        // Buy the sample
        omegaloops.buyNft{value: SAMPLE_PRICE}(0);

        // Verify balances after purchase
        assertEq(omegaloops.balanceOf(buyer, 0), 1);
        assertEq(omegaloops.balanceOf(artist, 0), NUMBER_OF_COPIES - 1);
        assertEq(artist.balance, initialArtistBalance + SAMPLE_PRICE);
        assertEq(buyer.balance, initialBuyerBalance - SAMPLE_PRICE);

        vm.stopPrank();
    }

    function testFail_CreateSampleWithZeroCopies() public {
        vm.startPrank(artist);
        omegaloops.createSample(
            ARTIST_NAME,
            SAMPLE_TITLE,
            SAMPLE_CATEGORY,
            SAMPLE_DESCRIPTION,
            0, // Zero copies should fail
            SAMPLE_PRICE
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
            SAMPLE_PRICE
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
            0 // Zero price should fail
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
            1.1 ether // Price over 1 ETH should fail
        );
        vm.stopPrank();
    }

    function testFail_BuySampleWithInsufficientFunds() public {
        // First create a sample
        vm.startPrank(artist);
        omegaloops.createSample(
            ARTIST_NAME,
            SAMPLE_TITLE,
            SAMPLE_CATEGORY,
            SAMPLE_DESCRIPTION,
            NUMBER_OF_COPIES,
            SAMPLE_PRICE
        );
        vm.stopPrank();

        // Try to buy with insufficient funds
        vm.startPrank(buyer);
        omegaloops.buyNft{value: SAMPLE_PRICE - 0.01 ether}(0);
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
            SAMPLE_PRICE
        );

        omegaloops.createSample(
            "Artist 2",
            "Sample 2",
            "Category 2",
            "Description 2",
            NUMBER_OF_COPIES,
            SAMPLE_PRICE
        );

        // Get all samples
        Omegaloops.Sample[] memory allSamples = omegaloops.getAllSamples();

        // Verify the number of samples
        assertEq(allSamples.length, 2);

        // Verify the second sample's data
        assertEq(allSamples[1].artist, "Artist 2");
        assertEq(allSamples[1].title, "Sample 2");

        vm.stopPrank();
    }
}
