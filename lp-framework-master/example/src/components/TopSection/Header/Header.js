import React, { Component } from 'react'

import logo from './logo.png'

export default class Header extends Component {
    render() {
        let version = this.props.version;

        return (
            <section className='Header'>
                <div className="content">
                    <a href="/">
                        <img src={logo} alt="logo"/>
                    </a>
                    <nav className="navigation">
                        <ul>
                            <li>
                                <a href="#video">Intro</a>
                            </li>
                            <li>
                                <a href="#Team">Our Team</a>
                            </li>
                            <li>
                                <a href="#tech">The Technology</a>
                            </li>
                            <li>
                                <a href="#Testimonals">Testimonals</a>
                            </li>
                        </ul>
                    </nav>

                    <div className="btcwdgt-price"></div>
                    {/*<div className="title">{version.title}</div>*/}
                    {/*<div className="subtitle">*/}
                    {/*    <span onClick={this.props.handleScroll}>{version.subtitle}</span>{version.span[0]} <br/> {version.span[1]}*/}
                    {/*</div>*/}
                 </div>   
            </section>
        )
    }
}
