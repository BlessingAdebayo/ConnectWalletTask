"use client";

import React, { useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import {
    PhantomWalletAdapter,
    AlphaWalletAdapter,
    AvanaWalletAdapter,
    BitKeepWalletAdapter,
    BitpieWalletAdapter,
    CloverWalletAdapter,
    Coin98WalletAdapter,
    CoinbaseWalletAdapter,
    CoinhubWalletAdapter,
    FractalWalletAdapter,
    HuobiWalletAdapter,
    HyperPayWalletAdapter,
    KeystoneWalletAdapter,
    KrystalWalletAdapter,
    LedgerWalletAdapter,
    MathWalletAdapter,
    NekoWalletAdapter,
    NightlyWalletAdapter,
    NufiWalletAdapter,
    OntoWalletAdapter,
    ParticleAdapter,
    SafePalWalletAdapter,
    SaifuWalletAdapter,
    SalmonWalletAdapter,
    SkyWalletAdapter,
    SolflareWalletAdapter,
    SolongWalletAdapter,
    SpotWalletAdapter,
    TokenaryWalletAdapter,
    TokenPocketWalletAdapter,
    TorusWalletAdapter,
    TrezorWalletAdapter,
    WalletConnectWalletAdapter,
    XDEFIWalletAdapter
} from "@solana/wallet-adapter-wallets";

require("@solana/wallet-adapter-react-ui/styles.css");

export default function AppWalletProvider({ children }) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new AlphaWalletAdapter(),
            new AvanaWalletAdapter(),
            new BitKeepWalletAdapter(),
            new BitpieWalletAdapter(),
            new CloverWalletAdapter(),
            new Coin98WalletAdapter(),
            new CoinbaseWalletAdapter(),
            new CoinhubWalletAdapter(),
            new FractalWalletAdapter(),
            new HuobiWalletAdapter(),
            new HyperPayWalletAdapter(),
            new KeystoneWalletAdapter(),
            new KrystalWalletAdapter(),
            new LedgerWalletAdapter(),
            new MathWalletAdapter(),
            new NekoWalletAdapter(),
            new NightlyWalletAdapter(),
            new NufiWalletAdapter(),
            new OntoWalletAdapter(),
            new ParticleAdapter(),
            new SafePalWalletAdapter(),
            new SaifuWalletAdapter(),
            new SalmonWalletAdapter(),
            new SkyWalletAdapter(),
            new SolflareWalletAdapter(),
            new SolongWalletAdapter(),
            new SpotWalletAdapter(),
            new TokenaryWalletAdapter(),
            new TokenPocketWalletAdapter(),
            new TorusWalletAdapter(),
            new TrezorWalletAdapter(),
            new WalletConnectWalletAdapter(),
            new XDEFIWalletAdapter(),
        ],
        [network],
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
