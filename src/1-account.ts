import dotenv from "dotenv";
import { createPublicClient, Hex, http, formatEther, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
dotenv.config();

const API_URL = process.env.API_URL;
const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey as Hex);

console.log(account);

(async () => {
  // 公共客户端 --- 只读
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  });
  // console.log(publicClient);
  const balance = await publicClient.getBalance({
    address: account.address,
  });

  // 用于格式化数字，将 wei 转换为 ether
  console.log(formatEther(balance));

  // 用于将数字转换为 wei
  console.log("parseEther('0.01')===", parseEther("0.01"));

  const tsCount = await publicClient.getTransactionCount({
    address: account.address,
  });

  console.log(tsCount);
})();
