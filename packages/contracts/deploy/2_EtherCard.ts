import 'dotenv/config';

import { ethers } from 'hardhat';

module.exports = async ({ getNamedAccounts, deployments, getChainId }: any) => {
  const { deploy, read, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // Chain Dependent Settings
  // if (chainId == '25') {
  // } else if (chainId == '338') {
  // } else if (chainId == '31337') {
  // } else {
  //   return;
  // }

  // Get Entry Point Contract
  const entryPoint = await deployments.get('EntryPoint');

  let contract = await deploy('EtherCard', {
    from: deployer,
    log: true,
    args: [entryPoint.address],
  });

  // deposit eth to address

  contract = await ethers.getContractAt('EtherCard', contract.address);
  let tx = await (await contract.deposit({ value: ethers.utils.parseEther('0.1') })).wait();
  console.log('🚀 | module.exports= | tx:', tx);
};

module.exports.tags = ['EtherCard'];
