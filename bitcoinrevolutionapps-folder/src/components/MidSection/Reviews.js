import React, { Component } from 'react'

export default class Team extends Component{
    render() {
        let version = this.props.languageManager();

        return (
            <div className="reviews">
                <div className="container">
                    <div className="reviews-list">
                        {
                            version.reviews_item.map((item, index) => {
                                return (
                                    <div className="review-item" key={index}>
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
        )
    }
}