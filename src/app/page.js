"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import CountUp from "react-countup";
import { bs58 } from 'bs58';
import { Message } from "@solana/web3.js";

import { motion } from "framer-motion";
import Image from 'next/image';

const FloatingSperm = ({ delay = 0 }) => (
  <motion.div
    className="fixed w-12 h-12 opacity-20"
    initial={{ x: -100, y: Math.random() * 500 }}
    animate={{
      x: window.innerWidth + 100,
      y: Math.random() * 500,
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}>
      <Image
        src={"https://cdn-icons-png.flaticon.com/512/5306/5306071.png"}
              alt="floating sperm"
      className="w-full h-full"
      width={40}
      height={40}
      />
  </motion.div>
);

const SpermMascot = () => {
  return (
    <motion.div
      className="fixed bottom-4 right-4 w-24 h-24 md:w-32 md:h-32 z-50 cursor-pointer"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ scale: 1.1 }}
    >
            <Image
        src={"https://cdn-icons-png.flaticon.com/512/5306/5306071.png"}
              alt="floating sperm"
      className="w-full h-full"
      width={100}
      height={100}
      />
    </motion.div>
  );
}

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, signMessage } = useWallet();
  const [signature, setSignature] = useState('');
  const [donorStats, setDonorStats] = useState({
    totalDonations: 0,
    qualityScore: 0,
    earningsSOL: 0,
  });

  const handleSignMessage = async () => {
    if (!publicKey || !signMessage) {
      console.error('Wallet not connected!');
      return;
    }
    try {
      const message = new TextEncoder().encode(`Verify Donor: ${publicKey.toBase58()}`);
      const signedMessage = await signMessage(message);
      setSignature(bs58.encode(signedMessage));
    } catch (error) {
      console.error('Error signing message:', error);
    }
  };

  const transferSol = async () => {
    if (!publicKey) return;
    try {
      const recipient = new web3.PublicKey('CNWU1VWBYqaGgeAQsfJzuwEsEhX6uNsGzbS63hyk8os');
      const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipient,
          lamports: web3.LAMPORTS_PER_SOL * 0.1 // Transfer 0.1 SOL
        })
      );
      const signature = await window.solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature, 'confirmed');
      alert('Transfer successful!');
    } catch (error) {
      console.error('Error:', error);
      alert('Transfer failed!');
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-blue-100 to-purple-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-purple/[0.02] bg-[size:20px_20px]" />
      {[...Array(8)].map((_, i) => (
        <FloatingSperm key={i} delay={i * 2} />
      ))}

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        {/* Hero Section */}
        <div className="min-h-[60vh] flex flex-col items-center justify-center mb-20">
          <div className="text-center space-y-6">
            <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Next-Gen Fertility Solutions
            </h1>
            <p className="text-xl text-purple-700 max-w-2xl mx-auto">
              Revolutionizing fertility with blockchain technology on Solana
            </p>
            <div className="flex gap-4 justify-center">
              <WalletMultiButton className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700" />
              {publicKey && (
                <button onClick={handleSignMessage} className="bg-purple-300 font-bold text-purple-800 px-8 py-3 rounded-xl hover:bg-purple-700 hover:text-white">
                  Verify Identity
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { title: "TVL", value: 1500000, prefix: "$" },
            { title: "Active Donors", value: 2456 },
            { title: "Success Rate", value: 98, suffix: "%" },
            { title: "Total SOL Earned", value: 15678, suffix: " SOL" }
          ].map((stat, i) => (
            <div key={i} className="glassmorphism p-6 rounded-2xl">
              <h3 className="text-purple-600 text-lg">{stat.title}</h3>
              <CountUp 
                end={stat.value} 
                prefix={stat.prefix} 
                suffix={stat.suffix} 
                separator="," 
                className="text-3xl font-bold text-purple-800" 
              />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Donor Dashboard */}
          <div className="glassmorphism p-8 rounded-2xl h-full">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">Donor Dashboard</h2>
            {publicKey ? (
              <div className="space-y-4">
                <div className="bg-purple-50/50 p-4 rounded-xl">
                  <p className="text-sm text-purple-600">Wallet</p>
                  <p className="text-purple-900 font-mono truncate">{publicKey.toBase58()}</p>
                </div>
                <div className="bg-purple-50/50 p-4 rounded-xl">
                  <p className="text-sm text-purple-600">Signature</p>
                  <p className="text-purple-900 font-mono truncate">{signature || 'Not verified'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50/50 p-4 rounded-xl">
                    <p className="text-sm text-purple-600">Donations</p>
                    <p className="text-2xl font-bold text-purple-900">{donorStats.totalDonations}</p>
                  </div>
                  <div className="bg-purple-50/50 p-4 rounded-xl">
                    <p className="text-sm text-purple-600">Earnings</p>
                    <p className="text-2xl font-bold text-purple-900">{donorStats.earningsSOL} SOL</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-purple-600">
                Connect wallet to view stats
              </div>
            )}
          </div>

          {/* Investment Pool */}
          <div className="glassmorphism p-8 rounded-2xl h-full">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">Investment Pool</h2>
            {publicKey ? (
              <div className="space-y-4">
                <div className="bg-purple-50/50 p-4 rounded-xl">
                  <p className="text-sm text-purple-600">Current APY</p>
                  <p className="text-2xl font-bold text-purple-900">12.5%</p>
                </div>
                <button 
                  onClick={() => transferSol()} 
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
                >
                  Stake SOL
                </button>
              </div>
            ) : (
              <div className="text-center text-purple-600">
                Connect wallet to stake
              </div>
            )}
          </div>

        </div>
          {/* Submit Sample */}
          <div className="glassmorphism p-8 rounded-2xl h-full">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">Submit Sample</h2>
            {publicKey ? (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="bg-purple-50/50 p-4 rounded-xl">
                  <input
                    type="text"
                    placeholder="Sample ID"
                    className="w-full p-2 rounded-xl bg-purple-50 border border-purple-200"
                  />
                </div>
                <div className="bg-purple-50/50 p-4 rounded-xl">
                  <input
                    type="number"
                    placeholder="Quality Score (1-10)"
                    min="1"
                    max="10"
                    className="w-full p-2 rounded-xl bg-purple-50 border border-purple-200"
                  />
                </div>
                <button 
                  onClick={() => signMessage()}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
                >
                  Submit to Blockchain
                </button>
              </form>
            ) : (
              <div className="text-center text-purple-600">
                Connect wallet to submit sample
              </div>
            )}
          </div>
      <SpermMascot />
    </div>
    </main>
  );
}
