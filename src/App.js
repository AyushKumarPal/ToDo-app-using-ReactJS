import React, { Component } from 'react';
import './App.css';

let idNum = 1;
class App extends Component{

  constructor(){
    super();
    this.state = {
      itemText : "",
      allItems : [
        ]
  }
  
}

  handleChange(event){ 
    const {name,value} = event.target;
    this.setState({[name] : value});
  }

  handleAddItem(){ 
    if(this.state.itemText){
      let obj = {
        id : idNum,
        todoDes : this.state.itemText,
        isCompleted : false
      }
      const updateItems = this.state.allItems.push(obj);
      this.setState({updateItems});
      idNum++;
    }
    document.getElementById("textInput").value = "";
  }

  handleItemDelete(item){
    const allItems = this.state.allItems.filter((eachItem) => {
      return eachItem.id !== item.id;
    });
    this.setState({ allItems });
  }

  handleTaskDone(item){ 
    const updateStatus = this.state.allItems.map((eachItem) => {
      if(item.id === eachItem.id){
        eachItem.isCompleted = true;
      }
      return true;
   });
    this.setState({updateStatus});
  }

  render(){
    return(
      <div>
        <h1>Todo List</h1>
        <div id={"addDiv"}>
          <input id={"textInput"} type={"text"} placeholder={"Add an item"} 
          value={this.state.itemText} name={"itemText"} onChange = { (event) =>{
            this.handleChange(event);
          } } 
          required />
          <button id={"addBtn"} type={"submit"} onClick={() => {
            this.handleAddItem();
          }}>
          Add Item </button>
          </div>

          <div id={"listDiv"}>
            <h4> Tasks list </h4>
            {
              this.state.allItems.map((item) => (
                <div className={"listItems"} key={item.id}>
                  {item.isCompleted ? <div className={"taskName isDone"}><strike>{item.todoDes}</strike></div> : <div className={"taskName"}>{item.todoDes}</div>}
                  <span className={"button-span"}> 
                  <button className={"btn-done"} onClick={() => {
                      this.handleTaskDone(item);
                      }
                    }> ✔️ </button>
                    <button className={"btn-remove"} onClick={() => {
                      this.handleItemDelete(item);
                      }
                    }> ❌ </button> 
                  </span>
                </div>
              ))
            }
          </div>
      </div>
    );
  }

}



export default App;
