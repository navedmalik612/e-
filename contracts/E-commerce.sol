// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Ecommerce {
    address public owner;
    mapping(address => uint256) public cart;
    uint256 public totalPrice;

    event PicturePurchased(address indexed buyer, uint256 price);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function buyPicture(uint256 picturePrice) public {
        require(picturePrice > 0, "Price must be greater than 0");
        cart[msg.sender] += picturePrice;
        totalPrice += picturePrice;
        emit PicturePurchased(msg.sender, picturePrice);
    }

    function pay() public payable  {
        require(msg.value >= totalPrice, "Insufficient funds sent");
        (bool success, )= owner.call{value:msg.value}("");
        require (success);

       
        cart[msg.sender] = 0; 
        totalPrice = 0;
    }
}
