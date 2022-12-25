import React, {useState, useEffect} from 'react'
import "./style.css"


const getLocalData= ()=>{ //here we are writing a function to fetch the local data 
  const lists= localStorage.getItem("myTodoList");
  if(lists){
    return JSON.parse(lists); // This is for conversion of string to object
  }
  else{
    return [];
  }
}


const Todo = () => {
  const[inputData, setInputData]= useState("");
  const[items,setItems]= useState(getLocalData());
  const[isedititem, setIsedititem]= useState("");
  const[togglebtn,settogglebtn]= useState(false);


  // Adding Items in the section
const AddItems= ()=>{
  if(!inputData){
    alert("Please fill the data");
  }
  else if(inputData && togglebtn){
    setItems(
      items.map((curEle)=>{
        if(curEle.id=== isedititem){
          return {...curEle,name: inputData}
        }
        else{
          return curEle;
        }
      })
    )
  setInputData("");
  setIsedititem(null);
  settogglebtn(false);
  }
  else{ 
    const myNewInputData= { // Creating object to pass to the items
      id: new Date().getTime().toString(),
      name: inputData
    };
    setItems([...items,myNewInputData]); // Here spread operator is used to modify setItems
    setInputData(""); 
  }
}

 // Deleting Items in the section


 const deleteItem= (index)=>{
  const updatedItem= items.filter((curEle)=>{
    return curEle.id !== index;
  })
  setItems(updatedItem);
 }

// Deleting all the existing Items

const DeleteAll= ()=>{
  setItems([]);
}

// Adding LocalStorage

useEffect(()=>{
  localStorage.setItem("myTodoList",JSON.stringify(items)); // here the items will be in object type so we will use JSON.stringify to convert this into String 
},[items]
)

// To Edit the Items
const editItem= (Index)=>{
  const item_to_edit= items.find((curEle)=>{
    return curEle.id=== Index;
  })
  setInputData(item_to_edit.name);
  setIsedititem(Index);
  settogglebtn(true);
}



  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src="./images/todo.svg" alt="todologo" />
                    <figcaption> Add Your List here </figcaption>
                </figure>
                <div className='addItems'> 
                <input type="text" placeholder="Add Items" className='form-control' value= {inputData} onChange= {(event)=> {setInputData(event.target.value)}} />
                {togglebtn? <i className= "fa fa-edit add-btn" onClick= {()=> AddItems()}></i>  : <i className= "fa fa-plus add-btn" onClick= {()=> AddItems()}></i> }
                
                </div>
                {/* Show all items  */}
                <div className='showItems'>
                {items.map((curEle,index)=> {
                  return(
                    <div className='eachItem' key="curEle.id">
                    <h3> {curEle.name}</h3>
                    <div className='todo-btn'>
                      <i className='far fa-edit add-btn' onClick= {()=> editItem(curEle.id)}> </i>
                      <i className='far fa-trash-alt add-btn' onClick= {()=> deleteItem(curEle.id)}> </i>
                    </div>
                   </div>
                  );
                })
                }
                
                </div>
                {/* Remove all button */}
                <div className='showItems'>
                  <button className='btn effect04' data-sm-link-text ="Remove All" onClick= {DeleteAll}>
                  <span>
                    CHECK LIST
                    </span>
                  </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo