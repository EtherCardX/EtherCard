// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.12;

/* solhint-disable avoid-low-level-calls */
/* solhint-disable no-inline-assembly */
/* solhint-disable reason-string */

import "./BaseAccount.sol";
import "./Verifier.sol";
import "hardhat/console.sol";

/**
 * Basic account implementation.
 * this contract provides the basic logic for implementing the IAccount interface  - validateUserOp
 * specific account implementation should inherit it and provide the account-specific logic
 */
contract EtherCard is BaseAccount, Verifier {
    using UserOperationLib for UserOperation;


    uint256 private _nonce;
    address private _owner;
    IEntryPoint private _entryPoint;

    constructor(IEntryPoint __entryPoint) {
        _entryPoint = __entryPoint;
        _owner = msg.sender;
    }

     /// @inheritdoc BaseAccount
    function nonce() public view override returns (uint256) {
        return _nonce;
    }

     /// @inheritdoc BaseAccount
    function entryPoint() public view override returns (IEntryPoint) {
        return _entryPoint;
    }

    /**
     * @dev Require that the caller is the owner or the entryPoint.
     */
    function _requireFromEntryPointOrOwner() internal view {
        require(msg.sender == address(entryPoint()) || msg.sender == _owner, "account: not Owner or EntryPoint");
    }

    /**
     * @dev Set the entryPoint.
     * @param receiver The address of the receiver
     * @param value The amount of ether to transfer
     * @param proof ZK Proof
     */ 
    function transferTo(address payable receiver, uint256 value, Proof calldata proof) external {
        // _requireFromEntryPointOrOwner();
        _validateProof(proof);
        receiver.transfer(value);
    }


    /**
     * @notice Deposit ETH to the contract
     */
    function deposit() external payable {
    }

    /**
     * Validate user's signature and nonce.
     * subclass doesn't need to override this method. Instead, it should override the specific internal validation methods.
     */
    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
    external override virtual returns (uint256 validationData) {
        _requireFromEntryPoint();
        validationData = _validateSignature(userOp, userOpHash);
        if (userOp.initCode.length == 0) {
            _validateAndUpdateNonce(userOp);
        }
        _payPrefund(missingAccountFunds);
    }

    /**
     * ensure the request comes from thes known entrypoint.
     */
    function _requireFromEntryPoint() internal override view {
        require(msg.sender == address(entryPoint()), "account: not from EntryPoint");
    }

    /**
     * @dev Will not be using this, see _validateProof
     */
    function _validateSignature(UserOperation calldata userOp, bytes32 userOpHash)
    internal override returns (uint256 validationData) {
        return 0;
    }

    /**
     * @dev Validate zkProof to execute transaction
     * @param proof ZK Proof
     */
    function _validateProof(Proof calldata proof) view
    internal returns (uint256 validationData) {
        uint[] memory testInput;
        validationData = verify(testInput,proof);
        console.log(validationData);
        require(validationData == 0, "account: invalid proof");

    }


    /**
     * validate the current nonce matches the UserOperation nonce.
     * then it should update the account's state to prevent replay of this UserOperation.
     * called only if initCode is empty (since "nonce" field is used as "salt" on account creation)
     * @param userOp the op to validate.
     */
    function _validateAndUpdateNonce(UserOperation calldata userOp) internal override {
        require(_nonce++ == userOp.nonce, "account: invalid nonce");
    }

}