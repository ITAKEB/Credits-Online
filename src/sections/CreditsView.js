import '../App.css';
import CreditType from '../components/CreditType';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { getCredits } from '../Services/creditService';

function CreditsView() {
  const [state, setState] = useState({
    arr1: [],
    arr2: [],
    arr3: [],
    arr4: [],
    arr5: [],
    arr6: [],
    arr7: [],
    arr8: [], 
    arr9: [],
    arr10: [],
    deletedCredits: [],
    currentDisabled: 'Credito tipo 1',
    type: [],
    title : 'Credito tipo 1',
    deleted: false,
  })

  useEffect (() => {
    const {arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9,arr10, arrEl} = getCredits()

    setState((prevSt) => ({...prevSt , arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9,arr10,deletedCredits: arrEl, type: arr1}))

  }, []);


  const onClickType = (type, title, deleted) => {
    return (evt) => {
      evt.preventDefault()
      setState((prevSt) => ({ ...prevSt, type, currentDisabled: title, title, deleted }))
    }
  }


  const types = [
    { onClick: onClickType(state.arr1,'Credito tipo 1', false), title: 'Credito tipo 1', disabled: state.currentDisabled === 'Credito tipo 1' },
    { onClick: onClickType(state.arr2,'Credito tipo 2',false), title: 'Credito tipo 2', disabled: state.currentDisabled === 'Credito tipo 2' },
    { onClick: onClickType(state.arr3,'Credito tipo 3',false), title: 'Credito tipo 3', disabled: state.currentDisabled === 'Credito tipo 3' },
    { onClick: onClickType(state.arr4,'Credito tipo 4',false), title: 'Credito tipo 4', disabled: state.currentDisabled === 'Credito tipo 4' },
    { onClick: onClickType(state.arr5,'Credito tipo 5',false), title: 'Credito tipo 5', disabled: state.currentDisabled === 'Credito tipo 5' },
    { onClick: onClickType(state.arr6,'Credito tipo 6',false), title: 'Credito tipo 6', disabled: state.currentDisabled === 'Credito tipo 6' },
    { onClick: onClickType(state.arr7,'Credito tipo 7',false), title: 'Credito tipo 7', disabled: state.currentDisabled === 'Credito tipo 7' },
    { onClick: onClickType(state.arr8,'Credito tipo 8',false), title: 'Credito tipo 8', disabled: state.currentDisabled === 'Credito tipo 8' },
    { onClick: onClickType(state.arr9,'Credito tipo 9',false), title: 'Credito tipo 9', disabled: state.currentDisabled === 'Credito tipo 9' },
    { onClick: onClickType(state.arr10,'Credito tipo 10',false), title: 'Credito tipo 10', disabled: state.currentDisabled === 'Credito tipo 10' },
    { onClick: onClickType(state.deletedCredits,'Creditos eliminados', true), title: 'Creditos eliminados', disabled: state.currentDisabled === 'Creditos eliminados' },
]


  
  return (
    <div>
        <div className="header">
        <div className="title">
          <p>Sistema de creditos online</p>     
        </div>
        <div className="formButton">
          
            <Link className="link" to="/create-credit">
              <span>Crear Credito</span>
            </Link>
          
        </div>
      </div>
        
    <div className="body">
      <div className="creditButtons">
        {types.map((t,i)=>{
          return (
          <div key={i} className="typeButton" >
            <button  onClick={t.onClick} disabled={t.disabled}>  
              {t.title}
            </button>
         </div>
          )
        })}

      </div>
      <div className="typeCreditContainer">
        <CreditType type={state.title} credits={state.type} isDeleted={state.deleted}/>
      </div>
    </div>
  </div>
  );
}


export default CreditsView;
