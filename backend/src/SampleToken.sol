// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/";

contract SampleToken is ERC1155, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");
    Counters.Counter private _sampleCounter;

    struct SampleStorage {
        string uri;
        address artist;
    }

    mapping(uint256 => SampleStorage) public sampleStorage;

    event SampleMinted(uint256 id, address artist, string uri);
    event AlbumMinted(uint256 id, address artist, string uri);

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyArtist() {
        require(hasRole(ARTIST_ROLE, msg.sender), "Caller is not an artist");
        _;
    }

    function mintSample(address to, uint256 amount, string memory uri) external onlyArtist {
        _sampleCounter.increment();
        uint256 id = _sampleCounter.current();

        _mint(to, id, amount, "");
        sampleStorage[id] = SampleStorage({
            uri: uri,
            artist: msg.sender
        });

        emit SampleMinted(id, msg.sender, uri);
    }

    function mintAlbum(address to, uint256 amount, string memory uri) external onlyArtist {
        _sampleCounter.increment();
        uint256 id = _sampleCounter.current();

        _mint(to, id, amount, "");
        sampleStorage[id] = SampleStorage({
            uri: uri,
            artist: msg.sender
        });

        emit AlbumMinted(id, msg.sender, uri);
    }

    function uri(uint256 id) public view override returns (string memory) {
        return sampleStorage[id].uri;
    }

    function setArtistRole(address account) external {
        grantRole(ARTIST_ROLE, account);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
