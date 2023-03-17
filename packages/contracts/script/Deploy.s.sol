// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import {Script} from "forge-std/Script.sol";
import {EtherCard} from "../src/EtherCard.sol";
import {EntryPoint} from "../src/EntryPoint.sol";

contract Deploy is Script {
    address internal deployer;
    EtherCard internal account;
    EntryPoint internal entryPoint;

    function setUp() public virtual {
        (deployer,) = deriveRememberKey(vm.envString("MNEMONIC"), 0);
    }

    function run() public {
        vm.startBroadcast(deployer);
        entryPoint = new EntryPoint();
        account = new EtherCard(entryPoint);
        vm.stopBroadcast();
    }
}
