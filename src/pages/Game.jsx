import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import GamePage from '../components/GamePage';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <GamePage />
      </>
    );
  }
}

export default connect()(Game);
