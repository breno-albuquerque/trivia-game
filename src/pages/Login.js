import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { actionToken } from '../redux/action';
import store from '../redux/store/store';

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

    if (userName && userEmail !== '') {
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
    const { history, dispatch } = this.props;
    const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await fetchApi.json();
    localStorage.setItem('token', response.token);
    history.push('/tela');
    dispatch(actionToken(response.token));
    console.log((store.getState()).token);
  }

  render() {
    const { userName, userEmail, isDisabled } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
          <form>
            <label htmlFor="input-player-name">
              {' '}
              Nome:
              <input
                value={ userName }
                name="userName"
                onChange={ this.handleChange }
                type="text"
                data-testid="input-player-name"
                id="input-player-name"
              />
            </label>
            <label htmlFor="input-gravatar-email">
              {' '}
              Email
              <input
                value={ userEmail }
                name="userEmail"
                onChange={ this.handleChange }
                type="email"
                data-testid="input-gravatar-email"
                id="input-player-name"
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Play
            </button>
          </form>

          <Link to="settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>

        </header>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
