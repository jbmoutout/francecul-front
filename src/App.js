import React, { Component } from 'react';
import Emissions from './Emissions'
import './App.css';
import parrot from './assets/images/parrot.gif';

class App extends Component {

  state = {
    emissions_count: {},
  }

  componentDidMount = () => {
    this.getEmissionsCount();
  }


  getEmissionsCount = () => {
    var root_url = 'http://hidden-basin-30200.herokuapp.com/emissions_count';
    return fetch(root_url, {
      method: 'GET',
      headers: {
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({emissions_count: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }



  render() {
    return (
      <div>
        <div className="github-top">
          <a href="https://github.com/jbmoutout/francecul"><h3>github</h3></a>
        </div>
        <div style={{display:"flex", justifyContent: "center",}}>
          <div style={{width:"75vw"}}>
            <h1 style={{margin:0}}>Les pieds sur terre</h1>
            <div style={{display:"flex", "justifyContent": "space-between"}}>
              <h3 style={{marginBottom:0}}>francecul.<img src={parrot} width="10%"/></h3>
            </div>
            <div>
              <p style={{marginBottom:0}}>Tous les jours, une demi-heure de reportage sans commentaire.<br></br>Par Sonia Kronlund</p>
            </div>
            <p style={{fontWeight: 800, marginTop:0}}>
              {this.state.emissions_count + " emissions"}
            </p>
          </div>
        </div>

        <Emissions  />

      </div>
    );
  }
}

export default App;
