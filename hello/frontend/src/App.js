import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import * as nearApi from 'near-api-js';
import { Form, InputGroup, FormControl, Button, Placeholder } from 'react-bootstrap';


import './App.css';

function App() {
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
    console.log(greetingInput);

    fetchGreeting();
  }

  async function fetchGreeting() {
    near = await connect(testnet_config);

    const account = await near.account('nearspring-hello1.artyom-p.testnet')
    
    const contract = await new nearApi.Contract(account, 'nearspring-hello1.artyom-p.testnet', {
      viewMethods: ["hello"],
    })

    const response = await contract.hello({greeting: "Artyom"})

    console.log(response)

    // const getGreetingRawResult = await near.connection.provider.query({
    //   request_type: "call_function",
    //   account_id: 'nearspring-hello1.artyom-p.testnet',
    //   method_name: 'hello',
    //   args_base64: "e30=QXJ0eW9t",
    //   finality: "optimistic",
    // });

    // console.log(getGreetingRawResult);

    // const formattedResult = JSON.parse(Buffer.from(getGreetingRawResult.result).toString());
    // console.log(formattedResult);
  }


  // useEffect(() => {
  //   async function fetchInfo() {

  //     near = await connect(testnet_config);

  //     try {
  //       const getGreetingRawResult = await near.connection.provider.query({
  //         request_type: "call_function",
  //         account_id: 'nearspring-hello.artyom-p.testnet',
  //         method_name: 'get_greeting',
  //         args_base64: "e30=",
  //         finality: "optimistic",
  //     });

  //     console.log(getGreetingRawResult);

  //     const formattedResult = JSON.parse(Buffer.from(getGreetingRawResult.result).toString());
  //     console.log(formattedResult);
      
  //     } catch (error) {
  //         console.log(error)
  //         return;
  //     }
  //   }

  //   fetchInfo()
  // }, [])

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