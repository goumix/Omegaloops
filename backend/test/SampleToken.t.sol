// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {SampleToken} from "../src/SampleToken.sol";

contract SampleTokenTest is Test {
    SampleToken public sampleToken;
    address public artist;
    address public user;
    string public constant SAMPLE_URI = "ipfs://sample";
    string public constant ALBUM_URI = "ipfs://album";

    function setUp() public {
        // Deploy the contract
        sampleToken = new SampleToken();

        // Create test addresses
        artist = makeAddr("artist");
        user = makeAddr("user");

        // Grant artist role to the artist address
        sampleToken.setArtistRole(artist);
    }

    function test_InitialSetup() public view {
        // Check if deployer has admin role
        assertTrue(sampleToken.hasRole(sampleToken.DEFAULT_ADMIN_ROLE(), address(this)));

        // Check if artist has artist role
        assertTrue(sampleToken.hasRole(sampleToken.ARTIST_ROLE(), artist));

        // Check if user doesn't have artist role
        assertFalse(sampleToken.hasRole(sampleToken.ARTIST_ROLE(), user));
    }

    function test_MintSample() public {
        vm.startPrank(artist);

        // Mint a sample
        sampleToken.mintSample(user, 1, SAMPLE_URI);

        // Check balance
        assertEq(sampleToken.balanceOf(user, 0), 1);

        // Check URI
        assertEq(sampleToken.uri(0), SAMPLE_URI);

        // Check artist in storage
        (string memory uri, address storedArtist) = sampleToken.sampleStorage(0);
        assertEq(uri, SAMPLE_URI);
        assertEq(storedArtist, artist);

        vm.stopPrank();
    }

    function test_MintAlbum() public {
        vm.startPrank(artist);

        // Mint an album
        sampleToken.mintAlbum(user, 1, ALBUM_URI);

        // Check balance
        assertEq(sampleToken.balanceOf(user, 0), 1);

        // Check URI
        assertEq(sampleToken.uri(0), ALBUM_URI);

        // Check artist in storage
        (string memory uri, address storedArtist) = sampleToken.sampleStorage(0);
        assertEq(uri, ALBUM_URI);
        assertEq(storedArtist, artist);

        vm.stopPrank();
    }

    function testFail_MintWithoutArtistRole() public {
        vm.startPrank(user);

        // This should fail as user doesn't have artist role
        sampleToken.mintSample(user, 1, SAMPLE_URI);

        vm.stopPrank();
    }

    function testFail_MintToZeroAddress() public {
        vm.startPrank(artist);

        // This should fail as we can't mint to zero address
        sampleToken.mintSample(address(0), 1, SAMPLE_URI);

        vm.stopPrank();
    }

    function testFail_MintZeroAmount() public {
        vm.startPrank(artist);

        // This should fail as amount must be greater than 0
        sampleToken.mintSample(user, 0, SAMPLE_URI);

        vm.stopPrank();
    }

    function test_SupportsInterface() public view {
        // Check if contract supports ERC1155 interface
        assertTrue(sampleToken.supportsInterface(0xd9b67a26));

        // Check if contract supports AccessControl interface
        assertTrue(sampleToken.supportsInterface(0x7965db0b));
    }
}
