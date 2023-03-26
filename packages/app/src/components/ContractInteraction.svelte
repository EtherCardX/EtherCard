<script lang="ts">
  // imports
  import { readContract, prepareWriteContract, writeContract } from "@wagmi/core";
  import { etherCardABI, etherCardAddress } from "../generated";
  import { foundry } from "@wagmi/core/chains";
  import { BigNumber, ethers } from "ethers";

  interface Proof {
    a: { X: BigNumber; Y: BigNumber };
    b: { X: [BigNumber, BigNumber]; Y: [BigNumber, BigNumber] };
    c: { X: BigNumber; Y: BigNumber };
  }
  // variables
  let amount = "";
  let messageFromContract = "";
  let proof: Proof = {
    a: { X: BigNumber.from(0), Y: BigNumber.from(0) },
    b: { X: [BigNumber.from(0), BigNumber.from(0)], Y: [BigNumber.from(0), BigNumber.from(0)] },
    c: { X: BigNumber.from(0), Y: BigNumber.from(0) },
  };

  // functions

  async function receiveETH() {
    const config = await prepareWriteContract({
      address: etherCardAddress[foundry.id],
      abi: etherCardABI,
      functionName: "transferTo",

      args: [
        "0x345B2978F0b2B0dB24c681AB476aB4faDA5a68b5",
        ethers.utils.parseEther("0.00001"),
        proof,
      ],
    });
    await writeContract(config);
  }
</script>
