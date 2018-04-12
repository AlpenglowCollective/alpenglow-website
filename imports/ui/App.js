import React, { Component } from 'react';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>Alpenglow Collective</h1>
        </header>

        {this.props.main}
        <footer>

        </footer>
      </div>
    );
  }
}
