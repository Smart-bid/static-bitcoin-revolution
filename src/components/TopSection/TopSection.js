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
        console.log(panel.offsetTop)
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
                        <VideoPlayer link={video} version={version} />
                        <div className="regform" ref={this.regPanel}>
                            <div className="reg-title wow zoomIn">
                                <span className="orange">{version.topreg1} </span>
                                {version.topreg2}
                            </div>
                            <Regform
                                handlePassSync={this.props.handlePassSync}
                                form={this.props.form}
                                pageHandler={this.props.pageHandler}
                                countryCode={this.props.countryCode}
                                languageManager={this.props.languageManager}
                                handleStep={this.props.handleStep}
                                handleForward={this.props.handleForward}
                                handleSubmit={this.props.handleSubmit}
                                step={this.props.step}
                                validateParams={this.props.validateParams}
                                getInpData={this.props.getInpData}
                                getInpNum={this.props.getInpNum}
                                state={this.props.state}
                            />
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
