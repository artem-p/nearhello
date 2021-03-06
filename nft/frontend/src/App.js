import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import * as nearApi from 'near-api-js';
import { Form, InputGroup, FormControl, Button, Placeholder } from 'react-bootstrap';
import BN from 'bn.js'

import './App.css';


//  near deploy --wasmFile res/non_fungible_token.wasm --accountId nft.artyom-p.testnet
//  near call nft.artyom-p.testnet new_default_meta '{"owner_id": "nft.artyom-p.testnet"}' --accountId nft.artyom-p.testnet

//  https://docs.near.org/docs/tutorials/contracts/nfts/minting-nft-frontend
//  https://docs.near.org/docs/tutorials/contracts/nfts/events


// todo
//  near call nft.artyom-p.testnet nft_mint '{"token_id": "3", "receiver_id": "'artyom-p.testnet'", "token_metadata": { "title": "Some Art", "description": "My NFT media", "media": "https://bafybeiaakj6irj7cqkte5cpknsjgh3a73c3rabb5iwbgfm2qynkvmc2pf4.ipfs.dweb.link/", "copies": 1}}' --accountId artyom-p.testnet --deposit 0.1
//  not working. works if --accountId nft.artyom-p.testnet

// todo ok got nft zero to hero


function App() {
  const APP_NAME = "Mint NFT"
  const CONTRACT_NAME = 'nft.artyom-p.testnet'
  const IMAGE_URL = 'https://bafybeiaakj6irj7cqkte5cpknsjgh3a73c3rabb5iwbgfm2qynkvmc2pf4.ipfs.dweb.link/'

  const [isSignIn, setIsSignIn] = useState(false)
  const { connect, keyStores, WalletConnection } = nearApi;

  const TESTNET_CONFIG = {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    deps: {}
  };

  let near;
  let wallet;
  let user;


  const signIn = () => {
    wallet.requestSignIn(
      CONTRACT_NAME,
      APP_NAME
    );
  };

  
  const signOut = () => {
    wallet.signOut();
    setIsSignIn(false)
  };


  useEffect(() => {
    const nearConnect = async() => {
      near = await connect(TESTNET_CONFIG);

      wallet = new WalletConnection(near);

      if (wallet.getAccountId()) {
        user = wallet.getAccountId()
        setIsSignIn(true)
      }
    }

    nearConnect()
  })

  
  const mint = async () => {
    if (isSignIn && wallet && user) {
      try {
        const account = await near.account(CONTRACT_NAME)

        const contract = new nearApi.Contract(
          wallet.account(),
          CONTRACT_NAME,
          {
            viewMethods: ["check_token"],
            changeMethods: ["nft_mint"],
            sender: wallet.account()
          }

        )

        await contract.nft_mint(
          {
            token_id: `${user}-hello-nft`,
            token_metadata: {
              title: "Flowers NFT",
              description: "Flowers - acrylic painting",
              media: IMAGE_URL,
            },

            receiver_id: user,
          },
          300000000000000,
          new BN("1000000000000000000000000"))
      } catch (error) {
        console.log(error)
      }
    }
  }

  
  return (
    <div className="app">
      <header className="app-header">
        <h1>NFT Mint</h1>
        <div className="login">
            { isSignIn
              ? <Button onClick={signOut}>Log out</Button>
              : <Button onClick={signIn}>Log in</Button>
            }
          </div>

          <div className='mint'>
            <Button disabled={!isSignIn} onClick={mint}>Mint</Button>
          </div>
      </header>

      <main>
      </main>
    </div>
  );
}

export default App;
