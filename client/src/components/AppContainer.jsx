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

    // return to homepage
    returnToHome = (event) => {
        window.location.replace('/api');
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
                    <button onClick={this.returnToHome}>Return to Home</button>
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

                                                <Link  to={`/api/${card.cardNumber}`}>
                                                    <button id='card-btn'>
                                                        <p >Name: {card.name}</p>
                                                        <p>Card Number: {card.cardNumber}</p>
                                                    </button>
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