// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// OpenZeppelin library for semi-fungible tokens
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// OpenZeppelin library for reentrancy guard
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Omegaloops contract
/// @author Brault Natheo
/// @notice This contract is the main contract of the Omegaloops project.
contract Omegaloops is ERC1155, ReentrancyGuard {

  /// @notice The tokenIds of the sample
  uint256 private _tokenSampleIds;

  /// @notice The tokenIds of the album
//   uint256 private _tokenAlbumIds;

  /// @notice A struct to represent an sample
  /// @param addressArtist The address of the artist
  /// @param artist The name of the artist
  /// @param title The title of the sample
  /// @param category The category of the sample
  /// @param description The description of the sample
  /// @param numberOfCopies The number of copies of the semi-fungible token
  /// @param priceNft The ethers price of the semi-fungible token
  struct Sample {
    uint256 id;
    address addressArtist;
    string artist;
    string title;
    string category;
    string description;
    uint256 numberOfCopies;
    uint256 priceNft;
  }

//   struct Album {
//     uint256 id;
//     address artistAddress;
//     string artist;
//     string titleAlbum;
//     string descriptionAlbum;
//     uint256 numberOfSamples;
//     Sample[] idOfSamples;
//   }

  /// @notice An array of all samples
  Sample[] samples;
  /// @notice An array of all albums
//   Album[] albums;

  /// @notice A mapping of all owners of a sample
  mapping(uint => address[]) private ownersOfSample;

  /// @notice An event emitted when a sample is created
  event SampleCreated(uint256 id,address addressArtist,string artist,string title,string category,string description,uint256 numberOfCopies,uint256 priceNft);
  /// @notice An event emitted when a album is created
//   event AlbumCreated(uint256 id, address artistAddress, string artist, string titleAlbum, string descriptionAlbum, uint256 numberOfSamples, Sample[] idOfSamples);
  /// @notice An event emitted when a project is bought
  event SampleBought(address buyer, uint sampleId);
  /// @notice An event emitted when investors and artist are bought
  event InvestorsAndArtistBought(address buyer, uint projectId, uint amount);

  constructor() ERC1155("https://omegaloops.com/api/sample/{id}.json") {}

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155) returns (bool){
    return super.supportsInterface(interfaceId);
  }

  // ::::::::::::: GETTERS ::::::::::::: //

  /// @notice Get a sample by its id
  /// @param _id The id of the sample
  function getOneSample(uint _id) public view returns (Sample memory) {
    return samples[_id];
  }

  /// @notice Get an album by its id
  /// @param _id The id of the album
//   function getOneAlbum(uint _id) public view returns (Album memory) {
//     return albums[_id];
//   }

  /// @notice Get all samples
  function getAllSamples() public view returns (Sample[] memory) {
    return samples;
  }

  /// @notice Get all albums
//   function getAllAlbums() public view returns (Album[] memory) {
//     return albums;
//   }

//   /// @notice Get balance of all projects for the sender
//   function getBalanceOfAllProjectsForTheSender() public view returns (uint256[] memory) {
//     uint256[] memory projectIds = new uint256[](projects.length);
//     address[] memory addresses = new address[](projects.length);

//     for (uint i = 0; i < projects.length; i++) {
//         projectIds[i] = i;
//         addresses[i] = msg.sender;
//     }

//     uint256[] memory balances = balanceOfBatch(addresses, projectIds);

//     return balances;
//   }

  // ::::::::::::: SETTERS ::::::::::::: //

  /// @notice Create a sample
  /// @dev The function requires the sender to be different from the zero address,
  /// the number of copies to be greater than 0 and less than or equal to 1000,
  /// the price of the sample to be greater than 0 and less than or equal to 1
  /// and the number of samples to be less than 10000
  function createSample(
    string memory _artist,
    string memory _title,
    string memory _category,
    string memory _description,
    uint _numberOfCopies,
    uint256 _priceNft
  ) public {
    require(msg.sender != address(0), "ERC1155: mint to the zero address");
    require(_numberOfCopies > 0, "ERC1155: number of copies must be greater than 0");
    require(_numberOfCopies <= 1000, "ERC1155: number of copies must be less than or equal to 1000");
    require(_priceNft > 0, "ERC1155: price of the sample must be greater than 0");
    require(_priceNft <= 1, "ERC1155: price of the sample must be less than or equal to 1");
    require(samples.length < 10000, "ERC1155: number of samples must be less than 10000");

    uint256 newItemId = _tokenSampleIds;
    samples.push(Sample(newItemId, msg.sender, _artist, _title, _category, _description, _numberOfCopies, _priceNft));
    _mint(msg.sender, newItemId, _numberOfCopies, "");

    emit SampleCreated(newItemId, msg.sender, _artist, _title, _category, _description, _numberOfCopies, _priceNft);
    _tokenSampleIds++;
  }

  /// @notice Create a album
  /// @dev The function requires the sender to be different from the zero address,
  ///
//   function createAlbum(
//     string memory _artist,
//     string memory _titleAlbum,
//     string memory _descriptionAlbum,
//     Sample[] memory _idOfSamples
//   ) public {
//     require(msg.sender != address(0), "ERC1155: mint to the zero address");

//     uint256 newItemId = _tokenAlbumIds;

//     sampleIds = new uint256[](_idOfSamples.length);
//     for (uint i = 0; i < sampleIds.length; i++) {
//       if (_idOfSamples[i] != address(0)) {
//         samples.push(_idOfSamples[i]);
//     }

//     albums.push(Album(newItemId, msg.sender, _artist, _titleAlbum, _descriptionAlbum, _idOfSamples.length, sampleIds));
//     _mint(msg.sender, newItemId, 1, "");

//     emit AlbumCreated(newItemId, msg.sender, _artist, _titleAlbum, _descriptionAlbum, _idOfSamples.length, _idOfSamples);
//     _tokenAlbumIds++;
//   }


  /// @notice Buy Nft of a sample
  /// @param _id The id of the sample
  /// @dev The function requires the id of the project to be less than the length of the projects array,
  /// the amount to be greater than 0 and less than or equal to the number of copies of the project,
  /// the value to be greater than or equal to the price of the semi-fungible token multiplied by the amount,
  function buyNft(uint _id) public payable nonReentrant {
    require(_id < samples.length, "ERC1155: project does not exist");
    require(msg.value >= samples[_id].priceNft, "ERC1155: insufficient funds");

    samples[_id].numberOfCopies--;
    _setApprovalForAll(samples[_id].addressArtist, msg.sender, true);
    address payable artistAddress = payable(samples[_id].addressArtist);
    (bool success, ) = artistAddress.call{value: msg.value}("");
    require(success, "Transfer failed.");
    safeTransferFrom(samples[_id].addressArtist, msg.sender, _id, 1, "");
    _setApprovalForAll(samples[_id].addressArtist, msg.sender, false);
    ownersOfSample[_id].push(msg.sender);

    emit SampleBought(msg.sender, _id);
  }
}
