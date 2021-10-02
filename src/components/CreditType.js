import CreditCard from './CreditCard';

function CreditType({type, credits, isDeleted}) {

  return (
    <div >
      <p className="creditType">{type}</p>   
      <div className="containerCreditType">
        {credits ? credits.map((json,i) => {
          const credit = JSON.parse(json)
          return (
          <CreditCard 
          key={credit.numeroDocumento} 
          position={i}
          isDeleted={isDeleted}
          creditType={credit.tipoCredito}
          userInformation={{name:credit.usuario, 
            id: credit.numeroDocumento, 
            tipoDocumento: credit.tipoDocumento,}}
          fechaActualizacion={ credit.fechaActualizacion}
          fechaCreacion={credit.fechaCreacion}
          creditValue={credit.valorCredito}/>
          )}) : <p className="info">No hay creditos</p>   }
      </div>
  </div>
  );
}

export default CreditType;
