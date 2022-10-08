import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { score, name, gravatar } = this.props;
    const hash = md5(gravatar).toString();

    return (
      <header
        style={ {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          borderBottom: '1px solid black',
        } }
      >
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          style={ { width: '30px', borderRadius: '5px' } }
          alt={ `Imagem de ${name}` }
        />

        <h1
          data-testid="header-player-name"
        >
          { name }
        </h1>

        <span
          data-testid="header-score"
          style={ { fontSize: '20px' } }
        >
          { score }
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  gravatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatar: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
