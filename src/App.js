import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
//commit
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Toast from 'react-bootstrap/Toast'
import './App.css'

function App() {

  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [operador, setOperador] = useState('+')
  const [resultado, setResultado] = useState('')
  const [erroResultado, setErroResultado] = useState(null)

  async function obtemResultado(num1,operador,num2) {
    const expr = `${num1}${operador}${num2}` //Expressão = Expr
    // Para está API o operador precisa estar no formato ERL Encoded por isso usei a função encodeURIComponent()
    let url = `https://api.mathjs.org/v4/?expr=${encodeURIComponent(`${expr}`)}`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(url)
        console.log(operador)
        console.log(expr)
        console.log(data)
        setResultado(data)
      })
      .catch(function (error) {
        console.error(`${error.message}`)
        setErroResultado(true)
      })
  }

  return (
    <>
      <h1>Calculadora</h1>
      <Form inline>
        <FormControl type="number" value={num1}
          label="Valor 1"
          onChange={event => setNum1(event.target.value)}
          placeholder="Digite um número" />&nbsp; 
      <FormControl as="select" value={operador}
          label="Operador"
          onChange={event => setOperador(event.target.value)}>
          <option>+</option>
          <option>-</option>
          <option>*</option>
          <option>/</option>
        </FormControl>&nbsp;
      <FormControl type="number" value={num2}
          label="Valor 2"
          onChange={event => setNum2(event.target.value)}
          placeholder="Digite um número" />&nbsp; = &nbsp;
      <FormControl type="number" readOnly value={resultado}/>
      </Form>
      <Button variant="info" onClick={() => obtemResultado(num1,operador,num2)}>Obter resultado</Button>

      {erroResultado &&
        <Toast onClose={() => setErroResultado(null)} delay={6000} autohide className="bg-danger">
          <Toast.Header><strong className="mr-auto">Erro</strong></Toast.Header>
          <Toast.Body className="bg-white text-danger">Por favor verifique os valores digitados!<br>
          </br>Certifique-se de preencher todos os campos!</Toast.Body>
        </Toast>
      }
    </>
  )
}

export default App;
