## SampleToken.sol – Smart Contract Documentation

### Overview

The `SampleToken.sol` contract is an ERC-1155-based token designed to manage samples (individual sound files) and albums (collections of samples) for the Omegaloops marketplace. The contract allows artists to mint samples and albums, while users can view, purchase, and hold these tokens.

The contract uses IPFS for storing metadata (including the audio files) and does not incorporate any admin rights, giving users confidence by avoiding central authority control.

### Key Features

* **Minting of Samples and Albums**: Artists can mint individual samples or albums. Each sample or album is represented as an ERC-1155 token, allowing easy management of multiple editions.
* **Public Metadata**: Metadata and files are stored on IPFS and are publicly accessible. This includes the sample file itself and an associated image (optional).
* **No Admin Control**: There is no central admin for the contract. Only users with the "artist" role (defined by the ability to mint samples) can perform minting operations.
* **Role-Based Access Control**: The contract differentiates between artists (users who have published a sample) and regular users. Artists are granted the ability to mint, while regular users can only view and purchase tokens.

### Smart Contract Details

#### 1. Contract Variables

* **artistRole**: A unique role identifier for artists. Users who have minted a sample are automatically granted the artist role.
* **sampleCounter**: A counter to automatically increment the `id` of each minted sample, ensuring unique identifiers for each sample or album.
* **sampleStorage**: Stores metadata associated with each sample token, including the IPFS URI.

#### 2. Functions

##### Minting Function: `mintSample`

```solidity
function mintSample(address to, uint256 amount, string memory uri) external onlyArtist
```

* **Parameters**:

  * `to`: The address of the recipient.
  * `amount`: The number of tokens to mint (e.g., 1 for a single sample).
  * `uri`: The IPFS URI pointing to the metadata for the sample, including audio and image files.
* **Access Control**: Only addresses with the "artist" role can mint samples. This prevents unauthorized minting and ensures that only published artists can create new samples.

##### Minting Function: `mintAlbum`

```solidity
function mintAlbum(address to, uint256 amount, string memory uri) external onlyArtist
```

* **Parameters**:

  * `to`: The address of the recipient.
  * `amount`: The number of album tokens to mint (usually 1).
  * `uri`: The IPFS URI pointing to the album metadata, which includes all the samples in the album.
* **Access Control**: Only addresses with the "artist" role can mint albums.

##### URI Getter Function: `uri`

```solidity
function uri(uint256 id) public view override returns (string memory)
```

* **Description**: Returns the IPFS URI for the metadata associated with the sample or album identified by `id`.

##### Role Assignment (Artist Role)

```solidity
function setArtistRole(address account) external
```

* **Description**: This function assigns the artist role to users who have published a sample. It is typically called automatically by the contract, but can be triggered manually by an external mechanism if needed.

##### Access Control: `onlyArtist`

```solidity
modifier onlyArtist() {
    require(hasRole(ARTIST_ROLE, msg.sender), "Caller is not an artist");
    _;
}
```

* **Description**: This modifier ensures that only users with the artist role can call the minting functions. This prevents unauthorized minting by regular users.

#### 3. Events

* **SampleMinted**

```solidity
event SampleMinted(uint256 id, address artist, string uri);
```

* **AlbumMinted**

```solidity
event AlbumMinted(uint256 id, address artist, string uri);
```

* These events will emit when a sample or album is successfully minted, allowing off-chain applications to listen and update the user interface.

#### 4. Role Management

* **Artist Role**: Artists are granted the ability to mint tokens after they have published a sample. The role is assigned automatically or via a function like `setArtistRole`. Artists can mint individual samples and albums.
* **Regular Users**: Users who have not minted a sample are considered regular users and are unable to mint tokens. They can only view, purchase, and hold tokens.

### Metadata Structure (IPFS)

Each sample or album is associated with a JSON metadata file stored on IPFS. The metadata includes the following fields:

```json
{
  "name": "Trap Kick Sample",
  "description": "A high-quality kick sample for trap beats.",
  "image": "ipfs://QmCoverCID/cover.png",
  "animation_url": "ipfs://QmSampleCID/kick.wav",
  "artist": "Leon Beats",
  "album": "Trap Kit Vol.1",
  "genre": "Trap"
}
```

* **name**: The name of the sample.
* **description**: A short description of the sample.
* **image**: The IPFS link to an image representing the sample.
* **animation\_url**: The IPFS link to the audio file of the sample.
* **artist**: The artist who created the sample.
* **album**: The album this sample belongs to (if applicable).
* **genre**: The genre of the sample.

### Conclusion

The `SampleToken.sol` smart contract provides a decentralized, role-based system for managing and distributing audio samples as ERC-1155 tokens. The contract enables artists to mint and publish their own samples and albums while maintaining trust and transparency by removing admin control. By using IPFS for storage and providing public access to metadata, users can confidently view, purchase, and collect samples, with no concerns about centralized control.
