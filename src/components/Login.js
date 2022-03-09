import React from 'react';

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

  render() {
    const { userName, userEmail, isDisabled } = this.state;

    return (
      <div>
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
          >
            Play

          </button>
        </form>
      </div>
    );
  }
}

export default Login;
