// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Marketplace is AccessControl {
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");
    IERC1155 public sampleToken;

    mapping(uint256 => uint256) public listings;

    event ItemListed(uint256 indexed id, uint256 price);
    event ItemSold(uint256 indexed id, address indexed seller, address indexed buyer, uint256 price);

    constructor(address _sampleToken) {
        sampleToken = IERC1155(_sampleToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyArtist() {
        require(hasRole(ARTIST_ROLE, msg.sender), "Caller is not an artist");
        _;
    }

    function listItem(uint256 id, uint256 price) external onlyArtist {
        require(sampleToken.balanceOf(msg.sender, id) > 0, "You must own this sample");
        require(price > 0, "Price must be positive");
        listings[id] = price;
        emit ItemListed(id, price);
    }

    function buyItem(uint256 id) external payable {
        uint256 price = listings[id];
        require(price > 0, "Item is not for sale");
        require(msg.value >= price, "Insufficient funds");

        address seller = msg.sender;
        sampleToken.safeTransferFrom(seller, msg.sender, id, 1, "");

        payable(seller).transfer(msg.value);

        delete listings[id];

        emit ItemSold(id, seller, msg.sender, price);
    }

    function getListings() external view returns (uint256[] memory, uint256[] memory) {
        uint256[] memory ids = new uint256[](100); // Assuming max 100 listings
        uint256[] memory prices = new uint256[](100);
        uint256 count = 0;

        for (uint256 i = 1; i <= 100; i++) {
            if (listings[i] > 0) {
                ids[count] = i;
                prices[count] = listings[i];
                count++;
            }
        }

        return (ids, prices);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
