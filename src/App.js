import React, { Component } from 'react'
import ReactQueryParams from 'react-query-params'

//import * as LeadHandler from './helpers/leadHandler'

import TopSection from './components/TopSection/TopSection'
import MidSection from './components/MidSection/MidSection'
import BottomSection from './components/BottomSection/BottomSection'
//import Page from './pages/Page'

// Versions
//import * as Version from './versions'

// Pages
import * as Pages from './pages'

export default class App extends ReactQueryParams {
    constructor(props) {
        super(props);
        if (window.location.host.indexOf("localhost") > -1) {
            this.setQueryParams({
                validation: 3
            });
        }
        this.state = {
            step: 1,
            page: 'main'
        };
    }
    //According to Readme

    pageHandler= (page) => {
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

    handleForward = (params) => {
        this.props.handleLeadStep(params);
    };

    handleSubmit = (params) => {
        this.props.onSubmit(params);
    };

    render() {
        //let page = this.state.page;
        if (this.state.page === 'main') {
            return (
                <div className='App'>
                    <TopSection form={this.state.leadData} handlePassSync={this.handlePassSync}
                                countryCode={this.props.countryCode}
                                handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit}
                                pageHandler={this.pageHandler}
                                handleForward={this.handleForward}
                                languageManager={this.props.languageManager}
                                validateParams={this.props.validateParams}/>
                    <MidSection languageManager={this.props.languageManager}
                                validateParams={this.props.validateParams}/>
                    <BottomSection form={this.state.leadData} handlePassSync={this.handlePassSync}
                                   countryCode={this.state.countryCode}
                                   handleStep={this.handleStep} step={this.state.step} handleSubmit={this.handleSubmit}
                                   pageHandler={this.pageHandler}
                                   handleForward={this.handleForward}
                                   languageManager={this.props.languageManager}
                                   validateParams={this.props.validateParams}/>
                </div>
            )
        }
        // if (this.state.version) {
        //     else {
        //         return (
        //             <Page page={this.state.page} pageHandler={this.pageHandler}></Page>
        //         )
        //     }
        // } else {
        //     return null;
        // }
    }
}
