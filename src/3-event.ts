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
dotenv.config();

const API_URL = process.env.API_URL;
const privateKey = process.env.PRIVATE_KEY;
const account = privateKeyToAccount(privateKey as Hex);
const contractAddress = "0x215fd7993ebb5570e36b600ddda6618aad48a992";

(async () => {
  // 其实我们读取日志信息，只需要一个公共客户端即可；但是后续我们会执行写操作，所以需要一个钱包客户端
  const client = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  });

  const contract = await getContract({
    address: contractAddress,
    abi,
    client,
  });

  // 监听事件，支持过滤
  await contract.watchEvent.ChangedX({
    onLogs: (logs) => console.log(logs),
  });

  setTimeout(async () => {
    await contract.write.changeX([66n]);
  }, 3000);
})();
