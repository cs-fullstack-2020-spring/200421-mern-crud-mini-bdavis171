import React, { Component } from 'react';
import UpdateCardForm from './UpdateCardForm';



class DisplayCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            willUpdate: false

        }
    }

    

    // handle will update
    handleWillUpdate = (event) => {
        if (this.state.willUpdate){
            this.setState({willUpdate: false});
        }
        else {
            this.setState({willUpdate: true});
        }
    }

     // return to homepage
     returnHomePage = () => {
        window.location.replace('/api');
    }

    // handle delete
    handleDelete = async(event) => {
        let confirmDel = window.confirm('Are you sure you want to delete?');
        if (confirmDel){
        const response = await fetch(`/api/${this.props.card.cardNumber}`, {
            method: "DELETE",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        });
        const json = response.json();
        console.log(json);
        this.returnHomePage();
    }

    }

    render() {
        let displayPage;
        if (this.state.willUpdate){
            displayPage = <UpdateCardForm card={this.props.card}/>;
        }
        else {
            displayPage =  <div className='display-card'>
            <fieldset>
                <legend>{this.props.card.name}</legend>
            <p>Card Number: {this.props.card.cardNumber}</p>
            <p>Phone Number: {this.props.card.phone}</p>
            <p>Zip Code: {this.props.card.zipCode}</p>
            <button onClick={this.handleWillUpdate}>Update</button>
            <button onClick={this.handleDelete}>Delete</button>
            </fieldset>
        </div>
        }
        return (
            <div>
                {displayPage}
            </div>
        );
    }
}

export default DisplayCard;