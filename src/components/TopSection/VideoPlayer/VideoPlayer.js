import React, {Component} from 'react'
import ReactPlayer from 'react-player'


import poster from './poster.jpg'

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        var date = this.currentDate();
        this.state = {
            removePoster: '',
            play: false,
            time: date
        }
    }

    handlePlay() {
        this.setState({ play: true });
    }

    currentDate() {
        let stamp = new Date().getTime(),
            date = `\/Date(${stamp})\/`,
            nowDate = new Date(parseInt(date.substr(6))),
            result = "";
        result += nowDate.format("dddd, mmmm d, yyyy");
        return result;
    }


    render() {
        return (
            <div className={`VideoPlayer ${this.state.removePoster === true ? 'active': ''}`}>
                <div className="current-time">
                    <span>{this.state.time}</span>
                </div>
                <ReactPlayer
                    url={this.props.link}
                    playing={this.state.play}
                    controls={true}
                    width='99.8%'
                    height='100%'
                    onClick={()=>{
                        this.setState({removePoster: true})
                    }}
                />
            </div>
        )
    }
}