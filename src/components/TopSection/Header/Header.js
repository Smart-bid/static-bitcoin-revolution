import React, {Component} from 'react'
import logo from './logo.png'

export default class Header extends Component {
    render() {
        let version = this.props.languageManager();
        return (
            <section className='Header'>
                <div className="content">
                    <a href="/">
                        <img src={logo} alt="logo"/>
                    </a>
                    <nav className="navigation">
                        <ul>
                            {
                                version.menu_items.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <a href={item.link}>{item.name}</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                    <div className="fixed-bitcoin-rate w-hidden-medium w-hidden-small w-hidden-tiny w-embed">
                        <div className="btcwdgt-price"></div>
                    </div>
                </div>
            </section>
        )
    }
}
