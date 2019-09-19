import React, { Component } from 'react'

export default class Team extends Component{
    render() {
        let version = this.props.version;
        return (
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
                                                <img src={item.img} alt=""/>
                                                <span className="absolute">{item.title}</span>
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
        )
    }
}