import React, { Component} from 'react'
import './userdata.css';

export default class UserData extends Component {


    constructor(props) {
        super(props);
        this.state = {
            URL: 'https://jsonplaceholder.typicode.com/posts/',
            userData: [],
            error: ''
        };
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick = (e) => {
        e.preventDefault();
        this.state.userId = e.target.userid.value;
          this.loadData().then(data => { 
            if (data.error) {
              console.log(data.error);
            } else {
              let ud = [];
              data.map((d,key) => {
                  if(parseInt(this.state.userId) == d.userId ) {
                    ud.push(d)
                  }
              })
              if(ud.length===0){
                  this.setState({error:"User not present in Database"})
              }
              this.setState({userData:ud})
            }
          });
      }


      loadData = () => {
        return fetch(
          `https://jsonplaceholder.typicode.com/posts/`,
          {
            method: 'GET'
          }
        )
          .then(response => {
            return response.json();
          })
          .catch(err => console.log(err));
      };
      
    render() {
        return (
            <div className="body">
                <div>
                    <form onSubmit={this.handleClick}>
                    <div className="form-group">
                        <label className="label">Enter UserId : </label>
                        <input className="form-control" type="text" name="userid" />
                        <button className="btn btn-primary" type="submit">OK</button>
                    </div>
                    </form>
                </div>
                
                {this.state.userData.map((d, i) => {
                return (
                <div key={i}> 
                    <div className="card">
                        <div className="id">
                            <div> id: {d.id}</div>
                            <div>userId: {d.userId}</div>
                        </div>
                        <div className="title">Title: {d.title}</div>
                        <div className="body"> Body: {d.body}</div>
                    </div>
                </div>
                )})}
                {this.state.error && (
                    <h1>{this.state.error}</h1>
                )}
            </div>
        )
    }
}
