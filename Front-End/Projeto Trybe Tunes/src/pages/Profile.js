import React from 'react';
import { Link } from 'react-router-dom';
import LoadingMessage from '../components/LoadingMessage';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.profileSetup = this.profileSetup.bind(this);

    this.state = {
      profileData: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.profileSetup();
  }

  async profileSetup() {
    const profileData = await getUser();
    this.setState({
      profileData,
      isLoading: false,
    });
  }

  render() {
    const { profileData, isLoading } = this.state;
    const profileCard = (
      <div className="profile-card">
        <img
          src={ profileData.image }
          alt={ `Foto de perfil de ${profileData.name}` }
          data-testid="profile-image"
        />
        <h4><b>Nome</b></h4>
        <p>{ profileData.name }</p>
        <h4><b>E-mail</b></h4>
        <p>{ profileData.email }</p>
        <h4><b>Descricao</b></h4>
        <p>{ profileData.description }</p>
        <Link to="/profile/edit">
          <button type="button">
            Editar perfil
          </button>
        </Link>
      </div>
    );
    return (
      <div data-testid="page-profile">
        {isLoading && <LoadingMessage />}
        {!isLoading && profileCard}
      </div>
    );
  }
}

export default Profile;
