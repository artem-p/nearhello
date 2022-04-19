import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import * as nearApi from 'near-api-js';
import { Form, InputGroup, FormControl, Button, Placeholder } from 'react-bootstrap';


import './App.css';

function App() {
  const CONTRACT_NAME = 'nearspring-nft.artyom-p.testnet'

  const { connect } = nearApi;

  const testnet_config = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    deps: {}
  };

  let near;

  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Nearspring NFT Mint</h1>
      </header>

      <main>
      </main>
    </div>
  );
}

export default App;
