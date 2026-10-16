import { createWalletClient, createPublicClient, custom, http } from "viem";
import { sepolia } from "viem/chains";
import "viem/window";

export function ConnectPublicClient() {
  let transport;
  if (window.ethereum) {
    transport = custom(window.ethereum);
  } else {
    transport = http();
  }

  const publicClient = createPublicClient({
    chain: sepolia,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transport: transport as any,
  });

  return publicClient;
}

export function ConnectWalletClient() {
  let transport;
  if (window.ethereum) {
    // EIP-1193 Ethereum Provider JavaScript API
    transport = custom(window.ethereum);
  } else {
    const errorMessage =
      "Web3 wallet is not installed. Please install MetaMask.";
    throw new Error(errorMessage);
  }

  const walletClient = createWalletClient({
    chain: sepolia,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transport: transport as any,
  });

  return walletClient;
}