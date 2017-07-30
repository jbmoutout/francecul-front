import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import Duration from './Duration'
import './Range.css';
import play_btn from './assets/images/play.png'
import pause_btn from './assets/images/pause.png'

class Player extends Component {
  state = {
    playing: false,
    volume: 0.8,
    duration: 0,
    played: 0,
    playedSeconds: 0
  }

  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  setVolume = e => {
   this.setState({ volume: parseFloat(e.target.value) })
 }

  onProgress = (state) => {
    this.setState(state)
  }


  render() {
    const {
      url, playing, volume,
      played, loaded, duration,
      playbackRate,
      soundcloudConfig,
      vimeoConfig,
      youtubeConfig,
      fileConfig
    } = this.state
    const SEPARATOR = ' · '
    return (
      <div className="party-player">
        <button className="party-btn" onClick={this.playPause}>
          {playing ?
            <img src={pause_btn} width='50%' style={{paddingTop: "5px"}}
            />:
            <img src={play_btn} width='50%' style={{paddingTop: "5px",paddingLeft: "6px",}}
            />}
        </button>

        <section className='section'>
          <div className='player-wrapper'>

            <ReactPlayer
              ref={player => { this.player = player }}
              url={this.props.url}
              playing={playing}
              className='react-player'
              onProgress={this.onProgress}
              volume={volume}
              onReady={() => this.setState({ playing: true })}

              onDuration={duration => this.setState({ duration })}

            />
            <div style={{marginLeft: "10%"}}>
              <div style={{height: "40px"}}><h4>{this.props.title || "FranceCul"}</h4></div>
              <div style={{position: "relative"}}><progress max={1} value={this.state.played} />
                <div style={{position: "absolute", right:0  }}><Duration seconds={duration} /></div>
                <div style={{position: "absolute", left:0  }}><Duration seconds={this.state.playedSeconds} /></div>
              </div>
            </div>
          </div>
        </section>
      </div>
        )
  }
}

export default Player;
