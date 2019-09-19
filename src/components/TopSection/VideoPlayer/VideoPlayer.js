import React, { Component } from 'react'
import ReactPlayer from 'react-player'

import poster from './poster.jpg'
 
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    var date = this.currentDate();
    this.state = {
       play: false,
       time: date
    }
  }
  handlePlay(e) {
    if (window.sbidTracking) {
        window.sbidTracking.settings.params.video_play = "1";
    }
    e.target.parentElement.parentElement.style.display = 'none';
    this.setState({play: true});
  }

  currentDate() {
      let stamp = new Date().getTime(),
          date = `\/Date(${stamp})\/`,
          nowDate = new Date(parseInt(date.substr(6))),
          result = "";
          result += nowDate.format("dddd, mmmm d, yyyy");
      return result;
  }


  render () {
    let version = this.props.version;

    return (
      <div className="VideoPlayer">
          <div className="current-time">
              <span>{this.state.time}</span>
          </div>
        {/*<div className="info">*/}
        {/*  <div className="inner">*/}
        {/*    <div className="text">{version.video}</div>*/}
        {/*    <img src={btn} alt="play" onClick={this.handlePlay.bind(this)}/>*/}
        {/*  </div>*/}
        {/*</div>*/}
        <ReactPlayer
            url={this.props.link}
            fileConfig={{
              attributes: {
                poster: poster
              }
            }}
            playing={this.state.play}
            controls={true}
            width='99.8%'
            height='100%'
        />
      </div>
    )
  }
}