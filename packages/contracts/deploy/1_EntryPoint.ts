import 'dotenv/config';

import { ethers } from 'hardhat';

module.exports = async ({ getNamedAccounts, deployments, getChainId }: any) => {
  const { deploy, read, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  let contract = await deploy('EntryPoint', {
    from: deployer,
    log: true,
    args: [],
  });
};

module.exports.tags = ['EntryPoint'];
