"use client";

import { createPublicClient, custom, getContract, Address } from "viem";
import { sepolia } from "viem/chains";
import { usdcAbi } from "./abi2";

const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

export default function HomeworkComponent() {
  async function buttonClick() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ethereum = (window as any).ethereum;
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: custom(ethereum),
    });
    const contract = getContract({
      address: USDC_ADDRESS as Address,
      abi: usdcAbi,
      client: publicClient,
    });
    const name = await contract.read.name();
    const symbol = await contract.read.symbol();
    const totalSupply = await contract.read.totalSupply();
    alert(`Name: ${name}\nSymbol: ${symbol}\nTotal supply: ${totalSupply}`);
  }

  return (
    <div className="card">
      <h2>USDC Reader (Homework)</h2>
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center bg-black text-white"
        onClick={buttonClick}
      >
        Read USDC Info
      </button>
    </div>
  );
}