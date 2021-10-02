import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { deleteCredit } from '../Services/creditService';

function CreditCard({userInformation, creditValue,position, creditType, isDeleted,fechaCreacion, fechaActualizacion}) {
    const history = useHistory();
    const [state, setState] = useState({
        name: '',
        id: '',
        creditValue: '',
        tipoDocumento: '',
        fechaActualizacion: '',
        fechaCreacion: '',
        position:'',
        creditType: '',
    })

    useEffect (() => {
        setState({name: userInformation.name, 
          id: userInformation.id, 
          creditValue, 
          tipoDocumento: userInformation.tipoDocumento, 
          fechaCreacion,
          fechaActualizacion,
          position,
          creditType})
    }, []);

    const handleViewCredit = (evt) =>{
      evt.preventDefault()
      if(isDeleted){
        history.push(`/credit-view/${"delete"}/user/${state.position}`);
      }else{
        history.push(`/credit-view/${state.creditType}/user/${state.position}`);
      }
    }

    const handleEditCredit = (evt) =>{
      evt.preventDefault()
      if(isDeleted){
        history.push(`/edit-credit/${"delete"}/user/${state.position}`);
      }else{
        history.push(`/edit-credit/${state.creditType}/user/${state.position}`);
      }
    }

    const handleDelete = (evt) =>{
      evt.preventDefault()
      deleteCredit(state.creditType, state.position, isDeleted)
    }

    const urlProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"; 

  return (
    <div className="container" >
      <div className="iconProfile" onClick={handleViewCredit}>
        <img className="profileImage" src={urlProfileImage} alt="Perfil"/>
      </div>
      <div className="userInformation" onClick={handleViewCredit}>  
        <div className="user">
            <div className="item">
            <p> {state.name}</p>  
            </div>
            <div className="item">
            <p> {`${state.tipoDocumento}: ${state.id}`}</p>  
            </div>    
            <div className="item">
            <p>Fecha creación: {state.fechaCreacion}</p>   
            </div>
        </div>   
        <div className="credit">
            <div className="item">
            <p> ${state.creditValue}</p>  
            </div>
            <div className="item">
            <p> Ultima actualizacion: {state.fechaActualizacion}  </p>  
            </div>
        </div>   
      </div>
      <div className="buttonsContainer">  
        { !isDeleted ?
         <div className="button">
            <button onClick={handleEditCredit}>
              <FontAwesomeIcon  icon={faEdit} size="2x"/>
            </button>
          </div>
          : null
        }<div className= "button">
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashAlt} size="2x"/>            
          </button>
        </div>
      </div> 
    </div>
  );
}

export default CreditCard;