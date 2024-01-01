import React, { Component } from "react";
import List from "./components/List";
import "./App.css";
import NewListContainer from "./components/NewListContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  // getBoards = async () => {
  //   const response = await axios.get(
  //     `https://api.trello.com/1/members/swarnimmukati/boards?key=${api_key}&token=${token}`
  //   );

  //   this.setState({
  //     data: response.data,
  //     redirect: false,
  //   });
  // };

  componentDidMount() {
    // localStorage.clear()
    let lists = localStorage.getItem('lists')
    if(lists){
      lists = JSON.parse(lists)
      this.setState({
        data: lists
      })
    }
  }

  addList = async (input) => {
    const lists = this.state.data
    lists.push({name: input, id: lists.length+1, cards: [], count: 0})
    console.log("add lists", lists)
    localStorage.setItem('lists', JSON.stringify(lists))
    this.setState({
      data: lists
    })
  };
  
  onDropOver = (ev, listId) => {
    const dragData = JSON.parse(ev.dataTransfer.getData("card"))
    // console.log("dragData", dragData)
    // console.log("dropId", listId)
    const lists = JSON.parse(localStorage.getItem("lists"))
    const oldListIndex = lists.findIndex(list => list.id == dragData.listId)
    const newListIndex = lists.findIndex(list => list.id == listId)
    
    const oldCardIndex = lists[oldListIndex].cards.findIndex((card) => card.id == dragData.id)
    const oldCard = lists[oldListIndex].cards[oldCardIndex]
    lists[oldListIndex].cards.splice(oldCardIndex, 1)

    lists[newListIndex].cards.push({...oldCard, id: ++lists[newListIndex].count})
    localStorage.setItem('lists', JSON.stringify(lists))
    this.setState({
      data: lists
    }) 
  }

  render() {
    const data = this.state.data;
    console.log("render", data)
    return (
      <div className="App">
        <div className="header">
          <div className="home" onClick={this.getBoards}>
            Home
          </div>
          <div className="title">Kanban Board</div>
        </div>

        <div className="app-content">
              {Object.keys(data).map((index) => {
                return <List data={data[index]} key={data[index].id} onDropOver={this.onDropOver}/>;
              })}
              <NewListContainer addList={this.addList} />
        </div>
      </div>
    );
  }
}

export default App;
