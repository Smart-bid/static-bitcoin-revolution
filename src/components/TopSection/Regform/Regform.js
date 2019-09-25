import React, { Component } from 'react'

// import * as validateInput from '../../../helpers/validateInput'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

// import * as errorMessage from '../../../helpers/errorMessage'

//import { ReactComponent as Mark } from './excl.svg'
//import logo from '../../BottomSection/logo.png'


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
            agree_2: true
        };

        this.setTextInputRef = element => {
            this.currentForm = element;
        };

        this.currentForm = null;
        this.infoBox = React.createRef();
        this.handleBackwards = this.handleBackwards.bind(this);
        this.handleSync = this.handleSync.bind(this);
    }

    handleForward(e) {
        let form = e.target.parentElement;

        let paramsToValidate = {};

        // Step 1 or 2
        if(this.props.step === 1 || this.props.step === 2){
            // Step 1
            if(this.props.step === 1){
                paramsToValidate = {
                    email: this.state.email,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    agree_2: this.state.agree_2
                };
            }
            // Step 2
            else if (this.props.step === 2){
                paramsToValidate = {
                    password: this.state.password
                };
                console.log(this.state.password);
            }

            console.log(paramsToValidate);

            let submitResponse = this.props.validateParams(paramsToValidate);

            if (submitResponse.success) {
                this.props.handleForward(paramsToValidate);
                this.props.handleStep(this.props.step + 1);
            }
            else{
                this.setState({
                    errors: submitResponse.errors
                })
            }

            //Get Country Dial Code
            let tel = form.querySelector('.tel');
            var singleDialCode = "",
                dialList = document.querySelectorAll(".country-list .country");
            dialList.forEach(function (item, i) {
                dialList[i].onclick = function () {
                    singleDialCode = this.querySelector(".dial-code").innerHTML;
                    console.log(singleDialCode);
                    paramsToValidate = {
                        phone_number: singleDialCode,
                        //phone_number: singleDialCode + tel.value
                    };
                    console.log(paramsToValidate.phone_number + "params");
                };
            });
        }
        // Step 3
        else if (this.props.step === 3){
            let tel = form.querySelector('.tel');
            let dialCode = document.getElementsByClassName(".selected-dial-code");

            let phone_number = dialCode.innerHTML + tel.value;
            phone_number = tel.value;

            /*if(!dialCode.innerHTML) {
                phone_number = singleDialCode + tel.value;
            }
            console.log(`${phone_number} + 98-line`);*/

            paramsToValidate = {
                phone_number: phone_number
            };

            let submitResponse = this.props.validateParams(paramsToValidate);

            if (submitResponse.success) {
                this.props.handleStep(this.props.step + 1);
                this.props.handleSubmit(paramsToValidate);
            }
            else{
                this.setState({
                    errors: submitResponse.errors
                })
            }
        }
    }

    handleBackwards(e) {
        let back = parseInt(e.target.getAttribute('index'));
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            let steps = [...form.querySelectorAll('.form-wrapper')];
            steps.map((step, index) => {
                for (let i=0;i<=back;i++) {
                    step.classList.remove('step');
                }
            })
        });

        this.props.handleStep(parseInt(e.target.getAttribute('index')));
    }

    handleSync(e) {
        let input = e.target.value;
        let inputClass = e.target.className;
        let forms = [...document.querySelectorAll('.Regform')];

        forms.map(form => {
            form.getElementsByClassName(inputClass)[0].value = input;
        })
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

    componentDidMount() {
        /*let inputs = [...document.querySelectorAll('.inputfield')];

        inputs.map(input => {
            input.addEventListener('change', this.handleSync);
        })*/
    }

    handleStepChange = (name, value) => {

        console.log(name, value);
        this.setState({[name]: value, errors: null}, () => {

            console.log(this.state);

            if(name === "password"){
                let submitResponse = this.props.validateParams({
                    password: value
                });

                if (!submitResponse.success) {
                    this.setState({
                        errors: submitResponse.errors
                    })
                }
                else{
                    this.setState({
                        errors: null
                    })
                }
            }
        });
    };

    render() {

        let languageManager = this.props.languageManager();

        if (this.props.step <= 3) {
            return (
                <div className={"Regform " + (this.props.class ? this.props.class : '')} ref={this.setTextInputRef}>
                    <div className="steps">
                        {[1,2,3].map(index => {
                            if(index <= this.props.step-1) {
                                return (
                                    <div className="num check" key={index} index={index} onClick={this.handleBackwards}>✓</div>
                                )
                            } else {
                                return (
                                    <div className="num" key={index}>{index}</div>
                                )
                            }
                        })}
                    </div>
                    <div className='inner'>
                        <div className='form-wrapper one'>
                            {this.state.errors && <div style={{color: '#ff3215'}}>
                                {this.state.errors[0]}
                            </div>}
                            <input className="inputfield fname" type="text" name="first_name" placeholder={languageManager.fname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            <input className="inputfield lname" type="text" name="last_name" placeholder={languageManager.lname} onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            <input className="inputfield email" type="text" name="email" placeholder={languageManager.email} autoComplete='off' onChange={(e) => this.handleStepChange(e.target.name, e.target.value)}/>
                            <button onClick={this.handleForward.bind(this)} className='start'>{languageManager.button}</button>
                        </div>
                        <div className='form-wrapper two'>
                            {this.state.errors && <div style={{color: '#ff3215'}}>
                                {this.state.errors[0]}
                            </div>}
                            <input className="inputfield pass" type="password" maxLength="10" onChange={(e) => this.handleStepChange(e.target.name, e.target.value)} name="password" placeholder={languageManager.pass}/>
                            <ul className='req'>
                                {languageManager.passtest.map(li => {
                                    return (<li key={li}>{li}</li>)
                                })}
                            </ul>
                            <button onClick={this.handleForward.bind(this)} className='start'>{languageManager.button}</button>
                        </div>
                        <div className='form-wrapper three'>
                            {this.state.errors && <div style={{color: '#ff3215'}}>
                                {this.state.errors[0]}
                            </div>}
                            <IntlTelInput
                                preferredCountries={[this.props.countryCode]}
                                containerClassName="intl-tel-input"
                                inputClassName="inputfield tel"
                                autoPlaceholder={true}
                                separateDialCode={true}
                            />
                            <button onClick={this.handleForward.bind(this)} className='start' >{languageManager.button_last}</button>
                        </div>
                    </div>
                    <div className="error">
                        {/*<Mark className='excl'/><span></span>*/}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="Regform">
                    <div className="inner">
                        <div className='form-wrapper three'>
                            {this.state.errors && <div style={{color: '#ff3215'}}>
                                {this.state.errors[0]}
                            </div>}
                            <IntlTelInput
                                preferredCountries={[this.props.countryCode]}
                                containerClassName="intl-tel-input"
                                inputClassName="inputfield tel"
                                autoPlaceholder={true}
                                separateDialCode={true}
                            />
                            <button onClick={this.handleForward.bind(this)} className='start' >{languageManager.button_last}</button>
                        </div>
                    </div>
                </div>

            )
        }
    }
}
