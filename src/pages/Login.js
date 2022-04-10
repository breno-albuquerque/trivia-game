import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import { actionToken, actionPlayer, actionFetch } from '../redux/action';
import '../css/Login.css';

class Login extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    isDisabled: true,
  }

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    }, () => this.handleDisable());
  }

  handleDisable = () => {
    const { userName, userEmail } = this.state;

    //  Referência: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const validateEmail = (email) => {
      const emailPattern = /\S+@\S+\.\S+/;

      return emailPattern.test(email);
    };

    if (userName.length !== 0 && validateEmail(userEmail)) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleClick = async () => {
    const { dispatch } = this.props;
    const { userName, userEmail } = this.state;

    const fetchApiToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await fetchApiToken.json();

    localStorage.setItem('token', response.token);

    dispatch(actionToken(response.token));

    const hash = md5(userEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;

    dispatch(actionPlayer({ userEmail, userName, url }));
    dispatch(actionFetch(response.token));
  }

  render() {
    const { userName, userEmail, isDisabled } = this.state;
    const { result, history } = this.props;
    if (result.length > 0) history.push('/tela');

    return (

      <div className="Login-container">

        <section className="login-section">
          <img src={ logo } className="logo" alt="logo" />

          <form className="login-form">
            <label
              className="login-label"
              htmlFor="input-player-name"
            >
              <input
/*                 autoComplete="off" */
                className="login-input"
                placeholder="Type your nickname"
                value={ userName }
                name="userName"
                onChange={ this.handleChange }
                type="text"
                data-testid="input-player-name"
                id="input-player-name"
              />
            </label>
            <label
              className="login-label"
              htmlFor="input-gravatar-email"
            >
              <input
/*                 autoComplete="off" */
                className="login-input"
                placeholder="Type a valid e-mail"
                value={ userEmail }
                name="userEmail"
                onChange={ this.handleChange }
                type="email"
                data-testid="input-gravatar-email"
                id="input-player-name"
                onKeyPress={
                  (event) => (event.key === 'Enter' && !isDisabled) && this.handleClick()
                }
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              className={ isDisabled ? 'login-btn-disabled' : 'login-btn-enabled' }
              onClick={ this.handleClick }
            >
              Play
            </button>
          </form>

          <Link
            to="settings"
            className="settings-link"
          >
            <button
              className="settings-btn"
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </section>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
  result: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  result: state.fetch.results,
});

export default connect(mapStateToProps, null)(Login);
