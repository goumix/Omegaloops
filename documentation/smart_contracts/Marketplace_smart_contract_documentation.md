# Marketplace.sol - Smart Contract Documentation

## Objective

The `Marketplace.sol` contract allows users to buy and sell ERC-1155 Semi-Fungible Tokens (SFTs) representing audio samples or albums. It enables artists to list their creations for sale and users to purchase them.

## Functions

### 1. List an Item for Sale

The `listItem` function allows an artist to list a sample or album for sale on the marketplace. The artist sets a price, and the contract associates the sample with that price.

```solidity
function listItem(uint256 id, uint256 price) external onlyArtist {
  require(balanceOf(msg.sender, id) > 0, "You must own this sample");
  require(price > 0, "Price must be positive");
  listings[id] = price;
  emit ItemListed(id, price);
}
```

* **Parameters**:

  * `id`: The ID of the sample or album (ERC-1155 token ID).
  * `price`: The price for the sample in wei.

### 2. Buy an Item

The `buyItem` function allows a user to purchase a sample or album from the marketplace using Ether. The contract transfers the payment to the artist and the sample to the buyer.

```solidity
function buyItem(uint256 id) external payable {
  uint256 price = listings[id];
  require(price > 0, "Item is not for sale");
  require(msg.value >= price, "Insufficient funds");

  address artist = ownerOf(id);
  _safeTransferFrom(artist, msg.sender, id, 1, "");

  payable(artist).transfer(msg.value);

  delete listings[id];

  emit ItemSold(id, artist, msg.sender, price);
}
```

* **Parameters**:

  * `id`: The ID of the sample or album.
* **Conditions**:

  * The sample must be listed for sale.
  * The user must send sufficient funds (in wei) to purchase the item.

### 3. View Available Listings

The `getListings` function allows users to view the list of items currently for sale, including their prices.

```solidity
function getListings() external view returns (uint256[] memory, uint256[] memory) {
  uint256[] memory ids;
  uint256[] memory prices;

  for (uint256 i = 0; i < totalSupply; i++) {
    if (listings[i] > 0) {
      ids.push(i);
      prices.push(listings[i]);
    }
  }

  return (ids, prices);
}
```

* **Returns**:

  * A list of IDs for items currently for sale.
  * A list of prices corresponding to the item IDs.

## Storage

The `listings` mapping is used to store the items listed for sale. Each item ID is associated with a price in wei.

```solidity
mapping(uint256 => uint256) public listings;
```

* Each unique sample or album ID is mapped to its price in wei.

## Events

The following events are emitted to notify off-chain listeners about important actions:

* `ItemListed(uint256 indexed id, uint256 price)` — Emitted when a sample or album is listed for sale.
* `ItemSold(uint256 indexed id, address indexed seller, address indexed buyer, uint256 price)` — Emitted when a sample or album is sold.

## Role Management

The contract differentiates between **artists** (users who have already published at least one sample) and **regular users**. Only artists are allowed to list items for sale.

The artist role can be managed via a simple mapping or using the `AccessControl` extension.

```solidity
mapping(address => bool) public isArtist;
```

* The `isArtist` mapping will track whether a user has the artist role (i.e., whether they have already minted at least one sample).

## Conclusion

The `Marketplace.sol` smart contract enables a marketplace for users to buy and sell audio samples or albums represented as ERC-1155 SFTs. Artists can list their items for sale, and users can purchase them using Ether.

The contract is designed to be simple, with basic functions for listing, purchasing, and viewing available items. It also includes role-based access control to ensure that only artists can list items for sale.
