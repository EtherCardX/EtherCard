import 'dotenv/config';

import { BigNumber, BigNumberish } from 'ethers';
import { deployments, ethers } from 'hardhat';

import { EntryPoint } from '../typechain/EntryPoint';
import { EtherCard } from '../typechain/EtherCard';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Verifier } from '../../../../playground/typechain/Verifier';
import { expect } from 'chai';

let owner: SignerWithAddress;
let user1: SignerWithAddress;
let entryPoint: EntryPoint;
let etherCard: EtherCard;

// Constants
let ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

type SignatureAndNonce = {
  signature: string;
  nonce: string;
};

// Signing Function
async function getSignatureAndNonce(
  userAddress: string,
  whitelistPhase: BigNumber,
  SIGNER_PK: string
): Promise<SignatureAndNonce> {
  const wallet = new ethers.Wallet(SIGNER_PK);
  // const nonce = ethers.utils.randomBytes(32);
  const nonce = ethers.constants.AddressZero;
  const msgHash = ethers.utils.solidityKeccak256(
    ['address', 'bytes', 'uint256'],
    [userAddress, nonce, whitelistPhase.toHexString()]
  );
  const signature = await wallet.signMessage(ethers.utils.arrayify(msgHash));
  return { signature, nonce: ethers.utils.hexlify(nonce) };
}

async function getContract(contractName: string) {
  return await ethers.getContractAt(contractName, (await deployments.get(contractName)).address);
}

describe('EtherCard', function () {
  describe('Transfer', function () {
    beforeEach(async function () {
      // Get Signers
      [owner, user1] = await ethers.getSigners();

      // Deploy Contracts
      await deployments.fixture(['EntryPoint', 'EtherCard']);

      // Get Contracts
      entryPoint = (await getContract('EntryPoint')) as EntryPoint;
      etherCard = (await getContract('EtherCard')) as EtherCard;

      // Top Up ETH to etherCard
      await etherCard.deposit({ value: ethers.utils.parseEther('2') });
      expect(await ethers.provider.getBalance(etherCard.address)).to.equal(ethers.utils.parseEther('2'));
    });

    // Should execute transaction if valid proof given
    it('Should execute transaction if valid proof given', async function () {
      expect(await ethers.provider.getBalance(etherCard.address)).to.equal(ethers.utils.parseEther('2'));

      let proof: Verifier.ProofStruct = {
        a: {
          X: '0x0fe45bd30c499f0aa5cb67879b66df200b6805f578965ef193f6df852f211c1c',
          Y: '0x22dbc00882591e7269fda8a277483e26b39369451b1e76ef23e18c14f1025e93',
        },
        b: {
          X: [
            '0x21fb3cabbf98991d2783219d5851300400c9057ef80be1c0482ad2f0bd30b946',
            '0x27be7cc0f84fcdfe2722f77caad94940ac3d09ebe2935c1e7bb521eb08c6f8df',
          ],
          Y: [
            '0x11a2b80b45ef08019bf2d163e89b36acbc96c05a9ef9d64768fa804cae5f37ad',
            '0x06921f0aa38875ceabef76e03a0c8ccb63908dc75e95a9a7a9285d2d09bb889a',
          ],
        },
        c: {
          X: '0x2d2959333a4d831a68304df8b842a9be4cebf5922eb726aa7251f511f1112437',
          Y: '0x238a76759606eafbbb0193bd27ebe559d0532510006a91b7934dfecaf6631239',
        },
      };
      // Execute transferTo
      await etherCard.transferTo(user1.address, ethers.utils.parseEther('1'), proof);

      // Expect reciepient to receive 1 ETH
      expect(await ethers.provider.getBalance(etherCard.address)).to.equal(ethers.utils.parseEther('1'));
    });

    it('Should revert transaction if invalid proof given', async function () {
      expect(await ethers.provider.getBalance(etherCard.address)).to.equal(ethers.utils.parseEther('2'));

      let proof: Verifier.ProofStruct = {
        a: {
          X: '0x0fe45bd30c499f0aa5cb67879b66df200b6805f578965ef193f6df852f211c1c',
          Y: '0x22dbc00882591e7269fda8a277483e26b39369451b1e76ef23e18c14f1025e93',
        },
        b: {
          X: [
            '0x21fb3cabbf98991d2783219d5851300400c9057ef80be1c0482ad2f0bd30b946',
            '0x27be7cc0f84fcdfe2722f77caad94940ac3d09ebe2935c1e7bb521eb08c6f8df',
          ],
          Y: [
            '0x11a2b80b45ef08019bf2d163e89b36acbc96c05a9ef9d64768fa804cae5f37ad',
            '0x06921f0aa38875ceabef76e03a0c8ccb63908dc75e95a9a7a9285d2d09bb889a',
          ],
        },
        c: {
          X: '0x2d2959333a4d831a68304df8b842a9be4cebf5922eb726aa7251f511f1112437',
          Y: '0x238a76759606eafbbb0193bd27ebe559d0532510006a91b7934dfecaf6631238',
        },
      };
      // Execute transferTo
      await expect(etherCard.transferTo(user1.address, ethers.utils.parseEther('1'), proof)).to.be.revertedWith(
        'account: invalid proof'
      );
    });
  });
});
