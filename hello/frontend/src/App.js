import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import { Form, InputGroup, FormControl, Button, Placeholder } from 'react-bootstrap';


import './App.css';

function App() {
  const [greetingInput, setGreetingInput] = useState("")

  const handleSubmit = () => {
    console.log(greetingInput);
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
      </main>
    </div>
  );
}

export default App;
