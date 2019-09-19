import React, {Component} from 'react'

import facebookLogo from "./images/logo-facebook.png";
import twitterLogo from "./images/logo-twitter.png";

export default class Socialproof extends Component {

    render() {
        let version = this.props.version;

        return (
            <div className="social-proof">
                <div className="container">
                    <h3 className="section-heading">{version.socialProof}</h3>
                    <div className="wrapper-social-networks">
                        <div className="facebook social">
                            <img src={facebookLogo} alt="" className="social-icon"/>
                            <div className="post-list">
                                {
                                    version.facebook_list.map((item, index) => {
                                        return (
                                            <div className="post" id={index}>
                                                <div className="wrap">
                                                    <div className="profile-info">
                                                        <div className="img">
                                                            <img src={item.img} alt={item.personName}/>
                                                        </div>
                                                        <div className="name">
                                                            <span className="title">{item.personName}</span>
                                                            <span className="time">{item.minAgo}</span>
                                                        </div>
                                                    </div>
                                                    <div className="descr">
                                                        <p>{item.comment}</p>
                                                        <div className="likes">
                                                            <span>{item.likes}</span>
                                                        </div>
                                                    </div>
                                                    <div className="control-panel">
                                                        <div className="like icon">
                                                            <span>{item.likeName}</span>
                                                        </div>
                                                        <div className="comment icon">
                                                            <span>{item.commentName}</span>
                                                        </div>
                                                        <div className="share icon">
                                                            <span>{item.shareName}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="twitter social">
                            <img src={twitterLogo} alt="" className="social-icon"/>
                            <div className="post-list">
                                {
                                    version.twitter_list.map((item, index) => {
                                        return (
                                            <div className="post" id={index}>
                                                <div className="wrap">
                                                    <div className="profile-info">
                                                        <div className="img">
                                                            <img src={item.img} alt={item.personName}/>
                                                        </div>
                                                        <div className="name">
                                                            <span className="title">{item.personName}</span>
                                                            <span className="profile-link">{item.socialLink}</span>
                                                        </div>
                                                    </div>
                                                    <div className="descr">
                                                        <p>{item.comment}</p>
                                                    </div>
                                                    <div className="control-panel"></div>
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