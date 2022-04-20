import ImagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import { useState, useEffect } from 'react'
import Spinner from './components/Spinner'
import styled from '@emotion/styled'

const Contenedor = styled.div`
  max-width: 550px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    max-width: 85%;
    padding: 60px 0;
    align-items: flex-start;
  }
`
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

const App = () => {
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})

        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        let resultado = await fetch(url)
        resultado = await resultado.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      }

      cotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Formulario 
          setMonedas={setMonedas}
        />

        {cargando && <Spinner />}

        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Contenedor>
  )
}

export default App
