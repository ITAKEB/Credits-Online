
import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import FormCard from '../components/FormCard';
import { fecha, getCreditsByType } from '../Services/creditService';


function CreditUpdate ({match}) {
    const {type, id} = match.params
    const history = useHistory();
    const [state, setState] = useState({
        usuario: '',
        tipoDocumento: '',
        numeroDocumento: '',
        valorCredito: '',
        tipoCredito: '',
        fechaCreacion: '',
        fechaActualizacion: '',
        plazo: '',
        tazaInteres: '',
    })

    const user = () =>{
        const arr1 = getCreditsByType(type) ?  getCreditsByType(type) : null
        const json = JSON.parse(arr1[id])
        const {usuario, tipoDocumento, numeroDocumento, valorCredito, plazo, tazaInteres,fechaCreacion} = json 
        const fechaActualizacion = fecha()
        setState((prevSt) =>({...prevSt,tipoCredito:type, usuario,numeroDocumento,valorCredito,tipoDocumento,plazo,tazaInteres,fechaCreacion,fechaActualizacion}))
    }


    useEffect (() => {  
        user()
    }, []);

    const _handleChange = (attr) =>  {
        return (evt) => {
            evt.preventDefault()
            
            if(attr==='numeroDocumento' && evt.target.value){
                const {value} = evt.target
                const tipoCredito = value.charAt(value.length-1)
                setState((prevSt) => ({ ...prevSt, [attr]: evt.target.value, tipoCredito: tipoCredito}))
            }else{
                setState((prevSt) => ({ ...prevSt, [attr]: evt.target.value}))
                
            }
            
            
        }
    }
    
    const handleSubmit = (evt) =>{
      evt.preventDefault()
        var data = null
        var deleteData = ''
        data = sessionStorage.getItem(type)
        var oldData = ''
        var arr = data ? data.split(';') : null
        arr.map( (credit,i) => {

          if(i!=id && i!=arr.length-1){
            oldData = oldData+credit+';'
          }else if(i!=id){
            oldData = oldData+credit
          }else{
            deleteData = credit
          }
        })

        var newData = ''

        if(state.tipoCredito != type){
            data = sessionStorage.getItem(state.tipoCredito)
            data = data ? data+";"+ JSON.stringify(state) : JSON.stringify(state)
            newData = data
            sessionStorage.setItem(state.tipoCredito,newData)    
            sessionStorage.setItem(type,oldData)
        }else{
            oldData = oldData ? oldData+";"+ JSON.stringify(state) : JSON.stringify(state)
            newData = oldData
            sessionStorage.setItem(type,newData)
        }


      history.push("/");
    }
    

  return (
    <FormCard title="Actualizar Credito" button="Actualizar" handleSubmit={handleSubmit}>
        <p> Usuario </p>
        <input className="field" onChange={_handleChange('usuario')} value={state.usuario}/>
        <p> Tipo de documento </p>
        <select value={state.tipoDocumento} className="field" onChange={_handleChange('tipoDocumento')}>
            <option  value="CC">Cedula de Ciudadania</option>
            <option  value="TI">Tarjeta de identidad</option>
        </select>
        <p> Numero de documento </p>
        <input className="field" onChange={_handleChange('numeroDocumento')} value={state.numeroDocumento}/>
        <p> Valor del credito </p>
        <input className="field" onChange={_handleChange('valorCredito')} value={state.valorCredito}/>
        <p> Tasa de interes (porcentaje)</p>
        <input className="field" onChange={_handleChange('tazaInteres')} value={state.tazaInteres} />
        <p> Plazo (en meses) </p>
        <input className="field" onChange={_handleChange('plazo')} value={state.plazo}/>

      </FormCard>

  );
}


export default CreditUpdate;