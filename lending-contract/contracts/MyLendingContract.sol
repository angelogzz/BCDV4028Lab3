// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyLendingContract {
    mapping(address => uint256) public balances;

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        balances[msg.sender] += amount;
    }

    function borrow(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(balances[msg.sender] >= amount, "Not enough balance to borrow");
        balances[msg.sender] -= amount;
    }
}