import React, { Component } from 'react';


class UpdateCardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.card.name,
            cardNumber: this.props.card.cardNumber,
            phone: this.props.card.phone,
            zipCode: this.props.card.zipCode
        }
    }

    // handle changes to fields
    handleChanges = (event) => {
        if (event.target.name === "name") {
            this.setState({ name: event.target.value });
        }
        else if (event.target.name === "cardNumber") {
            this.setState({ cardNumber: event.target.value });
        }
        else if (event.target.name === "phone") {
            this.setState({ phone: event.target.value });
        }
        else if (event.target.name === "zipCode") {
            this.setState({ zipCode: event.target.value });
        }
    }
    // return to homepage
    returnHomePage = () => {
        window.location.replace('/api');
    }

    // handle Submission
    handleSubmission = async (event) => {
        event.preventDefault();
        let formData = {
            name: this.state.name,
            cardNumber: this.state.cardNumber,
            phone: this.state.phone,
            zipCode: this.state.zipCode
        };
        const response = await fetch(`/api/${this.props.card.cardNumber}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const json = response.json()
        console.log(json);
        this.returnHomePage();
    }

    render() {
        return (
            <form action="">
                <fieldset>
                    <legend>Add A Card</legend>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' id='name' value={this.state.name} onChange={this.handleChanges} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input type="number" name='cardNumber' id='cardNumber' value={this.state.cardNumber} onChange={this.handleChanges} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number:</label>
                        <input type="number" name='phone' id='phone' value={this.state.phone} onChange={this.handleChanges} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="zipCode">Zip Code:</label>
                        <input type="number" name='zipCode' id='zipCode' value={this.state.zipCode} onChange={this.handleChanges} />
                    </div>

                    <div className="form-group">
                        <button onClick={this.handleSubmission}>Update Card</button>
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default UpdateCardForm;