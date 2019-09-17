import React, { Component } from 'react'

export default class MidSection extends Component {
    render() {
    let version = this.props.version;

        return (
            <div className="MidSection">

                <div className="team">
                    <div className="container">
                        <h3 className="title">{version.team_title}</h3>
                        <div className="team-list">
                            {
                                version.team_members.map((item, index) => {
                                    return (
                                        <div className="item" key={index}>
                                            <div className="wrap">
                                                <div className="img">

                                                </div>
                                                <div className="descr">
                                                    <h4>{item.title}</h4>
                                                    <p>
                                                        {item.descr}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="seperated-bg"></div>

                <div className="reviews">
                    <div className="container">
                        <div className="reviews-list">

                        </div>
                    </div>
                </div>

                <div className="innersection">
                    <div className="content">
                        <div className="title">{version.mem_title}</div>
                        <div className="subtitle next">{version.mem_subtitle}</div>
                        <div className="rows">
                            <div className="top">
                                {
                                    version.mems.slice(0,2).map(item => {
                                        return (
                                            <div className="rich" key={item.name}>
                                                <div className="column">
                                                    <img src={item.img} alt={item.name}/>
                                                </div>
                                                <div className="column">
                                                    <div className="name">{item.name}</div>
                                                    <div className="text">{item.text}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="bottom">
                            {
                                    version.mems.slice(2,4).map(item => {
                                        return (
                                            <div className="rich" key={item.name}>
                                                <div className="column">
                                                    <img src={item.img} alt={item.name}/>
                                                </div>
                                                <div className="column">
                                                    <div className="name">{item.name}</div>
                                                    <div className="text">{item.text}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
