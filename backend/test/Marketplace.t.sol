// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Marketplace.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// Mock ERC1155 token for testing
contract MockERC1155 is ERC1155 {
    constructor() ERC1155("") {}

    function mint(address to, uint256 id, uint256 amount) external {
        _mint(to, id, amount, "");
    }
}

contract MarketplaceTest is Test {
    Marketplace public marketplace;
    MockERC1155 public sampleToken;
    address public artist;
    address public buyer;
    address public admin;

    function setUp() public {
        // Deploy mock token
        sampleToken = new MockERC1155();

        // Deploy marketplace
        marketplace = new Marketplace(address(sampleToken));

        // Setup test accounts
        artist = makeAddr("artist");
        buyer = makeAddr("buyer");
        admin = address(this);

        // Setup roles
        marketplace.grantRole(marketplace.ARTIST_ROLE(), artist);

        // Mint some tokens to artist
        sampleToken.mint(artist, 1, 1);
        sampleToken.mint(artist, 2, 1);
    }

    function test_Deployment() public {
        assertEq(address(marketplace.sampleToken()), address(sampleToken));
        assertTrue(marketplace.hasRole(marketplace.DEFAULT_ADMIN_ROLE(), admin));
    }

    function test_ArtistRole() public {
        assertTrue(marketplace.hasRole(marketplace.ARTIST_ROLE(), artist));
        assertFalse(marketplace.hasRole(marketplace.ARTIST_ROLE(), buyer));
    }

    function test_ListItem() public {
        vm.startPrank(artist);
        marketplace.listItem(1, 1 ether);
        (uint256[] memory ids, uint256[] memory prices) = marketplace.getListings();
        assertEq(ids[0], 1);
        assertEq(prices[0], 1 ether);
        vm.stopPrank();
    }

    function testFail_ListItem_NotArtist() public {
        vm.prank(buyer);
        marketplace.listItem(1, 1 ether);
    }

    function testFail_ListItem_NotOwner() public {
        vm.prank(artist);
        marketplace.listItem(3, 1 ether); // Token ID 3 doesn't exist
    }

    function test_BuyItem() public {
        // First list the item
        vm.startPrank(artist);
        marketplace.listItem(1, 1 ether);
        // Approve marketplace to transfer token
        sampleToken.setApprovalForAll(address(marketplace), true);
        vm.stopPrank();

        // Buy the item
        vm.deal(buyer, 1 ether);
        vm.prank(buyer);
        marketplace.buyItem{value: 1 ether}(1);

        // Check token ownership
        assertEq(sampleToken.balanceOf(buyer, 1), 1);
        assertEq(sampleToken.balanceOf(artist, 1), 0);

        // Check that listing was removed
        (uint256[] memory ids, uint256[] memory prices) = marketplace.getListings();
        assertEq(ids[0], 0);
        assertEq(prices[0], 0);
    }

    function testFail_BuyItem_InsufficientFunds() public {
        // First list the item
        vm.startPrank(artist);
        marketplace.listItem(1, 1 ether);
        vm.stopPrank();

        // Try to buy with insufficient funds
        vm.deal(buyer, 0.5 ether);
        vm.prank(buyer);
        marketplace.buyItem{value: 0.5 ether}(1);
    }

    function test_GetListings() public {
        // List multiple items
        vm.startPrank(artist);
        marketplace.listItem(1, 1 ether);
        marketplace.listItem(2, 2 ether);
        vm.stopPrank();

        // Get listings
        (uint256[] memory ids, uint256[] memory prices) = marketplace.getListings();

        // Verify first listing
        assertEq(ids[0], 1);
        assertEq(prices[0], 1 ether);

        // Verify second listing
        assertEq(ids[1], 2);
        assertEq(prices[1], 2 ether);
    }
}
