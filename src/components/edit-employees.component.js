import React, { Component } from 'react';
import axios from 'axios';

export default class EditEmployees extends Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);


        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName= this.onChangeLastName.bind(this);
        this.onChangeHireDate = this.onChangeHireDate.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeJoke = this.onChangeJoke.bind(this);
        this.onChangeQuote = this.onChangeQuote.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

  //      this.handleQuoteClick= this.handleQuoteClick.bind(this);

        this.state = {
          firstName:'',
          lastName: '',
          hireDate: '',
          role: '',
          joke: [],
          quote:[],
          showJoke: false,
          showQuote: false
        }
    }

    /*GET REQUEST*/
    componentDidMount(){

      axios.get('http://localhost:3000/api/employees/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              hireDate: response.data.hireDate,
              role: response.data.role,
              joke: response.data.joke,
              quote: response.data.quote

            })
          })
          .catch(function (error) {
            console.log(error);
          })
    }


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

  handleQuoteClick = (bool) => {
  //  e.preventDefault();

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
        },
        (error) => {
          console.log(error)
        }
      )
  }

    /*dELETE EMPLOYEE*/
    delete(){
      axios.get('http://localhost:3000/api/employees/delete/'+this.props.match.params.id)
          .then(console.log('Deleted'))
          .catch(err => console.log(err));

      this.props.history.push('/api/employees');
    }

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

    onSubmit(e){
      e.preventDefault();

      const object= {
        firstName:this.state.firstName,
        lastName: this.state.lastName,
        hireDate: this.state.hireDate,
        role: this.state.role,
        joke: this.state.joke,
        quote: this.state.quote
      };
      console.log(object);

      axios.post('http://localhost:3000/api/employees/update/'+this.props.match.params.id, object)
          .then(res => console.log(res.data));

      this.props.history.push('/api/employees');
    }

    render() {
        return (
            <div>
              <h3 align="center">Update Employee</h3>
              <form onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <label>First Name: </label>
                  <input type='text'
                         className="form-control"
                         value={this.state.firstName}
                         onChange={this.onChangeFirstName}
                         />
                </div>

                <div className='form-group'>
                  <label>Last Name: </label>
                  <input type='text'
                         className="form-control"
                         value={this.state.lastName}
                         onChange={this.onChangeLastName}
                         />
                </div>

                <div className='form-group'>
                  <label>Hire Date: </label>
                  <input type='text'
                         className="form-control"
                         value={this.state.hireDate}
                         onChange={this.onChangeHireDate}
                         />
                </div>

                <div className='form-group'>
                  <label>Role: </label>
                  <input type='text'
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

                <br />

                <div className="form-group">
                  <input type="submit" value="Update Employee" className="btn btn-primary" />
                </div>

                <div>
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </div>
              </form>
            </div>
        )
    }
}
