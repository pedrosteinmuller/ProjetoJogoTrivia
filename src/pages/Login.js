import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { requisition, setEmail, setName } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    nome: '',
    isBtnDisabled: true,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  verifyBtn = () => {
    const { email, nome } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = email && regex.test(email);
    const verifyName = nome.length >= 1;
    this.setState({ isBtnDisabled: !(verifyEmail && verifyName) });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/config');
  };

  startRequisition = (e) => {
    const { nome, email } = this.state;
    const { getData, history, name, mail } = this.props;
    const number = 1500;
    e.preventDefault();

    name(nome);
    mail(email);
    getData();

    setTimeout(() => history.push('/game'), number);
  };

  render() {
    const { isBtnDisabled } = this.state;

    return (
      <div>
        <form>
          <div>
            <h2>Login</h2>
          </div>
          <div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                data-testid="input-gravatar-email"
                onChange={ this.handleInput }
              />
            </div>
            <div>
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                data-testid="input-player-name"
                onChange={ this.handleInput }
              />
            </div>
            <div>
              <button
                type="submit"
                data-testid="btn-play"
                disabled={ isBtnDisabled }
                onClick={ this.startRequisition }
              >
                Play
              </button>
              <button
                type="button"
                data-testid="btn-settings"
                onClick={ this.handleClick }
              >
                Configurações
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
// Login.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }),
// };
// Login.defaultProps = {
//   history: { push: () => {} },
// };
const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(requisition()),
  name: (state) => dispatch(setName(state)),
  mail: (state) => dispatch(setEmail(state)),
});

Login.propTypes = {
  getData: PropTypes.func.isRequired,
  name: PropTypes.func.isRequired,
  mail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
