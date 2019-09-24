import React, {Component} from 'react'
import Socialproof from "./Socialproof";
import Aboutus from "./About";
import deby from '../../versions/img/da.jpg'
import marina from '../../versions/img/ma.jpg'
import george from '../../versions/img/gh.jpg'


export default class BottomSection extends Component {

    constructor(props) {
        super(props);
        var random = this.rand();
        this.state = {
            random: random,
            notificationClass: 'fixed-notification',
            images: {
                deby,
                marina,
                george,
            }
        };

        setInterval(() => {
            this.setState({notificationClass: (this.state.notificationClass === 'fixed-notification') ? 'fixed-notification blinks' : 'fixed-notification'})
        }, 5000)
    }

    rand() {
        const random = Math.floor(Math.random() * 3);
        return random;
    }
    componentDidMount() {
        const _this = this;
        this.timer = setInterval(function(){
            var random = _this.rand();
            _this.setState({
                random: random,
            })
        },1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let version = this.props.languageManager();
        return (
            <div className='BottomSection'>
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

                <Socialproof languageManager={this.props.languageManager} />

                <Aboutus languageManager={this.props.languageManager} />

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

                <div className="how-much">
                    <div className="wrap">
                        <div className="flex">
                            <div className="image">
                                <img src={this.state.images[version.customer[this.state.random].img]} alt=""/>
                            </div>
                            <div className="info">
                                <strong className="name">{version.customer[this.state.random].name}</strong>
                                <div className="earn">{version.customer[this.state.random].earn}</div>
                            </div>
                        </div>
                        <span className="close"></span>
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


