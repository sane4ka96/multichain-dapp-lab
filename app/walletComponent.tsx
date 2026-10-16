"use client";

import { useState } from "react";
import { createPublicClient, custom } from "viem";
import { sepolia } from "viem/chains";

export default function WalletComponent() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(BigInt(0));

  async function handleClick() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ethereum = (window as any).ethereum;

      // 1. Запрашиваем аккаунты напрямую у MetaMask
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const accounts: string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      setAddress(address);

      // 2. Создаём публичный клиент viem
      const publicClient = createPublicClient({
        chain: sepolia,
        transport: custom(ethereum),
      });

      // 3. Читаем баланс
      const balance = await publicClient.getBalance({
        address: address as `0x${string}`,
      });
      setBalance(balance);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  return (
    <div className="card">
      <Status address={address} balance={balance} />
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center bg-black text-white"
        onClick={handleClick}
      >
        <h1 className="mx-auto">Connect Wallet</h1>
      </button>
    </div>
  );
}

function Status({
  address,
  balance,
}: {
  address: string | null;
  balance: bigint;
}) {
  if (!address) {
    return (
      <div className="flex items-center">
        <div className="border bg-red-600 border-red-600 rounded-full w-4 h-4 mr-2"></div>
        <div>Disconnected</div>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full">
      <div className="border bg-green-500 border-green-500 rounded-full w-4 h-4 mr-2"></div>
      <div className="text-sm md:text-base">
        {address} <br /> <b>Balance:</b> {balance.toString()} <b>Wei</b>
      </div>
    </div>
  );
}