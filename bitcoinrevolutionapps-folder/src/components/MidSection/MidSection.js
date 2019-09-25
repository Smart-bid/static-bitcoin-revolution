import React, {Component} from 'react'
import Team from "./Team"
import Reviews from "./Reviews"
import firstArticleImg from "../../versions/img/firstArticleImg.jpg";
import secondArticleImg from "../../versions/img/secondArticleImg.jpg";

export default class MidSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: {
                firstArticleImg,
                secondArticleImg,
            }
        }
    }
    render() {
        let version = this.props.languageManager();
        return (
            <div className="MidSection">

                <Team languageManager={this.props.languageManager}/>

                <div className="seperated-bg"></div>

                <Reviews languageManager={this.props.languageManager}/>

                <div className="articles-list" id="tech">
                    <div className="container">
                        <div className="list">
                            {
                                version.article_list.map((item, index) => {
                                    return (
                                        <div className="article-item" key={index}>
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
                                                    <img src={this.state.images[item.img]} alt={item.title}/>
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
