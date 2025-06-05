"use client";

import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x6f775fD7a3299810666Fa3B4374Efcd987fD96c9";

const ABI = ["function mint(string memory tokenURI) public"];

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function MintPage() {
  const [wallet, setWallet] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("MetaMask non détecté !");
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWallet(address);
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au wallet");
    }
  };

  const handleMint = async () => {
    if (!wallet || !tokenURI) return alert("URI manquante !");
    setStatus("⏳ Mint en cours...");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.mint(tokenURI);
      await tx.wait();
      setTxHash(tx.hash);
      setStatus("✅ NFT Minté !");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Erreur : " + (err.message || "Inconnue"));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎴 Mint Pokuman NFT
      </h1>

      <div className="max-w-xl mx-auto space-y-4">
        <button
          onClick={connectWallet}
          className="bg-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-700"
        >
          {wallet
            ? `✅ ${wallet.slice(0, 6)}...${wallet.slice(-4)}`
            : "🔌 Connect Wallet"}
        </button>

        <input
          type="text"
          placeholder="https://gateway.pinata.cloud/ipfs/..."
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-600"
        />

        <button
          onClick={handleMint}
          className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-xl font-semibold w-full"
        >
          🚀 MINT NFT
        </button>

        {status && <p className="mt-4 text-sm text-emerald-300">{status}</p>}
        {txHash && (
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline block mt-2"
          >
            🔍 Voir la transaction
          </a>
        )}
      </div>
    </div>
  );
}
