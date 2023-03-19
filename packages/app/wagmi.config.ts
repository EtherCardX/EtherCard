import * as wagmiChains from "@wagmi/core/chains";

import { base, taiko } from "./src/domain/chain";
import { headerSyncABI, signalServiceABI } from "./src/abi";

import { Abi } from "abitype";
import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";

const chains = { ...wagmiChains, base, taiko };

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "SignalService",
      abi: signalServiceABI as Abi,
      address: {
        [chains.sepolia.id]: "0xe40D5bedD2f3d9F288CC12c69463bC43c77488d6",
        [chains.taiko.id]: "0x191E3D5a00d54799D7da6c04d56b19938304c312",
      },
    },
    {
      name: "TaikoL2",
      abi: headerSyncABI as Abi, // only using headerSyncABI for now
      address: {
        [chains.taiko.id]: "0x0000777700000000000000000000000000000001",
      },
    },
  ],
  plugins: [
    hardhat({
      project: "../hardhat",
    }),
  ],
});
