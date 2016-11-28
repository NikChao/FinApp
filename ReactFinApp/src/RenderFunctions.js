import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/*
    Changes which topic goes in the topic div and clears the function div
 */
function changeTopicState(state)
{
    ReactDOM.render(
        state,
        document.getElementById('topic'));
    ReactDOM.render(
        <div></div>,
        document.getElementById('function')
        );
}

/*
    Changes which function goes into the function div
 */
function changeFunctionState(state)
{
    ReactDOM.render(
        state,
        document.getElementById('function')
    );
}

export
{
    changeFunctionState,
    changeTopicState
};
