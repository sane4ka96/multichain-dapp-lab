"use client";

import { useState } from "react";
import { createPublicClient, custom, getContract, Address } from "viem";
import { sepolia } from "viem/chains";
import { contractAbi } from "./abi";

export default function TokenComponent() {
  const [contractAddress, setContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setValue = (setter: any) => (evt: any) => setter(evt.target.value);

  async function buttonClick() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ethereum = (window as any).ethereum;

      const publicClient = createPublicClient({
        chain: sepolia,
        transport: custom(ethereum),
      });

      const checkedAddress = contractAddress as Address;

      const contract = getContract({
        address: checkedAddress,
        abi: contractAbi,
        client: publicClient,
      });

      console.log("Connected to Contract: ", contract);

      const symbol = await contract.read.symbol();
      const name = await contract.read.name();

      console.log(`Symbol: ${symbol}\nName: ${name}`);

      const token_id = BigInt(tokenId);
      const owner = await contract.read.ownerOf([token_id]);

      alert(
        `Symbol: ${symbol}\nName: ${name}\nOwner of token_id = ${tokenId}: ${owner}`
      );
    } catch (error) {
      alert(`Transaction failed: ${error}`);
    }
  }

  return (
    <div className="card">
      <label>
        Address:
        <input
          placeholder="Smart Contract Instance"
          value={contractAddress}
          onChange={setValue(setContractAddress)}
        ></input>
      </label>
      <br />
      <label>
        Token Id:
        <input
          placeholder="1"
          value={tokenId}
          onChange={setValue(setTokenId)}
        ></input>
      </label>
      <button
        className="px-8 py-2 rounded-md flex flex-row items-center justify-center bg-black text-white"
        onClick={buttonClick}
      >
        Token Info
      </button>
    </div>
  );
}