import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingMessage from './LoadingMessage';

class Header extends React.Component {
  constructor() {
    super();
    this.userSetup = this.userSetup.bind(this);
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.userSetup();
  }

  async userSetup() {
    const user = await getUser();
    this.setState({ user, isLoading: false });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          {isLoading
            ? <LoadingMessage />
            : <p>{ user.name }</p>}
        </div>
        <nav className="header-nav">
          <div>
            <Link to="/search" data-testid="link-to-search">
              Pesquisa
            </Link>
          </div>
          <div>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favoritas
            </Link>
          </div>
          <div>
            <Link to="/profile" data-testid="link-to-profile">
              Perfil
            </Link>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
