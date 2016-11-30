import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Row, Button, Icon, Dropdown, Navbar, NavItem, Input } from 'react-materialize';

export default class FinancialOptions extends Component
{
    constructor(props)
    {
        super(props)

        // state
        this.state =
        {
        }

        // method binding
    }

    render()
    {
        return (
            <div>
                <table>
                    <p><h4> Basic Instruments </h4></p>
                    <tr>
                        <td> Instruments</td>
                        <td>  Long </td>
                        <td> short </td>
                    </tr>
                    <tr>
                        <td> Bonds </td>
                        <td>  </td>
                        <td>  </td>
                    </tr>
                    <tr>
                        <td>  Stocks</td>
                        <td>  </td>
                        <td>  </td>
                    </tr>
                    <tr>
                        <td>  Forward/Future Contracts</td>
                        <td>  </td>
                        <td>  </td>
                    </tr>
                </table>
                <table>
                    <p><h4> Options </h4></p>
                    <tr>
                        <td> Options</td>
                        <td>  Long </td>
                        <td> short </td>
                    </tr>
                    <tr>
                        <td> Call </td>
                        <td>  </td>
                        <td>  </td>
                    </tr>
                    <tr>
                        <td>  Put</td>
                        <td>  </td>
                        <td>  </td>
                    </tr>
                </table>
            </div>
        );
    }
}
