import useSelectMonedas from '../hooks/useSelectMonedas'
import { useEffect, useState } from 'react'
import { monedas } from '../data/monedas'
import styled from '@emotion/styled'
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #9497FF;
    width: 100%;
    padding: 10px;
    color: #FFF;
    border: none;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        cursor: pointer;
        background-color: #7a7dfe;
    }
`

const Formulario = ({ setMonedas }) => {
    const [error, setError] = useState(false)
    const [criptos, setCriptos] = useState([])
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu criptomoneda', criptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'

            let resultado = await fetch(url)
            resultado = await resultado.json()

            const arrayCriptos = resultado.Data.map(({ CoinInfo }) => (
                {
                    id: CoinInfo.Name,
                    nombre: CoinInfo.FullName
                }
            ))

            setCriptos(arrayCriptos)
        }

        consultarAPI()
    }, [])

    const handleSubmit = evt => {
        evt.preventDefault()

        if ([moneda, criptomoneda].includes('')) {
            setError(true)

            return
        }

        setError(false)
        setMonedas({ moneda, criptomoneda })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}

            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCriptomoneda />
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario