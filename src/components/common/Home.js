import React from 'react';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    fetch('http://localhost:3002/users/getUser',{
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if(data.email !== undefined){
          this.setState({users : data})
          console.log(data);
        }          
      });
  }

  render() {
    let profile_img = null;
    if(this.state.users.email !== undefined && this.state.users.profile_img !== null){
      profile_img = <img src={require(`../../uploads/${this.state.users.profile_img}`)} />
    }

    return (
      <div className='home-wrapper'>
        <h3>HOME</h3>
        {/* {profile_img} */}
      </div>
    )
  }
}

export default Home;