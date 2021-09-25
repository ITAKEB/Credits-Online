
import React from 'react';

function FormCard({children, handleSubmit,title, button}) {
    
  return (
    <div className="creditForm">
        <div className="formContainer">
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