import React from 'react'
import ReactQueryParams from 'react-query-params'
import WOW from 'wowjs'

import TopSection from './components/TopSection/TopSection'
import MidSection from './components/MidSection/MidSection'
import BottomSection from './components/BottomSection/BottomSection'

// Pages
import * as Pages from './pages'

export default class App extends ReactQueryParams {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            page: 'main',
            passwordEmpty: false,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            tel: "",
            errors: [],
            errorIndexes: [0,1,2,3],
            rule: false
        };
    }

    componentDidMount() {
        new WOW.WOW().init();

        if (window.location.host.indexOf("localhost") > -1) {
            this.setQueryParams({
                validation: 3
            });
        }
    }

    //According to Readme
    pageHandler = (page) => {
        window.scrollTo(0, 0);
        switch (page) {
            default:
                this.setState({page: 'main'});
                break;
            case 'terms':
                this.setState({page: Pages.terms});
                break;
            case 'privacy':
                this.setState({page: Pages.privacy});
                break;
            case 'gov':
                this.setState({page: Pages.gov});
                break;
            case 'disc':
                this.setState({page: Pages.disc});
                break;
            case 'spam':
                this.setState({page: Pages.spam});
                break;
        }
    };

    handleStep = (step) => {
        this.setState({step})
    };

    handChangePassEmpty = () => {
        this.setState({
            passwordEmpty: true,
        });
    }

    handleForward = (params) => {
        this.props.handleLeadStep(params);
    };

    handleSubmit = (params) => {
        this.props.onSubmit(params)
            .then(() => this.setState({ step: 1 }))
    };

    getInpData = (name, value, errors, rule, errorIndexes) => {
        this.setState({
            [name]: value.replace(/^\s+|\s/g, ''),
            errors: errors,
            rule: rule,
            errorIndexes: errorIndexes
        })
        //console.log(this.state.errorIndexes);
    };

    getInpNum = (number) => {
        if(number.length <= 15) {
            this.setState({
                tel: number,
            })
        }
    }

    render() {
        if (this.state.page === 'main') {
            return (
                <div className='App'>
                    <TopSection form={this.state.leadData} handlePassSync={this.handlePassSync}
                                countryCode={this.props.countryCode}
                                handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit}
                                pageHandler={this.pageHandler}
                                handleForward={this.handleForward}
                                languageManager={this.props.languageManager}
                                validateParams={this.props.validateParams}
                                getInpData={this.getInpData}
                                getInpNum={this.getInpNum}
                                state={this.state}
                                handChangePassEmpty={this.handChangePassEmpty}
                    />
                    <MidSection languageManager={this.props.languageManager}
                                validateParams={this.props.validateParams}/>
                    <BottomSection form={this.state.leadData} handlePassSync={this.handlePassSync}
                                   countryCode={this.props.countryCode}
                                   handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit}
                                   pageHandler={this.pageHandler}
                                   handleForward={this.handleForward}
                                   languageManager={this.props.languageManager}
                                   validateParams={this.props.validateParams}
                                   getInpData={this.getInpData}
                                   getInpNum={this.getInpNum}
                                   state={this.state}
                                   handChangePassEmpty={this.handChangePassEmpty}
                    />
                </div>
            )
        }
    }
}
