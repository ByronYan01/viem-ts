import dotenv from "dotenv";
import {
  Hex,
  http,
  createWalletClient,
  publicActions,
  getContract,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import abi from "../artifacts/contracts_Fun_sol_Fun.abi.json";
import { bin } from "../artifacts/contracts_Fun_sol_Fun.bin.json";
dotenv.config();

const API_URL = process.env.API_URL;
const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey as Hex);

console.log(account);
(async () => {
  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
    // 扩展钱包客户端 --- 增加公共客户端能力（也可以再 createPublicClient 实例使用）
  }).extend(publicActions);

  // 部署合约也是交易的一种，返回交易hash
  const txHash = await client.deployContract({
    abi,
    bytecode: `0x${bin}`,
    args: [127n],
  });

  console.log(txHash);
  // const transactionReceipt = await client.getTransactionReceipt({
  //   hash: txHash,
  // });
  // 等待交易确认
  const transactionReceipt = await client.waitForTransactionReceipt({
    hash: txHash,
    timeout: 120000, // 120秒超时
  });

  console.log(transactionReceipt);
  const { contractAddress } = transactionReceipt;

  // 获取合约实例, 用于读写合约
  const contract = getContract({
    address: contractAddress as Hex,
    abi,
    client,
  });

  // 方法一
  // const x = await client.readContract({
  //   abi,
  //   address: contractAddress as Hex,
  //   functionName: "x",
  // });
  // console.log(x);
  // 方法二
  // getStorageAt --- 读取合约指定插槽的存储
  // console.log(await client.getStorageAt({
  //   address: contractAddress as Hex,
  //   slot: "0x0",
  // }));
  // 方法三
  console.log(await contract.read.x());

  // const changeTxHash = await client.writeContract({
  //   abi,
  //   address: contractAddress as Hex,
  //   functionName: "changeX",
  //   args: [132n],
  // });
  const changeTxHash = await contract.write.changeX([132n]);
  // 等待交易确认 --- 待优化，重复代码太多
  const transactionReceipt2 = await client.waitForTransactionReceipt({
    hash: changeTxHash,
    timeout: 120000, // 120秒超时
  });
  if (transactionReceipt2) {
    console.log(await contract.read.x());
  }

  // 不可以
  // await contract.write.changeX([132n], {
  //   confirmations: 1, // 等待1个区块确认
  // });
  // console.log(await contract.read.x());
})();
