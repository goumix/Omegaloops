// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title SampleToken contract
/// @author Brault Natheo
/// @notice This contract allows artists to mint individual samples and albums as ERC1155 tokens
contract SampleToken is ERC1155, AccessControl {

    /// @dev Role identifier for artists
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");

    /// @dev Token ID counter
    uint256 private _tokenIds;

    /// @dev Storage of each sample or album metadata
    struct SampleStorage {
        string uri;
        address artist;
    }

    /// @notice Maps token ID to its corresponding SampleStorage
    mapping(uint256 => SampleStorage) public sampleStorage;

    /// @notice Event emitted when a sample is minted
    event SampleMinted(uint256 id, address artist, string uri);

    /// @notice Event emitted when an album is minted
    event AlbumMinted(uint256 id, address artist, string uri);

    /// @dev Initializes the contract, sets the deployer as admin
    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /// @dev Restricts function to ARTIST_ROLE holders
    modifier onlyArtist() {
        require(hasRole(ARTIST_ROLE, msg.sender), "Caller is not an artist");
        _;
    }

    /// @notice Mints a new sample token
    /// @param to The address that will receive the minted sample
    /// @param amount The number of copies of the sample
    /// @param metadataUri The metadata URI for the sample
    function mintSample(address to, uint256 amount, string memory metadataUri) external onlyArtist {
        require(to != address(0), "ERC1155: mint to the zero address");
        require(amount > 0, "ERC1155: amount must be greater than 0");

        uint256 newItemId = _tokenIds;

        _mint(to, newItemId, amount, "");
        sampleStorage[newItemId] = SampleStorage({
            uri: metadataUri,
            artist: msg.sender
        });

        emit SampleMinted(newItemId, msg.sender, metadataUri);

        _tokenIds++;
    }

    /// @notice Mints a new album token
    /// @param to The address that will receive the minted album
    /// @param amount The number of copies of the album
    /// @param metadataUri The metadata URI for the album
    function mintAlbum(address to, uint256 amount, string memory metadataUri) external onlyArtist {
        require(to != address(0), "ERC1155: mint to the zero address");
        require(amount > 0, "ERC1155: amount must be greater than 0");

        uint256 newItemId = _tokenIds;

        _mint(to, newItemId, amount, "");
        sampleStorage[newItemId] = SampleStorage({
            uri: metadataUri,
            artist: msg.sender
        });

        emit AlbumMinted(newItemId, msg.sender, metadataUri);

        _tokenIds++;
    }

    /// @notice Returns the metadata URI for a given token ID
    /// @param id The ID of the token
    /// @return The URI of the token
    function uri(uint256 id) public view override returns (string memory) {
        return sampleStorage[id].uri;
    }

    /// @notice Grants the ARTIST_ROLE to an address
    /// @param account The address to grant the role to
    function setArtistRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ARTIST_ROLE, account);
    }

    /// @notice Checks if the contract supports a given interface
    /// @param interfaceId The interface ID to check
    /// @return True if supported, false otherwise
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
