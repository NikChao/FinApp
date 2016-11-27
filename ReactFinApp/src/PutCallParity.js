import React, { Component } from 'react';
import { Input } from 'react-materialize';

export default class PutCallParity extends Component
{
    constructor(props)
    {
        super(props);

        // State
        this.state =
        {
            spot: 0,
            strike: 0,
            time: 0,
            rf: 0,
            call: null,
            put: null,
            callVal: 0,
            putVal: 0
        };

        // Method Binding
        this.getPut = this.getPut.bind(this);
        this.getCall = this.getCall.bind(this);

        // Event Handler Binding
        this.handleSpotChange = this.handleSpotChange.bind(this);
        this.handleStrikeChange = this.handleStrikeChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleRfChange = this.handleRfChange.bind(this);

        this.handleCallChange = this.handleCallChange.bind(this);
        this.handlePutChange = this.handlePutChange.bind(this);
        this.putCallSelect = this.putCallSelect.bind(this);
    }

    // return _P + _S - _K * Math.pow(Math.E, -1 * _r * _t); CALL

    putCallSelect()
    {
        if(this.state.put === null)
        {
            return (
                <div>
                <Input label="Put Price" value={this.state.value} onChange={this.handlePutChange} />
                <p> Call Price: {this.getCall()}</p>
                </div>
            );
        } else if(this.state.call === null){
            return (
                <div>
                <Input label="Call Price" value={this.state.value} onChange={this.handleCallChange} />
                <p> Put Price: {this.getPut()} {this.state.call}</p>
                </div>
            );
        }
    }

    getPut()
    {
        return Math.max(this.state.callVal + this.state.strike * Math.pow(Math.E, -1 * this.state.time * this.state.rf) - this.state.spot,0);
    }

    getCall()
    {
        return Math.max(this.state.putVal + this.state.spot - this.state.strike * Math.pow(Math.E, -1 * this.state.rf * this.state.time),0);
    }

    handleSpotChange(event)
    {
        this.setState({spot: parseFloat(event.target.value)});
    }

    handleStrikeChange(event)
    {
        this.setState({strike: parseFloat(event.target.value)});
    }

    handleTimeChange(event)
    {
        this.setState({time: parseFloat(event.target.value)});
    }

    handleRfChange(event)
    {
        this.setState({rf: parseFloat(event.target.value)});
    }

    handleCallChange(event)
    {
        this.setState({callVal: parseFloat(event.target.value), put: !null, call: null});
    }

    handlePutChange(event)
    {
        this.setState({putVal: parseFloat(event.target.value), call: !null, put: null});
    }


    render()
    {
        return (
            <div>
                <Input label="Spot price" value={this.state.value} onChange={this.handleSpotChange} />
                <Input label="Strike price" value={this.state.value} onChange={this.handleStrikeChange} />
                <Input label="Time to maturity" value={this.state.value} onChange={this.handleTimeChange} />
                <Input label="Risk free rate" value={this.state.value} onChange={this.handleRfChange} />

                <p> Result Value? </p>
                <Input name='group1' type='radio' value='call' label='Call' className='with-gap' onClick={() => this.setState({call: !null, put: null})} />
                <Input name='group1' type='radio' value='put' label='Put' className='with-gap' onClick={() => this.setState({put: !null, call: null})} />
                {this.putCallSelect()}
            </div>
        );
    }
}
