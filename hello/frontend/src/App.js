import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import * as nearApi from 'near-api-js';
import { Form, InputGroup, FormControl, Button, Placeholder } from 'react-bootstrap';


import './App.css';

function App() {
  const CONTRACT_NAME = 'nearspring-hello1.artyom-p.testnet'

  const { connect } = nearApi;
  const [greetingInput, setGreetingInput] = useState("")
  const [greetingFromBlockchain, setGreetingFromBlockchain] = useState("")

  const testnet_config = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    deps: {}
  };

  let near;


  const handleSubmit = () => {
    setGreetingFromBlockchain('')
    fetchGreeting();
  }

  async function fetchGreeting() {
    if (greetingInput) {
      near = await connect(testnet_config);

      const account = await near.account(CONTRACT_NAME)
      
      const contract = await new nearApi.Contract(account, CONTRACT_NAME, {
        viewMethods: ["hello"],
      })

      const response = await contract.hello({greeting: greetingInput})

      setGreetingFromBlockchain(response)
      console.log(response)
    }
  }

  
  const Hello = () => {
    return greetingFromBlockchain ? <h3 className='hello'>{greetingFromBlockchain}!</h3> : ''
  }


  return (
    <div className="app">
      <header className="app-header">
        <h1>Nearspring Hello</h1>
      </header>

      <main>
        <Form className='greeting-form' onSubmit={(event) => {event.preventDefault(); handleSubmit()}}>
          <InputGroup className="greeting-input">
            <FormControl
              placeholder="What's your name?"
              aria-label=""
              aria-describedby=""
              onChange={(event) => {setGreetingInput(event.target.value)}}
            />
            
            <Button type="submit" variant="primary" id="hello-button">
              Hello
            </Button>
          </InputGroup>
        </Form>

        <Hello />
      </main>
    </div>
  );
}

export default App;
