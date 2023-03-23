import { config, ethers, hardhatArguments } from 'hardhat';

async function main() {
  const chains = ['mumbai', 'goerli', 'gnosis', 'optimism_testnet', 'taiko_testnet', 'scroll_testnet'];
  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();
  console.log(`Balances for ${address}`);

  let output = {};

  let results = await Promise.allSettled(
    chains.map((chain) => {
      const provider = new ethers.providers.JsonRpcProvider(config.networks[chain].url);
      return provider.getBalance(address);
    })
  );
  let index = 0;
  for (const result of results) {
    // @ts-ignore
    output[chains[index]] = ethers.utils.formatEther(result.value);
    index++;
  }
  console.table(output);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
