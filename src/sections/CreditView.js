
import React, { useState, useEffect } from 'react';
import {getCreditsByType} from '../Services/creditService'


function CreditView({match}) {
    const {type, id} = match.params
    const [state, setState] = useState({
        usuario: '',
        tipoDocumento: '',
        numeroDocumento: '',
        valorCredito: '',
        tipoCredito: '',
        fechaCreacion: '',
        fechaActualizacion: '',
        plazo: 0,
        tazaInteres: '',
        tableRows: null,
    })


    useEffect (() => {  
        const arr1 = getCreditsByType(type)
        const json = JSON.parse(arr1[id])
        const {usuario, tipoDocumento, numeroDocumento, valorCredito, plazo, tazaInteres,fechaCreacion,fechaActualizacion} = json
        const tableRows = generateTable(plazo, valorCredito, tazaInteres)
        setState((prevSt) =>({...prevSt,tipoCredito:type, tableRows, usuario,numeroDocumento,valorCredito,tipoDocumento,plazo,tazaInteres,fechaCreacion,fechaActualizacion}))
    }, []);



    const generateTable = (plazo, valorCredito, tazaInteres) => {
        const p = parseFloat(plazo)
        const valorC = parseFloat(valorCredito)
        const interes = parseFloat(tazaInteres)
        const tableRows =  Array(p).fill(0)
        
        tableRows.map((v,i) =>{
            const amort = valorC/p
            if(i===0){
                const inter = valorC*(interes/100)
                const value= {
                    row: i+1,
                    valueAmort: amort.toFixed(2),
                    cuota: (amort+inter).toFixed(2),
                    interes: inter.toFixed(2),
                    capital: (valorC-amort).toFixed(2),
                }
                tableRows[i] = value
            }else{
                const newCapital = tableRows[i-1].capital
                const inter = (tableRows[i-1].interes-tableRows[i-1].valueAmort*(interes/100))
                const value= {
                    row: i+1,
                    valueAmort: amort.toFixed(2),
                    cuota: (amort+inter).toFixed(2),
                    interes: inter.toFixed(2),
                    capital: (newCapital-amort).toFixed(2) < 1  ? 0 : (newCapital-amort).toFixed(2) 
                }
                tableRows[i] = value
            }
        })
        
        return tableRows
    }




    const rowsView = () =>{
        const rows = state.tableRows

        return rows.map((value) =>{
            return( <tr key={value.row}>
                        <td>{value.row}</td> 
                        <td>{value.interes}</td>
                        <td>{value.valueAmort}</td>
                        <td>{value.cuota}</td>
                        <td>{value.capital}</td>
                    </tr>
            )
        } )
    }


    const urlProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"; 
  return (
    <div className="creditView">
        <div className="creditContainer">
            <div className="card">
                <div>
                    <img src={urlProfileImage} alt="Perfil"/>
                    <h1 className="creditTitle"> {state.usuario} </h1>  
                    <p> Fecha creación: {state.fechaCreacion} </p>
                    
                    <p> Ultima actualización: {state.fechaActualizacion} </p>

                    <p> {state.tipoDocumento} : {state.numeroDocumento} </p>

                    <p> Credito tipo: {(parseInt(state.tipoCredito+1))} </p>

                    <p> Valor del credito: {state.valorCredito}</p>

                    <p> Plazo: {state.plazo} meses</p>

                    <p> Taza interes: {state.tazaInteres}</p>                    
                </div>
                <div className="tableContainer">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Periodo
                                </th>
                                <th>
                                    Intereses
                                </th>
                                <th>
                                    Amortizacion del Capital
                                </th>
                                <th>
                                    Cuota
                                </th>
                                <th>
                                    Capital Pendiente
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0</td> 
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{state.valorCredito}</td>
                            </tr>
                            { state.tableRows ? rowsView() : null}
                        </tbody>    
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
}


export default CreditView;