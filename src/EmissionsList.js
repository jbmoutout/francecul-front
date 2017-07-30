import React, { Component } from 'react';
import strftime from 'strftime';

class EmissionsList extends Component {

  state = {
    limit: 300,
    showMore: true
  }

  showMore = (e) => {
    e.preventDefault();
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true)
    this.setState({limit: 1000, showMore: false})
  }

  renderButton = (description) => {
    if (this.state.showMore && description.length > 320 ) {
      return (
        <h4 style={{textDecoration: "none", textAlign: "right"}} onClick={this.showMore}>(+)</h4>
      )
    }else{
      return null
    }
  }



  render() {
    var emission = this.props.emission;
    var variable_description = emission.description.slice(0,this.state.limit);
    return (
      <div>
        {/* <a href={emission.link}> */}
        <div className="party-container" onClick={this.props.play.bind(this, emission)}>
          <h4>{emission.title}</h4>
          <p style={{fontFamily: "Avenir Next Bold, sans-serif"}}>
            {strftime("%d %b. %Y", new Date(emission.date))}
          </p>
          <p className="emission-description">
            {variable_description}
          </p>
          {this.renderButton(emission.description)}
        </div>
        {/* </a> */}
      </div>
    )
  }
}

export default EmissionsList;
