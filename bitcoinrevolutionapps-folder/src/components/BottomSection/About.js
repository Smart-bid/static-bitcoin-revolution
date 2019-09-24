import React, {Component} from 'react'

export default class Aboutus extends Component {
    render() {
        let version = this.props.languageManager();

        return (
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
        )
    }
}