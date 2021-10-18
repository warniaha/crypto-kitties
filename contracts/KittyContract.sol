pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./Ownable.sol";
import "./IERC721Receiver.sol";

contract KittyContract is IERC721, Ownable {
    event Birth(address owner, uint256 kittyId, uint256 mumId, uint256 dadId, uint256 genes);
    event ApprovalForAll(address owner, address operator, bool approved);
    event TokenPrice(uint256 kittyId, uint256 tokenPrice);
    event Purchase(uint256 kittyId, address from, address to, uint256 price);

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }

    mapping(address => uint256[]) ownerToken;
    mapping(uint256 => address) tokenOwner;
    mapping(uint256 => uint256) tokenPrice;
    uint256[] tokensForSale;
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

    modifier ownerOfKitty(uint256 _tokenId) {
        require(msg.sender == _ownerOf(_tokenId), "Only the owner can breed");
        _;
    }

    function purchaseKitty(uint256 kittyId) external payable validKittyId(kittyId) {
        require(tokenPrice[kittyId] != 0, "KittyId is not for sale");
        require(tokenPrice[kittyId] <= msg.value, "Insufficient funds passed in to complete the transaction");
        address payable originalOwner = address(uint160(_ownerOf(kittyId)));
        _safeTransfer(_ownerOf(kittyId), msg.sender, kittyId, "");
        originalOwner.transfer(msg.value);
        eraseTokenPrice(kittyId);
        emit Purchase(kittyId, originalOwner, msg.sender, msg.value);
    }

    function createKittyGen0(uint256 _genes) public onlyOwner {
        require(gen0Counter < CREATION_LIMIT_GEN0, "Generation zero limit exceeded");
        gen0Counter++;
        _createKitty(0, 0, 0, _genes, msg.sender);
    }

    function getOwnerAddress() public view returns (address) {
        return owner;
    }

    function getTokenPrice(uint256 kittyId) public validKittyId(kittyId) view returns (uint256) {
        return tokenPrice[kittyId];
    }

    function setTokenPrice(uint256 kittyId, uint256 tokenCost) public validKittyId(kittyId) ownerOrOperatorApprover(msg.sender, kittyId) {
        eraseTokenPrice(kittyId);   // in case it was already set, this causes a replacement
        tokenPrice[kittyId] = tokenCost;
        if (tokenCost > 0) {
            tokensForSale.push(kittyId);
            _approve(address(this), kittyId);
        }
        emit TokenPrice(kittyId, tokenCost);
    }

    function breed(uint256 _dadId, uint256 _mumId) public ownerOfKitty(_dadId) ownerOfKitty(_mumId)
        validKittyId(_dadId) validKittyId(_mumId) {
        Kitty storage dad = kittyList[_dadId];
        Kitty storage mum = kittyList[_mumId];
        uint256 newDna = mixDna(dad.genes, mum.genes, uint8(block.timestamp));
        uint256 newGeneration = (dad.generation > mum.generation ? dad.generation : mum.generation) + 1;
        _createKitty(_mumId, _dadId, newGeneration, newDna, msg.sender);
        uint256 kittyId = kittyList.length - 1;
        emit Birth(msg.sender, kittyId, _mumId, _dadId, newDna);
    }

    function getKittyList() public view returns (uint256[] memory) {
        return ownerToken[msg.sender];
    }

    function getKittiesForSale() public view returns (uint256[] memory) {
        return tokensForSale;
    }

    function extractDnaPart(uint256 dna, uint256 offset, uint256 digits) internal pure returns (uint256) {
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

    function mixDnaZero(uint256 dadGenes, uint256 mumGenes) internal pure returns (uint256) {
        return (extractHeadColor(dadGenes) * 10**14) +
            (extractMouthColor(mumGenes) * 10**12) +
            (extractEyesColor(dadGenes) * 10**10) +
            (extractEarsColor(mumGenes) * 10**8) +
            (extractEyeShape(dadGenes) * 10**7) +
            (extractDecorationPattern(mumGenes) * 10**6) +
            (extractDecorationMidColor(dadGenes) * 10**4) +
            (extractDecorationEdgeColor(mumGenes) * 10**2) +
            (extractAnimation(dadGenes) * 10**1) +
            1;
    }

    function mixDnaOne(uint256 dadGenes, uint256 mumGenes) internal pure returns (uint256) {
        return (extractHeadColor(mumGenes) * 10**14) +
            (extractMouthColor(dadGenes) * 10**12) +
            (extractEyesColor(mumGenes) * 10**10) +
            (extractEarsColor(dadGenes) * 10**8) +
            (extractEyeShape(mumGenes) * 10**7) +
            (extractDecorationPattern(dadGenes) * 10**6) +
            (extractDecorationMidColor(mumGenes) * 10**4) +
            (extractDecorationEdgeColor(dadGenes) * 10**2) +
            (extractAnimation(mumGenes) * 10**1) +
            1;
    }

    function mixDnaTwo(uint256 dadGenes, uint256 mumGenes) internal pure returns (uint256) {
        return (extractHeadColor(dadGenes) * 10**14) +
            (extractMouthColor(dadGenes) * 10**12) +
            (extractEyesColor(mumGenes) * 10**10) +
            (extractEarsColor(mumGenes) * 10**8) +
            (extractEyeShape(dadGenes) * 10**7) +
            (extractDecorationPattern(dadGenes) * 10**6) +
            (extractDecorationMidColor(mumGenes) * 10**4) +
            (extractDecorationEdgeColor(mumGenes) * 10**2) +
            (extractAnimation(dadGenes) * 10**1) +
            1;
    }

    function mixDnaThree(uint256 dadGenes, uint256 mumGenes) internal pure returns (uint256) {
        return (extractHeadColor(mumGenes) * 10**14) +
            (extractMouthColor(mumGenes) * 10**12) +
            (extractEyesColor(dadGenes) * 10**10) +
            (extractEarsColor(dadGenes) * 10**8) +
            (extractEyeShape(mumGenes) * 10**7) +
            (extractDecorationPattern(mumGenes) * 10**6) +
            (extractDecorationMidColor(dadGenes) * 10**4) +
            (extractDecorationEdgeColor(dadGenes) * 10**2) +
            (extractAnimation(mumGenes) * 10**1) +
            1;
    }

    function mergeColors(uint256 sire, uint256 dame) private pure returns (uint256) {
        return mergeValues(sire, dame, 10, 98);
    }

    function mergeValues(uint256 sire, uint256 dame, uint256 min, uint256 max) private pure returns (uint256) {
        return ((sire + dame) % (max-min)) + min;
    }

    function mixDnaFour(uint256 dadGenes, uint256 mumGenes) internal pure returns (uint256) {
        return (mergeColors(extractHeadColor(dadGenes), extractHeadColor(mumGenes)) * 10**14) +
            (mergeColors(extractMouthColor(dadGenes), extractMouthColor(mumGenes)) * 10**12) +
            (mergeColors(extractEyesColor(dadGenes), extractEyesColor(mumGenes)) * 10**10) +
            (mergeColors(extractEarsColor(dadGenes), extractEarsColor(mumGenes)) * 10**8) +
            (mergeValues(extractEyeShape(dadGenes), extractEyeShape(mumGenes), 1, 3) * 10**7) +
            (mergeValues(extractDecorationPattern(dadGenes), extractDecorationPattern(mumGenes), 1, 3) * 10**6) +
            (mergeColors(extractDecorationMidColor(dadGenes), extractDecorationMidColor(mumGenes)) * 10**4) +
            (mergeColors(extractDecorationEdgeColor(dadGenes), extractDecorationEdgeColor(mumGenes)) * 10**2) +
            (mergeValues(extractAnimation(dadGenes), extractAnimation(mumGenes), 1, 4) * 10**1) +
            1;
    }

    function mixDnaFive(uint256 dadGenes, uint256 mumGenes) internal pure returns (uint256) {
        return (mergeColors(extractHeadColor(dadGenes), extractHeadColor(mumGenes)) * 10**14) +
            (extractMouthColor(mumGenes) * 10**12) +
            (mergeColors(extractEyesColor(dadGenes), extractEyesColor(mumGenes)) * 10**10) +
            (extractEarsColor(dadGenes) * 10**8) +
            (mergeValues(extractEyeShape(dadGenes), extractEyeShape(mumGenes), 1, 3) * 10**7) +
            (extractDecorationPattern(mumGenes) * 10**6) +
            (mergeColors(extractDecorationMidColor(dadGenes), extractDecorationMidColor(mumGenes)) * 10**4) +
            (extractDecorationEdgeColor(dadGenes) * 10**2) +
            (mergeValues(extractAnimation(dadGenes), extractAnimation(mumGenes), 1, 4) * 10**1) +
            1;
    }

    function mixDnaSix(uint256 dadGenes, uint256 mumGenes) internal pure returns (uint256) {
        return (extractHeadColor(mumGenes) * 10**14) +
            (mergeColors(extractMouthColor(dadGenes), extractMouthColor(mumGenes)) * 10**12) +
            (extractEyesColor(dadGenes) * 10**10) +
            (mergeColors(extractEarsColor(dadGenes), extractEarsColor(mumGenes)) * 10**8) +
            (extractEyeShape(mumGenes) * 10**7) +
            (mergeValues(extractDecorationPattern(dadGenes), extractDecorationPattern(mumGenes), 1, 3) * 10**6) +
            (extractDecorationMidColor(dadGenes) * 10**4) +
            (mergeColors(extractDecorationEdgeColor(dadGenes), extractDecorationEdgeColor(mumGenes)) * 10**2) +
            (extractAnimation(mumGenes) * 10**1) +
            1;
    }

    function mixDna(uint256 dadGenes, uint256 mumGenes) public view returns (uint256) {
        return mixDna(dadGenes, mumGenes, uint8(block.timestamp));
    }

    function mixVariantCount() public pure returns (uint256) {
        return 7;
        // return fnList.length;
    }

    function mixDna(uint256 dadGenes, uint256 mumGenes, uint256 randomizer) public pure returns (uint256) {
        uint256 genes;
        uint8 random = uint8(randomizer % mixVariantCount());
        if (random == 0) {
            genes = mixDnaZero(dadGenes, mumGenes);
        } else if (random == 1) {
            genes = mixDnaOne(dadGenes, mumGenes);
        } else if (random == 2) {
            genes = mixDnaTwo(dadGenes, mumGenes);
        } else if (random == 3) {
            genes = mixDnaThree(dadGenes, mumGenes);
        } else if (random == 4) {
            genes = mixDnaFour(dadGenes, mumGenes);
        } else if (random == 5) {
            genes = mixDnaFive(dadGenes, mumGenes);
        } else if (random == 6) {
            genes = mixDnaSix(dadGenes, mumGenes);
        } else {
            require(false, "Internal error - Invalid random seed");
        }
        if (dadGenes == genes || mumGenes == genes) {
            // not sure how this happens, but if the genes are identical to one of the parents, try using the merge one
            genes = mixDnaFour(dadGenes, mumGenes);
        }
        return genes;
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
    function ownerOf(uint256 tokenId) external view validKittyId(tokenId) returns (address) {
        return _ownerOf(tokenId);
    }

    function _ownerOf(uint256 tokenId) internal view returns (address) {
        return tokenOwner[tokenId];
    }

    function transfer(address to, uint256 tokenId) external {
        require(to != address(0), "To address can't be zero");
        require(_ownerOf(tokenId) == msg.sender, "Only owner can transfer");
        require(to != _ownerOf(tokenId), "Attempt to transfer to self");
        _transfer(msg.sender, to, tokenId);
    }

    function removeTokenForSale(uint256 tokenId) internal returns (bool) {
        return removeItem(tokensForSale, tokenId);        
    }

    function removeOwnerToken(address from, uint256 tokenId) internal returns (bool) {
        return removeItem(ownerToken[from], tokenId);
    }

    function removeItem(uint256[] storage array, uint256 tokenId) internal returns (bool) {
        uint256 index = array.length;    // init to invalid value
        for (uint256 loop = 0; loop < array.length; loop++)
        {
            if (array[loop] == tokenId) {
                index = loop;
                break;
            }
        }
        // do nothing if it wasn't found, Ex: (index == array.length)
        if (index != array.length) {
            // Move the last element into the place to delete
            array[index] = array[array.length - 1];
            // Remove the last element
            array.pop();
            return true;
        }
        return false;
    }

    function eraseTokenPrice(uint256 tokenId) internal {
        if (tokenPrice[tokenId] != 0){
            tokenPrice[tokenId] = 0;
            removeTokenForSale(tokenId);
            delete kittyIndexToApproved[tokenId];
        }
    }

    function _transfer(address from, address to, uint256 tokenId) internal {
        if (from != address(0)) {
            removeOwnerToken(from, tokenId);
            delete kittyIndexToApproved[tokenId];
        }
        ownerToken[to].push(tokenId);
        tokenOwner[tokenId] = to;
        eraseTokenPrice(tokenId);
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
