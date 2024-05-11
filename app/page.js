"use client";
import dynamic from 'next/dynamic';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import styles from './page.module.css'

export default function Home() {
    const WalletMultiButtonDynamic = dynamic(
        async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
        { ssr: false }
    );

    const LAMPORTS_PER_SOL = 1000000000;

    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        if (publicKey) {
            (async function getBalanceEvery10Seconds() {
                const newBalance = await connection.getBalance(publicKey);
                setBalance(newBalance / LAMPORTS_PER_SOL);
                setTimeout(getBalanceEvery10Seconds, 10000);
            })();
        }
    }, [publicKey, connection, balance]);
    

    const getSignatureOnClick = async (e) => {
        e.preventDefault()
        try {
            if (!publicKey) {
                throw new Error("Connect Wallet");
            }
            const [latestBlockhash, signature] = await Promise.all([
                connection.getLatestBlockhash(),
                connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL),
            ]);
            const sigResult = await connection.confirmTransaction(
                { signature, ...latestBlockhash },
                "Signed",
            );
            if (sigResult) {
                alert("Sign was confirmed!");
            }
        } catch (err) {
            alert("Your signature is not yet valid", err);
        }
    };

    return (
        <main className={styles.mainContainer}>
            <WalletMultiButtonDynamic />
            {publicKey ? (
                <div className={styles.fadeIn}>
                    <h1>Your Public key is: {publicKey.toString()}</h1>
                    <h2>Your Balance is: {balance.toFixed(2)} SOL</h2>
                    <button className={styles.button} onClick={getSignatureOnClick}>Sign Transaction</button>
                </div>
            ) : (
                <h1>Wallet is not connected</h1>
            )}
        </main>
    );
}
