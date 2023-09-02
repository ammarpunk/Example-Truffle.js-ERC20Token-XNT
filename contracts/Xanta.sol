// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";



// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract Xanta {
using SafeMath for uint;
string public name = "Xanta"; 
string public symbole = "XNT"; 
uint256 public decimals = 5; 
uint256 public totalSupply;
mapping(address => uint256) public balanceOf;
address private owner;

constructor(){
    owner = msg.sender;
    totalSupply = (100 * (10 ** decimals));
    balanceOf[owner] = totalSupply;
}
event Transfer(address indexed _from, address indexed _to, uint256 _value);
function transfer(address _to, uint256 _value) public returns(bool success){
    require(_to != address(0) && balanceOf[owner] >= _value);
    balanceOf[owner] = balanceOf[owner].sub(_value);
    balanceOf[_to] = balanceOf[_to].add(_value);
    success = true;
    emit Transfer(owner,_to,_value);
}




}

