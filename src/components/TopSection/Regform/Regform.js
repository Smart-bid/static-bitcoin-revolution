import React, { Component } from 'react'

import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import logo from '../../TopSection/Header/logo.png'


export default class Regform extends Component {
    constructor(props) {
        super(props);

        this.passtest =  {};

        ['invalidlength', 'nospecial', 'nolowercase', 'nouppercase', 'nonumber'].map((err, index) => this.passtest[err] = this.props.languageManager().passtest[index])

    }

    componentDidMount() {
        let phoneField = document.querySelector("input[type='tel']");
        phoneField.setAttribute("name", "phone_number")
    }

    updateValue(value, key, callback) {
        let obj = {},
            tempForm = this.props.syncState.form
        obj[key] = value
        Object.assign(tempForm, obj)

        new Promise((resolve, reject) => resolve(this.props.syncForms(tempForm))).then(callback)
    }

    handleForward() {
        let validate = this.props.validateParams(this.props.syncState.form)

        if (validate.success) {
            if(this.props.syncState.step === 1) this.updateValue("", 'password')
            if(this.props.syncState.step === 2) this.updateValue("", 'phone_number')

            this.props.setLeadData(this.props.syncState.form)
            .then(this.props.handleStep(this.props.syncState.step + 1))
            .then(() => { if (this.props.syncState.step === 2) this.props.handleLeadStep() })
            .then(() => this.props.syncErrors({password: {empty: true}}))
        } else this.props.syncErrors(validate.errors)
    }

    handleSubmit() {
        // this.props.handleStep(this.props.syncState.step + 1)
        let validate = this.props.validateParams(this.props.syncState.form);

        if(validate.success) {
            this.props.setLeadData(this.props.syncState.form)
                .then(this.props.handleSubmit)
                .then(res => (res.redirectUrl) ? window.location = res.redirectUrl : this.props.syncErrors({responseError: res.error}),this.props.handleStep(this.props.syncState.step + 1))
                .then(this.props.handleStep(5))
        } else this.props.syncErrors(validate.errors)

    }

    checkPass(pass) {
        let valid = this.props.validateInput({password: pass})
        this.props.syncErrors(valid)
    }

    render() {
        const {
            email,
            first_name,
            last_name,
            password,
            phone_number
        } = this.props.syncState.form;
        let languageManager = this.props.languageManager(),
            errorMsgs = (this.props.syncState.errors) ? Object.keys(this.props.syncState.errors).map(key => {
                if (this.props.syncState.errors[key].messages) return this.props.syncState.errors[key].messages
            }).filter(value => value) : []
        if (this.props.syncState.step <= 3) {
            return (
                <div className={"Regform" + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>
                    <div className='inner'>
                        <div className={'form-wrapper one' + ((this.props.syncState.step > 1) ? ' step' : '')}>
                            <div style={{width: 100+'%'}}>
                                <div className="errors-wrapper">
                                    {errorMsgs.map(arr => arr.map(error => <div key={error} className="errors">{error}</div>))}
                                </div>
                                <input className="inputfield fname"
                                       type="text"
                                       name="first_name"
                                       placeholder={languageManager.fname}
                                       value={first_name}
                                       onChange={e => this.updateValue(e.target.value, 'first_name')}/>
                                <input className="inputfield lname"
                                       type="text"
                                       name="last_name"
                                       placeholder={languageManager.lname}
                                       value={last_name}
                                       onChange={e => this.updateValue(e.target.value, 'last_name')}/>
                                <input className="inputfield email"
                                       type="text"
                                       name="email"
                                       placeholder={languageManager.email}
                                       autoComplete='off'
                                       value={email}
                                       onChange={e => this.updateValue(e.target.value, 'email')}/>
                                <button onClick={this.handleForward.bind(this)}
                                        className='start'>{languageManager.button}</button>
                            </div>

                        </div>
                        <div className={'form-wrapper two' + ((this.props.syncState.step > 2) ? ' step' : '')}>
                            <input className="inputfield pass"
                                   type="password"
                                   name="password"
                                   maxLength="8"
                                   defaultValue={password}
                                   placeholder={languageManager.pass}
                                   onChange={e => this.updateValue(e.target.value, 'password', this.checkPass(e.target.value))}/>
                            <ul className='req'>
                                {Object.keys(this.passtest).map(key => {
                                    return (<li className={(this.props.syncState.errors.password && (this.props.syncState.errors.password[key] || this.props.syncState.errors.password.empty)) ? '' : 'ok'} key={key}>{languageManager.passtest[key]}</li>)
                                })}
                            </ul>
                            <button onClick={this.handleForward.bind(this)} className='start'>{languageManager.button}</button>
                        </div>
                        <div className='form-wrapper three'>
                            <div className="errors-wrapper">
                                {errorMsgs.map(arr => arr.map(error => <div key={error} className="errors">{error}</div>))}
                            </div>
                            <IntlTelInput
                                preferredCountries={[this.props.countryCode]}
                                defaultCountry={this.props.countryCode.toLowerCase()}
                                containerClassName="intl-tel-input"
                                inputClassName="inputfield tel"
                                autoPlaceholder={true}
                                separateDialCode={true}
                                value={phone_number}
                                onPhoneNumberChange={(a, value, b) => {value = value.replace(/\D/g,''); this.updateValue(value, 'phone_number')}}
                            />
                            <button onClick={this.handleSubmit.bind(this)} className='start'>{languageManager.button_last}</button>
                        </div>
                    </div>
                    <div className="error">
                        {/*<Mark className='excl'/><span></span>*/}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="Regform last-step">
                    <div className="inner">
                        {(this.props.syncState.step === 4) ?
                            <div className="form-wrapper">
                                <img src={logo} alt="lodaing" className="loading"/>
                            </div> :

                            <div className="form-wrapper">
                                <span className="response_error">{this.props.syncState.errors.responseError}</span>
                                <button className='start' onClick={() => this.props.handleStep(1)}>OK</button>
                            </div>

                        }
                    </div>
                </div>
            )
        }
    }
}