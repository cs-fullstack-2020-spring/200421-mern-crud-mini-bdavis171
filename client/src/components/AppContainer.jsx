import React, { Component } from 'react';
import AddCardForm from './AddCardForm';
import DisplayCard from './DisplayCard';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            willAdd: false,
            cardList: []
        }
    }

    componentDidMount = () => {
        this.loadData();
    }

    // load data
    loadData = async () => {
        const response = await fetch('/api');
        const json = await response.json();
        console.table(json);
        this.setState({ cardList: json });
    }

    // handle willAdd
    handleWillAdd = (event) => {
        if (this.state.willAdd) {
            this.setState({ willAdd: false });
        }
        else {
            this.setState({ willAdd: true });
        }
    }



    render() {
        let addForm;
        if (this.state.willAdd) {
            addForm = <AddCardForm />;
        }

        return (
            <div className='home-container'>
                <div className="header">
                    <h1>Library Card Records</h1>
                </div>

                <div className="add-form">
                    <button onClick={this.handleWillAdd}>Click here to add a new card!</button>
                    {addForm}
                </div>

                <div className="card-list">
                    <fieldset>
                        <legend>List of Library Cards</legend>
                        <div className="cards">
                            <Router>
                                {this.state.cardList.map(
                                    (card) => {

                                        return (
                                            <div key={card._id}>

                                                <Link to={`/api/${card.cardNumber}`}>
                                                    <p>Name: {card.name}</p>
                                                    <p>Card Number: {card.cardNumber}</p>
                                                </Link>
                                                <br />
                                                <Route path={`/api/${card.cardNumber}`}>
                                                    <DisplayCard card={card} />
                                                </Route>
                                                <br />

                                            </div>
                                        )
                                    }
                                )}
                            </Router>
                        </div>
                    </fieldset>
                </div>


            </div>
        );
    }
}

export default AppContainer;