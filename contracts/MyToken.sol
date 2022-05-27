// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract MyToken is ERC721, Ownable {

    uint256 public startTime = block.timestamp;
    uint256 public tokenPriceWei = 1000000000000000;
    uint256 public discount = 1;
    uint256 public sharesLeft;

    constructor() ERC721("MyToken", "MNFT") {
        sharesLeft = 400000;
        AuctionState = auctionState.running;
        
    }
    mapping(address => uint) public shareOf;
    enum auctionState { started, running, ended, cancelled }
    auctionState public AuctionState;
    
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    event priceReduction(uint tokenPriceWei);
    event boughtTokens(uint quantity, uint sharesLeft);

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    function buy(uint _totalEth) public payable {
        require(AuctionState == auctionState.running, "currently no auction is running");
        uint _currentPrice;
        uint minsPassed;
        minsPassed = (block.timestamp - startTime)/600; 
        _currentPrice = tokenPriceWei - (discount * minsPassed * tokenPriceWei)/100;
        shareOf[msg.sender] = shareOf[msg.sender] + div(mul(_totalEth, 1 ), _currentPrice);
        sharesLeft = sharesLeft - div(mul(_totalEth, 1 ), _currentPrice);
        emit boughtTokens(shareOf[msg.sender], sharesLeft);
    }

    function getBalance(address _userAddress) public view returns(uint256) {
        return shareOf[_userAddress];
    }

}
