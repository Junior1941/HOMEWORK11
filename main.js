const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)

let countNum = 0


function Counter(props) {
  const{item: {id,number},hdlUpdate,hdlDelete} = props



  
 return (
    <div className='counter'>
      <button className='f1' onClick={() => hdlUpdate(id, -1)}> - </button>
      <h3>{number}</h3>
      <button className='f2' onClick={() => hdlUpdate(id, 1)}> + </button>
      <button className='f3' onClick={() => hdlUpdate(id, -number)}> C </button>
      <button className='f4' onClick={() => hdlDelete(id)}> X </button>
    </div>
  );
}



//update ค่า Sum
function updateSum(counters) {
    const total = counters.reduce((sum, counter) => sum + counter.number, 0);
    return total
  }
  


  //แสดงผลค่า Sum
  function SumInfo(props) {
    const sum = updateSum(props.counters);
  
    const styles = {
      color: props.color,
      fontSize: props.size === 'big' ? '50px' : '40px',
    };
  
    return (
      <div className='suminfo'>
        <h1 style={{ color: props.color, fontSize: props.size }}>Sum = {sum}</h1>
      </div>
    );
  }
  



//ใช้แสดงผล
function App() {
    const [counters,setCounters] = React.useState([{id: 1, number: 0}])
    const hdlUpdate =(id,num) =>{
     const cloneCounters =[...counters]
     let idx = cloneCounters.findIndex(el => el.id === id)
     if (cloneCounters[idx].number + num < 0) {
        return;
      }
     console.log(idx, num)
     cloneCounters[idx].number += num
     setCounters(cloneCounters)
    }

    
//เพิ่ม Counter
    const hdlAddCounter = ()=>{
      let newId = counters.length===0 ? 1 : counters.at(-1).id +1 
      const  cloneCounters = [...counters]
      cloneCounters.push( {id: newId, number: 0} )
      setCounters(cloneCounters)
    }

    //ลบ Counter
    const hdlDelete = (id) => {
        const cloneCounters = counters.filter((counter) => counter.id !== id);
        setCounters(cloneCounters);
      };



      
  return (
  <>
    <h1 className='text-center'>Codecamp Academy 01</h1>
    <button className='btn-add' onClick={hdlAddCounter}>Add Counter</button>
    <SumInfo color="Blond" size="mediem" counters={counters}/> 


    {counters.map( el => {
      return <Counter key={el.id} 
      item={el} 
      hdlUpdate={hdlUpdate} 
      hdlDelete={hdlDelete}
    />
    } )}

  </>
  )
}