import React from 'react';

function navbar(list)
{
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                FinApp
              </a>
            </div>
          </div>
        </nav>
    );
}

export {
    navbar
};
