import React, {Component} from 'react'

//Facebook Import Images
import facebookLogo from "./images/logo-facebook.png";
import JoanneBowyer from "../../versions/img/social-avatars/facebook-profile1.jpg";
import StevenHerold from "../../versions/img/social-avatars/facebook-profile2.jpg";
import SylviaSchuler from "../../versions/img/social-avatars/facebook-profile3.jpg";
import RhondaLee from "../../versions/img/social-avatars/facebook-profile4.jpg";
//Twiiter Import Images
import twitterLogo from "./images/logo-twitter.png";
import JuanitaBrewer from "../../versions/img/social-avatars/twitter-profile1.jpg";
import RudyPerkins from "../../versions/img/social-avatars/twitter-profile2.jpg";
import ClarkRoss from "../../versions/img/social-avatars/twitter-profile3.jpg";

export default class Socialproof extends Component {

    constructor(props) {
        super(props);
        var date= this.getTimeString();
        this.state= {
            time: date,
            facebook_images: {
                JoanneBowyer,
                StevenHerold,
                SylviaSchuler,
                RhondaLee
            },
            twitter_images: {
                JuanitaBrewer,
                RudyPerkins,
                ClarkRoss
            }
        }
    }
    getTimeString() {
        const date = new Date().getDate() + '/' + "0" +(new Date().getMonth() + 1) + '/' + new Date().getFullYear() + " " + new Date( Date.now()).toLocaleTimeString();
        return date;
    }
    componentDidMount() {
        const _this = this;
        this.timer = setInterval(function(){
            var date = _this.getTimeString();
            _this.setState({
                time: date
            })
        },1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let version = this.props.languageManager();

        return (
            <div className="social-proof">
                <div className="container">
                    <h3 className="section-heading">{version.socialProof}</h3>
                    <div className="time">
                        <p>{this.state.time}</p>
                    </div>
                    <div className="wrapper-social-networks">
                        <div className="facebook social">
                            <img src={facebookLogo} alt="" className="social-icon"/>
                            <div className="post-list">
                                {
                                    version.facebook_list.map((item, index) => {
                                        return (
                                            <div className="post" key={index}>
                                                <div className="wrap">
                                                    <div className="profile-info">
                                                        <div className="img">
                                                            <img src={this.state.facebook_images[item.img]} alt={item.personName}/>
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
                                            <div className="post" key={index}>
                                                <div className="wrap">
                                                    <div className="profile-info">
                                                        <div className="img">
                                                            <img src={this.state.twitter_images[item.img]} alt={item.personName}/>
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