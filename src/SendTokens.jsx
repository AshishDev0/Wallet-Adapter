import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export function SendTokens() {
    const wallet = useWallet();
    const { connection } = useConnection();

    async function sendTokens() {
        let to = document.getElementById('transfer-to').value;
        let amount = document.getElementById('transfer-amount').value;

        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL
        }))

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to)
    }

    return (
        <div>
            <input type="text" id="transfer-to" placeholder="To" />
            <input type="text" id="transfer-amount" placeholder="Amount" />
            <button onClick={sendTokens}>Send</button>
        </div>
    )
}