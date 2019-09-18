import React, {Component} from 'react'

import Regform from '../TopSection/Regform/Regform'

import facebookLogo from './images/logo-facebook.png'
import twitterLogo from './images/logo-twitter.png'


export default class BottomSection extends Component {

    constructor(props) {
        super(props);
        this.msg = null;
        let today = new Date(),
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        this.state = {
            notificationClass: 'fixed-notification',
            date: date
        };

        setInterval(() => {
            this.setState({notificationClass: (this.state.notificationClass === 'fixed-notification') ? 'fixed-notification hello' : 'fixed-notification'})
        }, 2000)
    }

    render() {
        let version = this.props.version;
        return (
            <div className='BottomSection'>
                <h2>{this.state.date}</h2>

                <div className="bottomreg">
                    <div className="container">
                        <div className="title">{version.bottomRegTitle}</div>
                        <div className="regform">
                            <div className="form-wrapper">
                                <form action="#">
                                    <div className="flex">
                                        <input className="inputfield fname" type="text" name="fname"
                                               placeholder={version.fname}/>
                                        <input className="inputfield lname" type="text" name="lname"
                                               placeholder={version.lname}/>
                                        <input className="inputfield email" type="text" name="email"
                                               placeholder={version.email}/>
                                    </div>
                                    <button className='start btn-submit'>{version.button}</button>
                                </form>
                            </div>
                            {/*<Regform*/}
                            {/*    handlePassSync={this.props.handlePassSync}*/}
                            {/*    form={this.props.form}*/}
                            {/*    pageHandler={this.props.pageHandler}*/}
                            {/*    countryCode={this.props.countryCode}*/}
                            {/*    version={this.props.version}*/}
                            {/*    handleForward={this.props.handleForward}*/}
                            {/*    handleStep={this.props.handleStep}*/}
                            {/*    handleSubmit={this.props.handleSubmit}*/}
                            {/*    step={this.props.step}/>*/}
                        </div>
                    </div>
                </div>

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

                <div className="about-us">
                    <div className="container">
                        <div className="info">
                            <h3>{version.aboutUsTitle}</h3>
                            <p>
                                {version.aboutUsDescr}
                            </p>
                        </div>
                    </div>
                    <div className="bg-img"></div>
                </div>

                <div className="bottom-section">
                    <div className="container">
                        <p>
                            {version.bottomInformation[0]}
                        </p>
                        <p>
                            {version.bottomInformation[1]}
                        </p>
                        <p>
                            {version.bottomInformation[2]}
                        </p>
                        <p>
                            {version.bottomInformation[3]}
                        </p>
                        <p>
                            {version.bottomInformation[4]}
                        </p>
                        <p>
                            {version.bottomInformation[5]}
                        </p>
                    </div>
                </div>

                <div className={this.state.notificationClass} ref="msg">
                    <div className="wrap">
                        <span><strong>{version.visitorAmount} </strong> {version.bottomVisitorNotification}</span>
                    </div>
                </div>
            </div>
        )
    }
}


