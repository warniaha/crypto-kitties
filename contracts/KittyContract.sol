pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./Ownable.sol";
import "./IERC721Receiver.sol";

contract KittyContract is IERC721, Ownable {
    event Birth(address owner, uint256 kittyId, uint256 mumId, uint256 dadId, uint256 genes);
    event ApprovalForAll(address owner, address operator, bool approved);

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    mapping(address => uint256[]) ownerToken;
    mapping(uint256 => address) tokenOwner;
    Kitty[] kittyList;
    mapping (uint256 => address) public kittyIndexToApproved;
    mapping (address => mapping(address => bool)) private _operatorApprovals;

    uint256 gen0Counter;
    uint256 constant CREATION_LIMIT_GEN0 = 10;
    bytes4 constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;
    bytes4 internal constant magicERC721Received = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

    constructor() public {
        gen0Counter = 0;
    }

    function supportsInterface(bytes4 _interfaceId) external pure returns (bool) {
        return _interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165;
    }

    modifier validKittyId(uint256 kittyId) {
        require(kittyId < kittyList.length, "Invalid kitten id specified");
        _;
    }

    modifier ownerOrOperatorApprover(address from, uint256 _tokenId) {
        bool operatorApproved = _operatorApprovals[_ownerOf(_tokenId)][msg.sender];
        bool ownerApproved = msg.sender == _ownerOf(_tokenId);
        bool ownerAction = from == _ownerOf(_tokenId);
        require(operatorApproved || ownerApproved || ownerAction, "Only the owner/operator can approve");
        _;
    }

    function createKittyGen0(uint256 _genes) public onlyOwner {
        require(gen0Counter < CREATION_LIMIT_GEN0, "Generation zero limit exceeded");
        gen0Counter++;
        _createKitty(0, 0, 0, _genes, msg.sender);
    }

    function breed(uint256 _dadId, uint256 _mumId) public validKittyId(_dadId) validKittyId(_mumId) returns (uint256) {
        require(msg.sender == _ownerOf(_dadId), "Dad kitty not owned by caller");
        require(msg.sender == _ownerOf(_mumId), "Mum kitty not owned by caller");
        Kitty storage dad = kittyList[_dadId];
        Kitty storage mum = kittyList[_mumId];
        uint256 newDna = mixDna(dad.genes, mum.genes);
        uint256 newGeneration = (dad.generation > mum.generation ? dad.generation : mum.generation) + 1;
        _createKitty(_mumId, _dadId, newGeneration, newDna, msg.sender);
        return kittyList.length - 1;
    }

    function getKittyList() public view returns (uint256[] memory) {
        return ownerToken[msg.sender];
    }

    function extractDnaPart(uint256 dna, uint256 offset, uint256 digits) public pure returns (uint256) {
        return dna / (10 ** offset) % (10 ** digits);
    }

    function extractHeadColor(uint256 dna) public pure returns (uint256) {
        return extractDnaPart(dna, 14, 2);
    }

    function extractMouthColor(uint256 dna) public pure returns (uint256) {
        return extractDnaPart(dna, 12, 2);
    }

    function extractEyesColor(uint256 dna) public pure returns (uint256) {
        return extractDnaPart(dna, 10, 2);
    }

    function extractEarsColor(uint256 dna) public pure returns (uint256) {
        return extractDnaPart(dna, 8, 2);
    }

    function extractEyeShape(uint256 dna) public pure returns (uint256) {
        return extractDnaPart(dna, 7, 1);
    }

    function extractDecorationPattern(uint256 dna) public pure returns (uint256) {
        return extractDnaPart(dna, 6, 1);
    }

    function extractDecorationMidColor(uint256 dna) public pure returns (uint256) {
        return extractDnaPart(dna, 4, 2);
    }

    function extractDecorationEdgeColor(uint256 dna) public pure returns (uint256) {
        return extractDnaPart(dna, 2, 2);
    }

    function extractAnimation(uint256 dna) public pure returns (uint256) {
        return extractDnaPart(dna, 1, 1);
    }

    function extractLastnum(uint256 dna) public pure returns (uint256) {
        return extractDnaPart(dna, 0, 1);
    }

    function mergeColors(uint256 sire, uint256 dame) private pure returns (uint256) {
        return mergeValues(sire, dame, 10, 98);
    }

    function mergeValues(uint256 sire, uint256 dame, uint256 min, uint256 max) private pure returns (uint256) {
        uint256 mergedValue = (sire - min) ^ (dame - min);
        while (mergedValue > (max-min)) {
            mergedValue /= 2;
        }
        return mergedValue + min;
    }

    function mixDna(uint256 dadGenes, uint256 mumGenes) public pure returns (uint256) {
        return (mergeColors(extractHeadColor(dadGenes), extractHeadColor(mumGenes)) * 10**14) +
            (mergeColors(extractMouthColor(dadGenes), extractMouthColor(mumGenes)) * 10**12) +
            (mergeColors(extractEyesColor(dadGenes), extractEyesColor(mumGenes)) * 10**10) +
            (mergeColors(extractEarsColor(dadGenes), extractEarsColor(mumGenes)) * 10**8) +
            (mergeValues(extractEyeShape(dadGenes), extractEyeShape(mumGenes), 1, 3) * 10**7) +
            (mergeValues(extractEyeShape(dadGenes), extractEyeShape(mumGenes), 1, 3) * 10**6) +
            (mergeColors(extractDecorationMidColor(dadGenes), extractDecorationMidColor(mumGenes)) * 10**4) +
            (mergeColors(extractDecorationEdgeColor(dadGenes), extractDecorationEdgeColor(mumGenes)) * 10**2) +
            (mergeValues(extractEyeShape(dadGenes), extractEyeShape(mumGenes), 1, 4) * 10**1) +
            1;
    }

    function _createKitty(
        uint256 _mumId, 
        uint256 _dadId, 
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns (uint256) {
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });
        uint256 newKittyId = kittyList.length;
        kittyList.push(_kitty);
        emit Birth(_owner, newKittyId, _mumId, _dadId, _genes);

        _transfer(address(0), _owner, newKittyId);

        return newKittyId;
    }

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address _owner) external view returns (uint256 balance) {
        return ownerToken[_owner].length;
    }

    /*
     * @dev Returns the total number of tokens in circulation.
     */
    function totalSupply() external view returns (uint256 total) {
        return kittyList.length;
    }

    /*
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory tokenName) {
        return "Walter's Crypto-Kitty";
    }

    /*
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory tokenSymbol) {
        return "WW_KITTY";
    }

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view validKittyId(tokenId) returns (address _owner) {
        return _ownerOf(tokenId);
    }

    function _ownerOf(uint256 tokenId) internal view returns (address _owner) {
        return tokenOwner[tokenId];
    }

    function transfer(address to, uint256 tokenId) external {
        require(to != address(0), "To address can't be zero");
        require(_ownerOf(tokenId) == msg.sender, "Only owner can transfer");
        _transfer(msg.sender, to, tokenId);
    }

    function removeItem(address from, uint256 tokenId) internal {
        uint256 index = ownerToken[from].length;    // init to invalid value
        for (uint256 loop = 0; loop < ownerToken[from].length; loop++)
        {
            if (ownerToken[from][loop] == tokenId) {
                index = loop;
                break;
            }
        }
        require(index != ownerToken[from].length, "tokenId not found to remove");
        // Move the last element into the place to delete
        ownerToken[from][index] = ownerToken[from][ownerToken[from].length - 1];
        // Remove the last element
        ownerToken[from].pop();
    }


    function _transfer(address from, address to, uint256 tokenId) internal {
        if (from != address(0)) {
            removeItem(from, tokenId);
            delete kittyIndexToApproved[tokenId];
        }
        ownerToken[to].push(tokenId);
        tokenOwner[tokenId] = to;
    
        emit Transfer(from, to, tokenId);
    }

    function getKitty(uint256 kittyId) external view validKittyId(kittyId) returns (
        uint256 mumId, 
        uint256 dadId, 
        uint256 generation,
        uint256 genes,
        uint256 birthTime,
        address kittyOwner,
        uint256 catId) {
        Kitty storage kitty = kittyList[kittyId];
        mumId = kitty.mumId;
        dadId = kitty.dadId;
        generation = kitty.generation;
        genes = kitty.genes;
        birthTime = kitty.birthTime;
        kittyOwner = _ownerOf(kittyId);
        catId = kittyId;
    }

    function approve(address _approved, uint256 _tokenId) external validKittyId(_tokenId) ownerOrOperatorApprover(_approved, _tokenId) {
        require(_approved != address(0), "Invalid approval address");
        _approve(_approved, _tokenId);
    }
    function _approve(address _approved, uint256 _tokenId) internal {
        kittyIndexToApproved[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        require(_operator != msg.sender, "Invalid operator address");
        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function getApproved(uint256 _tokenId) external view validKittyId(_tokenId) returns (address) {
        return kittyIndexToApproved[_tokenId];
    }

    function isApprovedForAll(address _owner, address _operator) external view returns (bool) {
        return _operatorApprovals[_owner][_operator];
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata data) validKittyId(_tokenId) ownerOrOperatorApprover(_from, _tokenId) external {
        _safeTransfer(_from, _to, _tokenId, data);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) validKittyId(_tokenId) ownerOrOperatorApprover(_from, _tokenId) external {
        _safeTransfer(_from, _to, _tokenId, "");
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, data));
    }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory data) internal returns (bool) {
        if (!_isContract(_to)) {
            return true;
        }
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, data);
        return returnData == magicERC721Received;
    }

    function _isContract(address _to) view internal returns (bool) {
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0;
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) validKittyId(_tokenId) ownerOrOperatorApprover(_from, _tokenId) external {
        require(_to != address(0), "Invalid to address");
        _transfer(_from, _to, _tokenId);
    }
}
