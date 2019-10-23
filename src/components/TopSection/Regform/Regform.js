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
            tel: "",
            agree_1: true,
            agree_2: true,
            phone_country_prefix: "",
            errorIndexes: [0,1,2,3],
            errors: []
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
                    agree_2: this.state.agree_2
                };
            }
            // Step 2
            else if (this.props.step === 2) {
                paramsToValidate = {
                    password: !this.props.state.rule ? this.state.password : this.props.state.password,
                };
            }

            let submitResponse = this.props.validateParams(paramsToValidate);
            if (submitResponse.success) {
                this.props.handleForward(paramsToValidate);
                this.props.handleStep(this.props.step + 1);
            }
            else {
                this.setState({
                    errors: submitResponse.errors
                })
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

                let submitResponse = this.props.validateParams(paramsToValidate);
                if (submitResponse.success) {
                    this.props.handleStep(this.props.step + 1);
                    this.props.handleSubmit(paramsToValidate);
                }
            }
            else {
                //this.handleBackwards();
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
        let errorIndexes = [];
        if (name === 'password') {
            const submitResponse = this.props.validateParams({
                password: value
            });

            let submitErrs = [];
            let staticErrors = [
                "The password must be 8 characters long",
                "Must contain at least 1 small letter",
                "Must contain at least 1 capital letter",
                "Must contain at least 1 number",
            ]

            submitErrs.push(submitResponse.errors);

            errorIndexes = submitErrs[0].reduce((errorsIndexesArray, error) => {
                const errorIndex = staticErrors.indexOf(error);
                errorsIndexesArray.push(errorIndex);
                return errorsIndexesArray;
            }, []);
            this.setState({ errorIndexes });
        }
        this.props.getInpData(name, value, errors, true, (errorIndexes.includes(-1) ? [0,1,2,3] : errorIndexes));
        this.setState({[name]: value.replace(/^\s+|\s/g, ''), errors})
    };

    render() {
        const {
            first_name,
            last_name,
            email,
            password,
            //errors,
            errorIndexes,
            tel

        } = this.props.state;;
        let languageManager = this.props.languageManager();

        if (this.props.step <= 3) {
            return (
                <div className={"Regform " + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>
                    <div className='inner'>
                        <div className='form-wrapper one'>
                            {this.state.errors && <div className="errors" style={{color: '#ff3215'}}>
                                {this.state.errors[0]}
                            </div>}
                            <input className="inputfield fname" type="text" name="first_name" value={first_name} placeholder={languageManager.fname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            <input className="inputfield lname" type="text" name="last_name" value={last_name} placeholder={languageManager.lname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            <input className="inputfield email" type="text" name="email" value={email} placeholder={languageManager.email} autoComplete='off' onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            <button onClick={this.handleForward.bind(this)} className='start'>{languageManager.button}</button>
                        </div>
                        <div className='form-wrapper two'>
                            <input className="inputfield pass" type="password" value={password} maxLength="8" onChange={(e) => this.handleStepChange(e.target.name, e.target.value)} name="password" placeholder={languageManager.pass}/>
                            <ul className='req'>
                                {languageManager.passtest.map((li, index) => {
                                    return (<li key={index} className={errorIndexes.includes(index) ? 'list' : 'ok'}>{li}</li>)
                                })}
                            </ul>
                            <button onClick={this.handleForward.bind(this)} className='start'>{languageManager.button}</button>
                        </div>
                        <div className='form-wrapper three'>
                            {/*{this.state.errors && <div style={{color: '#ff3215'}}>*/}
                            {/*    {this.state.errors[0]}*/}
                            {/*</div>}*/}
                            <IntlTelInput
                                preferredCountries={[this.props.countryCode]}
                                containerClassName="intl-tel-input"
                                inputClassName="inputfield tel"
                                autoPlaceholder={true}
                                separateDialCode={true}
                                onSelectFlag={this.handleSelectFlag}
                                onPhoneNumberChange={(status, value, countryData, number, id) => {
                                    this.props.getInpNum(value)
                                    if(value.length <=15) {
                                        this.setState({
                                            phone_country_prefix: `${countryData.dialCode}`,
                                            dynamicNum: value.replace(/\s\s/, '')
                                        })
                                    }
                                }}
                                value = {tel}
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