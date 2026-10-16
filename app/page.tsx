"use client";

import WalletComponent from "./walletComponent";
import TransactionComponent from "./transactionComponent";
import TokenComponent from "./tokenComponent";
import HomeworkComponent from "./homeworkComponent";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <WalletComponent />
        <TransactionComponent />
        <TokenComponent />
        <HomeworkComponent />
      </div>
    </main>
  );
}