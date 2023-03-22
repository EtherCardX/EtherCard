import * as wagmiChains from "@wagmi/core/chains";

import { base, taiko } from "./src/domain/chain";
import { headerSyncABI, signalServiceABI } from "./src/abi";

import { Abi } from "abitype";
import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";

const chains = { ...wagmiChains, base, taiko };

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    hardhat({
      project: "../hardhat",
    }),
  ],
});
