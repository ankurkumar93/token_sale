// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

/// @title Buy Tokens
/// @author Quillshash
/// @notice Only for Testing purpose

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract MyToken is ERC721, Ownable {
    
    /// sets a start time of auction
    uint256 public startTime = block.timestamp;

    /// sets an initial price of token
    uint256 public tokenPriceWei = 1000000000000000; //0.001 ether 0.00001 ether 0.00099 0.00098
    
    uint256 public discount = 1;
    uint256 public sharesLeft;

    constructor() ERC721("MyToken", "MNFT") {
        sharesLeft = 400000;
        AuctionState = auctionState.running;
    }
    mapping(address => uint) public shareOf;

    /// auction can be in two states currently
    enum auctionState { running, ended }
    auctionState public AuctionState;
    
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /// an event after a user buys token
    event boughtTokens(uint quantity, uint sharesLeft);

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /// buy function where argument is taken in wei
    function buy(uint _totalEth) public payable{
        uint minsPassed;
        /// calculates time that has been passed since deployment
        minsPassed = (sub(block.timestamp , startTime))/600; 
        if (minsPassed >= 144){
            AuctionState = auctionState.ended;
        }
        require(AuctionState == auctionState.running, "currently no auction is running");
        uint _currentPrice;
        /// calculate current price of token based on time that has been passed
        _currentPrice = tokenPriceWei - (discount * minsPassed * tokenPriceWei)/100;
        shareOf[msg.sender] = shareOf[msg.sender] + div(mul(_totalEth, 1 ), _currentPrice);
        /// calculate shares left 
        sharesLeft = sharesLeft - div(mul(_totalEth, 1 ), _currentPrice);
        emit boughtTokens(shareOf[msg.sender], sharesLeft);
    }

    function getBalance(address _userAddress) public view returns(uint256) {
        return shareOf[_userAddress];
    }
}

