import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import Title from "./Title";
import Card from "./Card";
import Input from "./InputContainer";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getCards = async () => {
    const cardId = this.props.data.id;
    this.setState({
      data: this.props.data.cards,
    });
  };
  
  updateLists = (id, cards, count) => {
    const lists = JSON.parse(localStorage.getItem('lists'))
      
    const listIndex = lists.findIndex(list => list.id == id)
    lists[listIndex].cards = cards
    lists[listIndex].count = count
    localStorage.setItem('lists', JSON.stringify(lists)) 
  }

  deleteCard = async (cardId) => {
    const id = this.props.data.id
    const cards = this.props.data.cards
    let cardIndex = cards.findIndex((card) => card.id == cardId)
    cards.splice(cardIndex, 1)
    this.updateLists(id, cards, this.props.data.count)
    this.setState({
      data: cards
    })
  };
  
  updateCard = async (cardId, input) => {
    const id = this.props.data.id;
    const cards = this.props.data.cards
    let cardIndex = cards.findIndex((card) => card.id == cardId)
    cards[cardIndex].name = input
    this.updateLists(id, cards, this.props.data.count) 
    // this.setState({
    //   data: cards
    // })
  }

  addCard = async (input) => {
    const id = this.props.data.id;
    let cards = this.props.data.cards
    cards.push({id: ++this.props.data.count, name: input})
    this.updateLists(id, cards, this.props.data.count)
    this.setState({
      data: cards
    })
  };

  componentDidMount() {
    console.log("list mount")
    this.getCards();
  }
 
  onDragOver = (ev) => {
   ev.preventDefault()
  }
  
  render() {
    console.log("list", this.props.data)
    const cards = this.props.data.cards
    return (
      <div>
        <Paper className="root"
          onDragEnd={(e) => this.onExit(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDrop = {(e) => this.props.onDropOver(e, this.props.data.id)}
        >
          <Title data={this.props.data} />
          {cards.map((item, index) => {
            // console.log(item)
            return (
              <Card
                data={item}
                listId={this.props.data.id}
                deleteCard={this.deleteCard}
                updateCard={this.updateCard}
                key={index}
              />
            );
          })}
          <Input addCard={this.addCard} />
        </Paper>
      </div>
    );
  }
}
