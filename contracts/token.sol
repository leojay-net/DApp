// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract tokenContract {

    struct Token{
        string tokenName;
        string tokenSymbol;
        uint totalSupply;
    }
    mapping(address => Token) public orgTokens;

    function createToken(address _orgAddress, string memory _tokenName, string memory _tokenSymbol, uint _totalSupply) public returns(bool){
        Token storage newToken = orgTokens[_orgAddress];
        newToken.tokenName = _tokenName;
        newToken.tokenSymbol = _tokenSymbol;
        newToken.totalSupply = _totalSupply;
        
        return true;
        
    }


    
}
