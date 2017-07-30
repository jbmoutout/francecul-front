import React, { Component } from 'react';
import { BounceLoader } from 'react-spinners';
import ReactPlayer from 'react-player';
import Player from './Player';
import EmissionsList from './EmissionsList';

class Emissions extends Component {

  state = {
    loading: true,
    emissions: [],
    sorted: false,
    source: {}
  }

  componentDidMount = () => {
    this.getEmissions();
  }


  getEmissions = () => {
    console.log("from getEmissions =>" + this.state.sorted)
    this.setState({loading: true})
    var root_url = 'http://localhost:8000/emissions?sorted=' + this.state.sorted;
    return fetch(root_url, {
      method: 'GET',
      headers: {
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({loading: false, emissions: responseJson.emissions});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleSorting = () => {
    console.log("🐳🐳")
    this.setState({ sorted: true}, function updateEmission() {
      this.getEmissions();
    });

  }

  handleHasard = () => {
    this.setState({ sorted: false}, function updateEmission() {
      this.getEmissions();
    });
  }

  play = (link) => {
    console.log(link)
    this.setState({source: link});
  }

  render() {
    var that = this;
    var bouncer = this.state.loading? '':'hidden';
    var content = this.state.loading? 'hidden' : '';
    var btn_chrono = this.state.sorted? "active-btn btn-cul":"btn-cul";
    var btn_hasard = this.state.sorted? "btn-cul":"active-btn  btn-cul";

    return (
      <div>

        <div className="btn-cul-container">
          <div className={btn_hasard} onClick={this.handleHasard}>
            <h3>Au Hasard</h3>
          </div>
          <div className={btn_chrono} onClick={this.handleSorting} >
            <h3>Chronologique</h3>
          </div>
        </div>
        <span className={bouncer}>
          <div style={{display: "flex", justifyContent:"center", marginTop:"90px"}}>
            <BounceLoader
              color={'#ffe500'}
              loading={this.props.loading}
            />
          </div>
        </span>
        <span className={content}>
          <div className="emissions-container">
            {this.state.emissions.map(function(emission, index){
              return (
                <EmissionsList
                  emission={emission}
                  key={index}
                  parent={that}
                  play={that.play}
                />
              )
            })}
          </div>
        </span>
        <Player url={this.state.source.link} title={this.state.source.title}/>
      </div>
    )
  }
}

export default Emissions;
