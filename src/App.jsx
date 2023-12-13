import { getDatabase, push, ref, set, onValue, remove } from "firebase/database";
import { useEffect, useState } from "react";

function App() {
  const db = getDatabase();
  const handleremove =(key)=>{
    console.log('data sent');
    remove(ref(db, 'data/'));
  }    
  
  const [Input,setInput] = useState('')
  const [showInput,setShowInput] = useState([])
  const handleinput = (e)=>{
    setInput(e.target.value);
  }
  const handleAdd = ()=>{
    console.log('data sent');
    set(push(ref(db, 'data/')), {
      data: Input,
    });
  }

  useEffect(()=>{
    const dataRef = ref(db, 'data/' );
    onValue(dataRef, (snapshot) => {
      let arr = []
      console.log(snapshot, 'snap');
      snapshot.forEach((item)=>{
        arr.push(item.val());
      })
      setShowInput(arr)
    });
  },[])



  return (
    <>
      <div>
        <h1>ToDo</h1>
        <input onChange={handleinput} type="text" />
        {
          showInput.map((item)=>(
            <div>
              <h1>{item.data}</h1>
              <button onClick={()=>handleremove(item)}>Remove</button>
            </div>
          ))
        }
        <button onClick={handleAdd}>Add</button>
      </div>
    </>
  )
}

export default App
