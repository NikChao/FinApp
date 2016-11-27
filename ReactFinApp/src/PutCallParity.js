import React, { Component } from 'react';
import { Input } from 'react-materialize';

export default class PutCallParity extends Component
{
    constructor(props)
    {
        super(props);

        // Statef y
        this.state =
        {
            S: "", // spot price
            K: "", // strike price
            C: "", // call price
            P: "", // put price
            r: "", // risk free rate
            t: "", // time to expiry
            isCall: "",
            resVal: 0,  // result Value
        };

        // Method Binding
        this.getCall = this.getCall.bind(this);
        this.getPut = this.getPut.bind(this);
        this.putCallRender = this.putCallRender.bind(this);
        this.setIsCall = this.setIsCall.bind(this);

        // Event Handler Binding
        this.handleCallChange = this.handleCallChange.bind(this);
        this.handlePutChange = this.handlePutChange.bind(this);
        this.handleSpotChange = this.handleSpotChange.bind(this);
        this.handleStrikeChange = this.handleStrikeChange.bind(this);
        this.handleRfChange = this.handleRfChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    getCall()
    {
        // C + PV(Strike) = P + Spot
        var _P = parseFloat(this.state.P);
        var _K = parseFloat(this.state.K);
        var _S = parseFloat(this.state.S);
        var _r = parseFloat(this.state.r);
        var _t = parseFloat(this.state.t);

        return _P + _S - _K * Math.pow(Math.E, -1 * _r * _t);
    }

    getPut()
    {
        var _C = parseFloat(this.state.C);
        var _K = parseFloat(this.state.K);
        var _S = parseFloat(this.state.S);
        var _r = parseFloat(this.state.r);
        var _t = parseFloat(this.state.t);;

        // return _C + _K * Math.pow(Math.E, -1 * _r * _t) - _S;
        return 1;
    }

    putCallRender(event)
    {
        if(this.state.isCall === "call")
        {
            return (
                <div>
                <p> Call: {this.state.P}</p>
                </div>
            );
        } else {
            return (
                <div>
                <p> Put: {this.getPut()} </p>
                </div>
            );
        }
    }

    handleCallChange(event)
    {
        this.setState({P: this.getPut(), resVal: "Put: " + this.getPut()}); // set put and set result and value to be put
    }

    handlePutChange(event)
    {
        this.setState({C: this.getCall(), resVal: "Call: " + this.getCall()}); // set call and set result and value to be call
    }

    handleSpotChange(event)
    {
        this.setState({S: event.target.value});
    }

    handleStrikeChange(event)
    {
        this.setState({K: event.target.value});

    }

    handleRfChange(event)
    {
        this.setState({r: event.target.value});

    }

    handleTimeChange(event)
    {
        this.setState({t: event.target.value});
    }

    setIsCall(state)
    {
        this.setState({isCall: state})
    }

    render()
    {
        return (
            <div>
                <Input label="Spot price" value={this.state.value} onChange={this.handleSpotChange} />
                <Input label="Strike price" value={this.state.value} onChange={this.handleStrikeChange} />
                <Input label="Risk free rate" value={this.state.value} onChange={this.handleRfChange} />
                <Input label="Time to maturity" value={this.state.value} onChange={this.handleTimeChange} />

                <Input name='group1' type='radio' value='call' label='Call' className='with-gap' onClick={() => this.setIsCall("call")} />
                <Input name='group1' type='radio' value='put' label='Put' className='with-gap' onClick={() => this.setIsCall("put")} />
                <br></br>
                {this.putCallRender()}
            </div>
        );
    }
}
