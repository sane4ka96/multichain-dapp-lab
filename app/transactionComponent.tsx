"use client";

import { useState } from "react";
import { parseGwei } from "viem";

export default function TransactionComponent() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setValue = (setter: any) => (evt: any) => setter(evt.target.value);

  async function handleClick() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ethereum = (window as any).ethereum;

      // Принудительно переключаем MetaMask на Sepolia
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }],
        });
      } catch (switchError) {
        console.log("Switch chain error:", switchError);
      }

      const accounts: string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];

      const hash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: address,
            to: recipient,
            value: "0x" + parseGwei(amount).toString(16),
          },
        ],
      });

      alert(`Transaction successful. Transaction Hash: ${hash}`);
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  return (
    <div className="card">
      <label>
        Amount:
        <input
          placeholder="GWei"
          value={amount}
          onChange={setValue(setAmount)}
        ></input>
      </label>
      <br />
      <label>
        Recipient:
        <input
          placeholder="Address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center bg-black text-white"
        onClick={handleClick}
      >
        Send Transaction
      </button>
    </div>
  );
}