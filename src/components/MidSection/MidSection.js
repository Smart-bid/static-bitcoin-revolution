import React, { Component } from 'react'

import Team from "./Team"

export default class MidSection extends Component {
    render() {
    let version = this.props.version;

        return (
            <div className="MidSection">

                <Team version={this.props.version} />

                <div className="seperated-bg"></div>

                <div className="reviews">
                    <div className="container">
                        <div className="reviews-list">
                            {
                                version.reviews_item.map((item, index) => {
                                    return (
                                        <div className="review-item">
                                            <div className="wrap">
                                                <h4 className="user-name">
                                                    {item.name}
                                                </h4>
                                                <div className="descr">
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

                <div className="articles-list">
                    <div className="container">
                        <div className="list">
                            {
                                version.article_list.map((item, index) => {
                                    return (
                                        <div className="article-item" id={index}>
                                            <div className="wrap">
                                                <div className="info-col">
                                                    <h4 className="user-name">
                                                        {item.title}
                                                    </h4>
                                                    <p>
                                                        {item.descr}
                                                    </p>
                                                </div>
                                                <div className="image">
                                                    <img src={item.img} alt={item.title}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
