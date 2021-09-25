export function fecha (){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hora = today.getHours() + ':' + (today.getMinutes()<9? '0'+today.getMinutes(): today.getMinutes()) + ':' +
            (today.getSeconds()<9 ? '0'+today.getSeconds() : today.getSeconds());


    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy+ ' '+ hora;
    return today;
}

export function getCredits() {
  const types1 = sessionStorage.getItem('0')
  const types2 = sessionStorage.getItem('1')
  const types3 = sessionStorage.getItem('2')
  const types4 = sessionStorage.getItem('3')
  const types5 = sessionStorage.getItem('4')
  const types6 = sessionStorage.getItem('5')
  const types7 = sessionStorage.getItem('6')
  const types8 = sessionStorage.getItem('7')
  const types9 = sessionStorage.getItem('8')
  const types10 = sessionStorage.getItem('9')

  const eliminated = sessionStorage.getItem('delete')

  let arr1 = types1 ? types1.split(';') : null
  let arr2 = types2 ? types2.split(';'): null
  let arr3 = types3 ? types3.split(';'): null
  let arr4 = types4 ? types4.split(';') : null
  let arr5 = types5 ? types5.split(';'): null
  let arr6 = types6 ? types6.split(';'): null
  let arr7 = types7 ? types7.split(';') : null
  let arr8 = types8 ? types8.split(';'): null
  let arr9 = types9 ? types9.split(';'): null
  let arr10 = types10 ? types10.split(';') : null
  

  let arrEl = eliminated ? eliminated.split(';') : null
  
  arr1 = arr1 ? arr1.filter(Boolean) : null
  arr2 = arr2 ? arr2.filter(Boolean) : null
  arr3 = arr3 ? arr3.filter(Boolean) : null
  arr4 = arr4 ? arr4.filter(Boolean) : null
  arr5 = arr5 ? arr5.filter(Boolean) : null
  arr6 = arr6 ? arr6.filter(Boolean) : null
  arr7 = arr7 ? arr7.filter(Boolean) : null
  arr8 = arr8 ? arr8.filter(Boolean) : null
  arr9 = arr9 ? arr9.filter(Boolean) : null
  arr10 = arr10 ? arr10.filter(Boolean) : null
  
  arrEl = arrEl ? arrEl.filter(Boolean) : null
 
  return {arr1, arr2,arr3,arr4,arr5,arr6,arr7,arr8,arr9,arr10,arrEl}
}


export function getCreditsByType(type) {
    if(type){
        const types1 = sessionStorage.getItem(type)
        
        let arr1 = types1 ? types1.split(';') : null
        
        arr1 = arr1 ? arr1.filter(Boolean) : null
    
        return arr1
    }
  }

export function deleteCredit (creditType,position, isDeleted) {
    var data = null
    if(!isDeleted){
    data = sessionStorage.getItem(creditType)
    var newData = ''
    var deleteData = ''
    var arr = data ? data.split(';') : null
    arr.map( (credit,i) => {

      if(i!==position && i!==arr.length-1){
        newData = newData+credit+';'
      }else if(i!==position){
        newData = newData+credit
      }else{
        deleteData = credit
      }
    })

      data = sessionStorage.getItem('delete')
      const credits =  data ? data + ";" + deleteData :  deleteData
      sessionStorage.setItem('delete', credits)

      sessionStorage.setItem(creditType,newData)
    }else{
      data = sessionStorage.getItem('delete')
      var newData = ''
      var deleteData = ''
      var arr = data ? data.split(';') : null
      arr.map( (credit,i) => {
        if(i!==position && i!==arr.length-1){
          newData = newData+credit+';'
        }else if(i!==position){
          newData = newData+credit
        }
      })


      sessionStorage.setItem('delete',newData)
    }

    window.location.reload(true);
}
