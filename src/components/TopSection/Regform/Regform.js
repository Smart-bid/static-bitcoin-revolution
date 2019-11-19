import React, { Component } from 'react'

import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import logo from '../../TopSection/Header/logo.png'


export default class Regform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            check: false,
            password: "",
            passwordEmpty: false,
            country_name: "",
            tel: "",
            agree_1: true,
            agree_2: true,
            phone_country_prefix: "",
            errorIndexes: [0,1,2,3],
            errors: '',
            passwordErrors: {
                invalidlength: true,
                nolowercase: true,
                nonumber: true,
                nouppercase: true,
                empty: true
            }
        };

        this.setTextInputRef = element => {
            this.currentForm = element;
        };
        this.currentForm = null;
        this.infoBox = React.createRef();
        this.handleBackwards = this.handleBackwards.bind(this);
    }

    handleSelectFlag = (num, country) => {
        this.setState({
            phone_country_prefix: '+' + country.dialCode
        });
    }

    handleForward(e) {
        let form = e.target.parentElement;
        let paramsToValidate = {};

        // Step 1 or 2
        if(this.props.step === 1 || this.props.step === 2){
            // Step 1
            if(this.props.step === 1){
                paramsToValidate = {
                    email: !this.props.state.rule ? this.state.email : this.props.state.email,
                    first_name: !this.props.state.rule ? this.state.first_name : this.props.state.first_name,
                    last_name: !this.props.state.rule ? this.state.last_name : this.props.state.last_name,
                    agree_2: this.state.agree_2,
                    funnel_name: window.location.origin
                };
                let checkParams = this.props.validateParams(paramsToValidate);

                if (checkParams.success) {
                    this.props.setLeadData(paramsToValidate).then(this.props.handleLeadStep(), this.props.handleStep(this.props.step + 1));
                } else {
                    const fieldWithMessages = Object.keys(checkParams.errors).find(field => checkParams.errors[field].hasOwnProperty('messages'));
                    const firstError = checkParams.errors[fieldWithMessages].messages[0];
                    this.setState({
                        errors: firstError
                    })
                }
            }

            // Step 2
            else if (this.props.step === 2) {
                paramsToValidate = {
                    password: !this.props.state.rule ? this.state.password : this.props.state.password,
                };
            }

            let submitPassword = this.props.validateParams(paramsToValidate);

            if (submitPassword.success) {
                this.props.setLeadData(paramsToValidate).then(this.props.handleLeadStep(), this.props.handleStep(this.props.step + 1));
            }
        }
        // Step 3
        else if (this.props.step === 3) {
            let tel = form.querySelector('.tel'),
                phone_number = tel.value;

            if(!this.phoneValidate(phone_number)) {
                this.setState({
                    errors: ["Enter only numbers"]
                })
                return this.state.errors
            }

            if(phone_number.length > 3 ) {
                paramsToValidate = {
                    phone_number:  phone_number,
                    phone_country_prefix: this.state.phone_country_prefix
                };

                let submitPhone = this.props.validateParams(paramsToValidate);
                if (submitPhone.success) {
                    this.props.setLeadData(paramsToValidate).then(this.props.handleSubmit(), this.props.handleStep(this.props.step + 1));
                    this.setState({
                        errors: []
                    });
                } else{
                    this.setState({
                        errors: submitPhone.errors
                    })
                }
            } else {
                this.setState({
                    errors: ['Enter phone number']
                });
                return this.state.errors
            }
        }
    }

    phoneValidate = (value) => {
        return !/[^0-9\-\/]/.test(value);
    }

    handleBackwards() {
        let forms = [...document.querySelectorAll('.Regform')];
        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step) => {
                step.classList.remove('step');
            })
        });
        this.props.handleStep(1);
    }

    componentDidUpdate() {
        let forms = [...document.querySelectorAll('.Regform')];
        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                if (index+1 === this.props.step-1) {
                    step.classList.add('step');
                }
            })
        })
    }

    handleStepChange = (name, value) => {
        let errors = null;
        if (name === 'password') {
            const { handChangePassEmpty } = this.props;
            handChangePassEmpty();
            const checkPassword = this.props.validateParams({
                password: value
            });
            if (checkPassword.errors) {
                this.setState({
                    passwordErrors:  checkPassword.errors.password
                })
            }
        }
        this.props.getInpData(name, value, errors, true, errors);
        this.setState({[name]: value.replace(/^\s+|\s/g, ''), errors});
    };

    render() {
        const {
            first_name,
            last_name,
            email,
            password,
            //errors,
            errorIndexes,
            tel,
            passwordEmpty,
        } = this.props.state;

        const { errors } = this.state;
        const checkedErrors = errors && errors.length;

        let languageManager = this.props.languageManager();
        if (this.props.step <= 3) {
            return (
                <div className={"Regform " + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>
                    <div className='inner'>
                        <div className='form-wrapper one'>
                            {this.state.errors && <div className="errors" style={{color: '#ff3215'}}>
                                {this.state.errors}
                            </div>}
                            <input className="inputfield fname" type="text" name="first_name" value={first_name} placeholder={languageManager.fname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            <input className="inputfield lname" type="text" name="last_name" value={last_name} placeholder={languageManager.lname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            <input className="inputfield email" type="text" name="email" value={email} placeholder={languageManager.email} autoComplete='off' onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            <button onClick={this.handleForward.bind(this)} className='start'>{languageManager.button}</button>
                        </div>
                        <div className='form-wrapper two'>
                            <input className="inputfield pass" type="password" value={password} maxLength="8" onChange={(e) => this.handleStepChange(e.target.name, e.target.value)} name="password" placeholder={languageManager.pass}/>
                            <ul className='req'>
                                {Object.keys(languageManager.passtest).map((validationRule, index) => {
                                    return (<li key={index} className={this.state.passwordErrors[validationRule] ? 'list' : passwordEmpty ? 'ok' : 'list'}>
                                        {languageManager.passtest[validationRule]}
                                    </li>)
                                })}
                            </ul>
                            <button onClick={this.handleForward.bind(this)} className='start'>{languageManager.button}</button>
                        </div>
                        <div className='form-wrapper three'>
                            {/*{this.state.errors && <div style={{color: '#ff3215'}}>*/}
                            {/*    {this.state.errors[0]}*/}
                            {/*</div>}*/}
                            <IntlTelInput
                                //preferredCountries={[this.props.countryCode]}
                                containerClassName="intl-tel-input"
                                inputClassName="inputfield tel"
                                autoPlaceholder={true}
                                separateDialCode={true}
                                onSelectFlag={this.handleSelectFlag}
                                defaultCountry={this.props.countryCode.toLowerCase()}
                                onPhoneNumberChange={(status, value, countryData, number, id) => {
                                    this.props.getInpNum(value)
                                    if(value.length <=15) {
                                        this.setState({
                                            phone_country_prefix: `+${countryData.dialCode}`,
                                            dynamicNum: value.replace(/[^0-9]/g, '')
                                        })
                                    }
                                }}
                                value = {tel.replace(/[^0-9]/g, '')}
                            />
                            <button onClick={this.handleForward.bind(this)} className='start'>{languageManager.button_last}</button>
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
                        <div className='form-wrapper three last-step-logo'>
                            <img src={logo} className="logo" alt=""/>
                        </div>
                    </div>
                </div>

            )
        }
    }
}