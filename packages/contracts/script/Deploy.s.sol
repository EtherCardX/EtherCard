// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import {Script} from "forge-std/Script.sol";
import {EtherCard} from "../src/EtherCard.sol";

contract Deploy is Script {
    address internal deployer;
    BaseAccount internal baseAccount;

    function setUp() public virtual {
        (deployer,) = deriveRememberKey(vm.envString("MNEMONIC"), 0);
    }

    function run() public {
        vm.startBroadcast(deployer);
        baseAccount = new EtherCard();
        vm.stopBroadcast();
    }
}
