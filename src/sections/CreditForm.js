
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import {fecha} from "../Services/creditService"
import FormCard from '../components/FormCard';

function CreditForm() {
    const history = useHistory();
    const [state, setState] = useState({
        usuario: '',
        tipoDocumento: '',
        numeroDocumento: '',
        valorCredito: '',
        tipoCredito: '',
        tazaInteres: '',
        plazo: '',
        fechaActualizacion: '',
        fechaCreacion: ''
    })

    const _handleChange = (attr) =>  {
        return (evt) => {
            evt.preventDefault()
            const fechaCreacion = fecha()
            const fechaActualizacion = fechaCreacion
            if(attr==='numeroDocumento' && evt.target.value){
                const {value} = evt.target
                const tipoCredito = value.charAt(value.length-1)
                setState((prevSt) => ({ ...prevSt, [attr]: evt.target.value, tipoCredito: tipoCredito, fechaActualizacion, fechaCreacion}))
            }else{
                setState((prevSt) => ({ ...prevSt, [attr]: evt.target.value, fechaActualizacion, fechaCreacion}))
                
            }
            
            
        }
    }
    
    const handleSubmit = (evt) =>{
        evt.preventDefault()

        var data = {};

        data = sessionStorage.getItem(state.tipoCredito)
        const credits =  data ? data + ";" + JSON.stringify(state) :  JSON.stringify(state)
        sessionStorage.setItem(state.tipoCredito, credits)
        
        history.push("/");
    }

  return (
      <FormCard title="Crear Credito" button="Crear" handleSubmit={handleSubmit}>
            <p> Usuario </p>
            <input className="field" onChange={_handleChange('usuario')}/>
            <p> Tipo de documento </p>
            <select className="field" onChange={_handleChange('tipoDocumento')}>
                <option value="CC">Cedula de Ciudadania</option>
                <option selected value="TI">Tarjeta de identidad</option>
            </select>
            <p> Numero de documento </p>
            <input className="field" onChange={_handleChange('numeroDocumento')} />
            <p> Valor del credito </p>
            <input className="field" onChange={_handleChange('valorCredito')} />
            <p> Tasa de interes (porcentaje) </p>
            <input className="field" onChange={_handleChange('tazaInteres')} />
            <p> Plazo (en meses) </p>
            <input className="field" onChange={_handleChange('plazo')} />
      </FormCard>
  );
}


export default CreditForm;