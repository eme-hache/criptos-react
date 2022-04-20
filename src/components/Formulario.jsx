import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import styled from '@emotion/styled'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;

    &:hover {
        cursor: pointer;
        background-color: #7a7dfe;
    }
`

const Formulario = () => {
    const [SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)

    return (
        <form>
            <SelectMonedas />

            <InputSubmit type="submit" value="Cotizar" />
        </form>
    )
}

export default Formulario