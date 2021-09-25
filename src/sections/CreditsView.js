import '../App.css';
import CreditType from '../components/CreditType';
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { getCredits } from '../Services/creditService';

function CreditsView() {
  const [state, setState] = useState({
    creditTypes: {},
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
})

useEffect (() => {
  const {arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9,arr10, arrEl} = getCredits()

  setState({arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9,arr10,deletedCredits: arrEl})

}, []);

  return (
    <div className="body">
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
      <CreditType type="Credito tipo 1" credits={state.arr1}/>
      <CreditType type="Credito tipo 2" credits={state.arr2}/>
      <CreditType type="Credito tipo 3" credits={state.arr3}/>
      <CreditType type="Credito tipo 4" credits={state.arr4}/>
      <CreditType type="Credito tipo 5" credits={state.arr5}/>
      <CreditType type="Credito tipo 6" credits={state.arr6}/>
      <CreditType type="Credito tipo 7" credits={state.arr7}/>
      <CreditType type="Credito tipo 8" credits={state.arr8}/>
      <CreditType type="Credito tipo 9" credits={state.arr9}/>
      <CreditType type="Credito tipo 10" credits={state.arr10}/>

      <CreditType type="Creditos eliminados" isDeleted={true} credits={state.deletedCredits}/>
    </div>
  );
}


export default CreditsView;
