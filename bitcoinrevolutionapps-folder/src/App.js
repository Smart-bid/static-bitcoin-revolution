import React, { Component } from 'react'
import ReactQueryParams from 'react-query-params'

import * as LeadHandler from './helpers/leadHandler'

import TopSection from './components/TopSection/TopSection'
import MidSection from './components/MidSection/MidSection'
import BottomSection from './components/BottomSection/BottomSection'
import Page from './pages/Page'

// Versions
import * as Version from './versions'

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

        //this.handleStep = this.handleStep.bind(this);
        //this.pageHandler = this.pageHandler.bind(this);
        //this.handleForward = this.handleForward.bind(this);
        //this.handlePassSync = this.handlePassSync.bind(this);
    }

    // handlePassSync(value) {
    //     this.setState({
    //         leadData: {
    //             ...this.state.leadData,
    //             password: value
    //         }
    //     });
    // }

    // updateState(countryCode, version, phonePrefix, lang) {
    //     this.setState({
    //         version: version,
    //         countryCode: countryCode,
    //         leadData: {...this.state.leadData,
    //             phone_country_prefix: (phonePrefix.indexOf("+") > 0 ? "+" : "") + (phonePrefix ? phonePrefix.toString() : ""),
    //             language: lang
    //         }
    //     });
    // }

    // readTextFile = (file, callback) => {
    //     let rawFile = new XMLHttpRequest();
    //     rawFile.open("GET", file, false);
    //     rawFile.onreadystatechange = () => {
    //         if (rawFile.readyState === 4) {
    //             if (rawFile.status === 200 || rawFile.status == 0) {
    //                 let allText = rawFile.responseText;
    //
    //                 const countriesJSON = LeadHandler.csvJSON(allText);
    //                 this.setState({
    //                     countriesData: countriesJSON
    //                 }, () => {
    //                     callback();
    //                 });
    //             }
    //         }
    //     };
    //     rawFile.send(null);
    // };
    //
    // updateStateByLanguage = (lang, countryCode, phonePrefix) => {
    //     switch (lang) {
    //         default:
    //             this.updateState(countryCode, Version.en, phonePrefix, 'en');
    //             break;
    //         case 'DK':
    //             this.updateState(countryCode, Version.dk, phonePrefix, 'da');
    //             break;
    //         case 'EN':
    //             this.updateState(countryCode, Version.en, phonePrefix, 'en');
    //             break;
    //         case 'NL':
    //             this.updateState(countryCode, Version.nl, phonePrefix, 'nl');
    //             break;
    //         case 'AU':
    //             this.updateState(countryCode, Version.en, phonePrefix, 'en');
    //             break;
    //         case 'SG':
    //             this.updateState(countryCode, Version.en, phonePrefix, 'en');
    //             break;
    //         case 'FI':
    //             this.updateState(countryCode, Version.fi, phonePrefix, 'fi');
    //             break;
    //         case 'SV':
    //             this.updateState(countryCode, Version.sv, phonePrefix, 'sv');
    //             break;
    //         case 'DE':
    //             this.updateState(countryCode, Version.de, phonePrefix, 'de');
    //             break;
    //         case 'PL':
    //             this.updateState(countryCode, Version.pl, phonePrefix, 'pl');
    //             break;
    //         case 'ES':
    //             this.updateState(countryCode, Version.es, phonePrefix, 'es');
    //             break;
    //         case 'IT':
    //             this.updateState(countryCode, Version.it, phonePrefix, 'it');
    //             break;
    //     }
    // };
    //
    // componentDidMount() {
    //     const file = require("./helpers/countries.csv");
    //     this.readTextFile(file, () => {
    //         if (this.queryParams.lan) {
    //             let country = this.state.countriesData.filter(c => {
    //                 return c["ISO 3166-1 2 Letter Code"] === this.queryParams.lang.toUpperCase()
    //             })[0];
    //
    //             if (country) {
    //                 let lang = country["ISO 3166-1 2 Letter Code"];
    //                 let countryCode = country["ISO 3166-1 2 Letter Code"];
    //                 let phonePrefix = country["ITU-T Telephone Code"];
    //
    //                 this.updateStateByLanguage(lang, countryCode, phonePrefix);
    //             }
    //             else {
    //                 this.updateStateByLanguage('DK', 'DK', '45');
    //             }
    //         }
    //         else {
    //             LeadHandler.postData('/language').then(res => {
    //                 let phonePrefix = '+' + this.state.countriesData.filter(c => {
    //                     return c["ISO 3166-1 2 Letter Code"] === res.countryCode
    //                 })[0]['ITU-T Telephone Code'];
    //                 // this.setQueryParams({lan: res.lang});
    //                 this.updateStateByLanguage(res.lang, res.countryCode, phonePrefix);
    //                 return res.countryCode;
    //             });
    //         }
    //     });
    // }

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
