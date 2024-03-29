import React, { Component } from 'react'

import Header from './Header/Header'
import VideoPlayer from './VideoPlayer/VideoPlayer.js'
import Regform  from './Regform/Regform'

import video from './index.mp4'

export default class TopSection extends Component {
    constructor(props) {
        super(props)
        this.regPanel = React.createRef();
    }
    handleScroll() {
        let panel = this.regPanel.current;
        window.scrollTo({
            top: panel.offsetTop,
            left: 0,
            behavior: 'smooth'
        })
    }

    render() {
        let version = this.props.languageManager();

        return (
            <div className='TopSection'>
                <Header languageManager={this.props.languageManager} handleScroll={this.handleScroll.bind(this)}/>
                <section className="main-banner" id="video">
                    <div className="top-reg">
                        <VideoPlayer link={video} {...this.props}/>
                        <div className="regform" ref={this.regPanel}>
                            <div className="reg-title wow zoomIn">
                                <span className="orange">{version.topreg1} </span>
                                {version.topreg2}
                            </div>
                            <Regform {...this.props}/>
                        </div>
                    </div>
                    <h1 className="title wow zoomIn">
                        <strong className="b">{version.heading_title}</strong><br />{version.heading1_title}
                        <span className="blue-txt"><span className="free">{version.heading_free_title}</span> {version.heading2_title}</span>
                    </h1>
                </section>
            </div>
        )
    }
}
