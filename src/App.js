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
            form: {
                first_name: '',
                last_name: '',
                email: '',
            },
            errors: {},
            step: 1
        }
    }

    componentDidMount() {
        new WOW.WOW().init();
    }

    render() {

        return (
            <div className='App'>
                <TopSection {...this.props}
                            handleStep={(step) => this.setState({step})}
                            syncForms={(form) => this.setState({form})}
                            syncErrors={(errors) => this.setState({errors})}
                            syncState={this.state} />

                <MidSection languageManager={this.props.languageManager}/>

                <BottomSection {...this.props}
                               handleStep={(step) => this.setState({step})}
                               syncForms={(form) => this.setState({form})}
                               syncErrors={(errors) => this.setState({errors})}
                               syncState={this.state}/>
            </div>
        )
    }
}
