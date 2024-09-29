'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect, useCallback } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TentacleBackground from '../components/TentacleBackground';
import ProjectTile from '../components/ProjectTile';

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const [isSaving, setIsSaving] = useState(false);
  const [userSaved, setUserSaved] = useState(false);

  const saveUser = useCallback(async (address: string) => {
    if (isSaving || userSaved) return;
    setIsSaving(true);
    console.log('Saving user with address:', address);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();
      console.log('API response:', data);
      if (data.success) {
        console.log('User saved successfully');
        setUserSaved(true);
      } else {
        console.error('Failed to save user');
      }
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, userSaved]);

  useEffect(() => {
    if (isConnected && address && !userSaved && !isSaving) {
      console.log('Wallet connected, attempting to save user');
      saveUser(address);
    }
  }, [isConnected, address, userSaved, isSaving, saveUser]);
  const projects = [
    { id: 1, title: 'Explore', link: '/projects/zora-explore' },
    { id: 2, title: 'Create', link: '/projects/zora-create' },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 relative overflow-hidden">
      <TentacleBackground />
      <div className="absolute top-4 right-4 z-20">
        <ConnectButton />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center mb-12"
      >
        <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg">
          jello world
        </h1>
        <p className="text-xl text-purple-200 mb-8">
          Connect your wallet and explore amazing projects
        </p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex justify-center items-center gap-8 z-10"
      >
        {projects.map((project) => (
          <Link key={project.id} href={project.link} passHref>
            <ProjectTile project={project} />
          </Link>
        ))}
      </motion.div>
    </main>
  );
}