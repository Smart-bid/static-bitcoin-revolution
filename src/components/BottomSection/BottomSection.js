import React, {Component} from 'react'
import Socialproof from "./Socialproof";
import Aboutus from "./About";


export default class BottomSection extends Component {

    constructor(props) {
        super(props);
        let today = new Date(),
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        this.state = {
            notificationClass: 'fixed-notification',
            date: date
        };

        setInterval(() => {
            this.setState({notificationClass: (this.state.notificationClass === 'fixed-notification') ? 'fixed-notification blinks' : 'fixed-notification'})
        }, 5000)
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
                        </div>
                    </div>
                </div>

                <Socialproof version={this.props.version} />

                <Aboutus version={this.props.version} />

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


