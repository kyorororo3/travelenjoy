import React, { Component } from 'react';
import GuideMain from './guide_main'

class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: []
        }
      }
    
      //login info
      componentDidMount() {
        console.log("guide.js DidMount");
        fetch('http://localhost:3002/users/getUser', {
          credentials: 'include'
        })
          .then(res => res.json())
          .then(data => {
            if (data.email !== undefined)
              this.setState({ users: data })
          }
          );
      }

    render(){
        return(
            <div>
                <GuideMain users={this.state.users}/>
            </div>
        )
    }
}

export default Guide;