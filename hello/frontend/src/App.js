import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import { Form, InputGroup, FormControl, Button, Placeholder } from 'react-bootstrap';


import './App.css';

function App() {
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
    console.log(greetingInput);
  }

  const fetchGreeting = () => {

  }


  useEffect(() => {
    async function fetchInfo() {

      near = await connect(testnet_config);

      try {
        
      } catch (error) {
          return;
      }
  }
  }, [])

  const Hello = () => {
    if (greetingFromBlockchain) {
      return "Hello "
    } else {
      return ""
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Nearspring Hello</h1>
      </header>

      <main>
        <Form onSubmit={(event) => {event.preventDefault(); handleSubmit()}}>
          <InputGroup className="greeting-input">
            <FormControl
              placeholder="Your name"
              aria-label=""
              aria-describedby=""
              onChange={(event) => {setGreetingInput(event.target.value)}}
            />
            
            <Button type="submit" variant="primary" id="hello-button">
              Hello
            </Button>
          </InputGroup>
        </Form>

        <Hello className='hello'/>
      </main>
    </div>
  );
}

export default App;
