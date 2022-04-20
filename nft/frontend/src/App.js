import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import * as nearApi from 'near-api-js';
import { Form, InputGroup, FormControl, Button, Placeholder } from 'react-bootstrap';


import './App.css';

function App() {
  const CONTRACT_NAME = 'nearspring-nft.artyom-p.testnet'
  const APP_NAME = "Nearspring NFT"

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

  // todo https://docs.near.org/docs/api/naj-quick-reference#wallet
  // todo https://www.near-sdk.io/zero-to-hero/beginner/logging-in

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


  return (
    <div className="app">
      <header className="app-header">
        <h1>Nearspring NFT Mint</h1>
        <div id="login">
            { isSignIn
              ? <button onClick={signOut}>Log out</button>
              : <button onClick={signIn}>Log in</button>
            }
          </div>
      </header>

      <main>
      </main>
    </div>
  );
}

export default App;
