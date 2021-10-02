
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom';

function FormCard({children, handleSubmit,title, button}) {
    
  return (
    <div className="creditForm">
      <div className="formContainer">
        <div className="comeBackBtnForm">
          <Link className="link" to="/">
              <FontAwesomeIcon className="color" icon={faArrowLeft} size="2x"/>
          </Link>
        </div>
        <h2> {title} </h2>
        <form onSubmit={handleSubmit}>  
            {children}
            <div className="btnContainer">
                <input type="submit" className="btn btn-green" value={button}/> 
            </div>
        </form>
      </div>
    </div>
  );
}


export default FormCard;