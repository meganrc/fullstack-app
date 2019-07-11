import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';

export default class CreateEmployees extends Component {

    constructor(props) {
        super(props);


        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName= this.onChangeLastName.bind(this);
        this.onChangeHireDate = this.onChangeHireDate.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeJoke = this.onChangeJoke.bind(this);
        this.onChangeQuote = this.onChangeQuote.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    //  this.handleQuoteClick= this.handleQuoteClick.bind(this);


        this.state = {
            firstName: '',
            lastName: '',
            hireDate: 'YYYY-MM-DD',
            role: '',
            joke: [],
            quote:[],
            showJoke: false,
            showQuote: false
        }
    }


    handleQuoteClick =(bool)=>{
  //    e.preventDefault();

      this.setState({
        showQuote: bool
      });

      axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
        .then(
          (result) => {
            console.log(result)
            this.setState({
              quote: result.data
            });

            console.log(this.state.quote)
          },
          (error) => {
            console.log(error)
          }
        )
    }

    //GET JOKE
    handleClick =(bool)=>{

        this.setState({
        showJoke: bool
        });

	    fetch("https://icanhazdadjoke.com/", {
	    	headers: {
	    		'accept': 'application/json'
	    	}
	    })
	      .then(res => res.json())
	      .then(
	        (result) => {
            console.log(result)
	          this.setState({
	            joke: result.joke
	          });
	        },
	        (error) => {
	          console.log(error)
	        }
	      )
	}
  //on button click, call getJoke() and then bind that new state to the box


    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeHireDate(e) {
        this.setState({
            hireDate: e.target.value
        });
    }

    onChangeRole(e){
      this.setState({
        role: e.target.value
      })
    }

    onChangeJoke(e){
      this.setState({
        joke: e.target.value
      })
    }

    onChangeQuote(e){
      this.setState({
        quote: e.target.value
      })
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`First Name: ${this.state.firstName}`);
        console.log(`Last Name: ${this.state.lastName}`);
        console.log(`Hire Date: ${this.state.hireDate}`);
        console.log(`Role: ${this.state.role}`);
        console.log(`Joke: ${JSON.stringify(this.state.joke)}`);
        console.log(`Quote: ${JSON.stringify(this.state.quote)}`);

         const newEmployee ={
           firstName: this.state.firstName,
           lastName: this.state.lastName,
           hireDate: this.state.hireDate,
           role: this.state.role,
           joke: this.state.joke,
           quote: this.state.quote
         };



        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
        };

        axios.post(`http://localhost:3000/api/employees/add`, newEmployee, axiosConfig)
         .then(res => console.log(res))
         .catch(err => console.log('Login: ', err));

        this.setState({
            firstName: '',
            lastName: '',
            hireDate: 'YYYY-MM-DD',
            role: '',
            joke: [],
            quote:[]
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Register New Employee</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Last Name </label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Hire Date</label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.hireDate}
                                onChange={this.onChangeHireDate}
                                />
                    </div>
                    <div className="form-group">
                        <label>Role </label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.role}
                                onChange={this.onChangeRole}
                                />
                    </div>

                    <div className="form-group">
                        <label>Joke </label>
                        <p>
                        <button type="button" className = "button" onClick = {this.handleClick.bind(this, true)}>Get Joke</button>
                        </p>
                        {this.state.showJoke && (<p>{this.state.joke} </p>)}

                    </div>

                    <div className='form-group'>
                      <label>Quote</label>
                      <p>
                      <button type="button" className = "button" onClick = {this.handleQuoteClick.bind(this, true)}>Get Quote</button>
                      </p>
                      {this.state.showQuote && (<p>{this.state.quote} </p>)}
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Create Employee" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
