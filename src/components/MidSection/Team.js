import React, { Component } from 'react'

import team_1 from "../../versions/img/team/1.jpg"
import team_2 from "../../versions/img/team/2.jpg"
import team_3 from "../../versions/img/team/3.jpg"

export default class Team extends Component{
    constructor(props) {
        super(props)
        this.state = {
            images: {
                team_1,
                team_2,
                team_3,
            }
        }
    }
    render() {
        let version = this.props.languageManager();

        return (
            <div className="team" id="Team">
                <div className="container">
                    <h3 className="title">{version.team_title}</h3>
                    <div className="team-list">
                        {
                            version.team_members.map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <div className="wrap">
                                            <div className="img">
                                                <img src={this.state.images[item.img]} alt=""/>
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