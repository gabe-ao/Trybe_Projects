import React from 'react';
import { Link } from 'react-router-dom';

class GoBackButton extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img
            className="gobackbutton-image"
            width="40"
            height="40"
            src="https://cdn-icons-png.flaticon.com/512/60/60577.png?w=740&t=st=1651269164~exp=1651269764~hmac=ab33ee80938b1924520f46d98984c9bfa4a4760020d187f13d3838a82d83a37d"
            alt="botão-voltar-página"
          />
        </Link>
      </div>
    );
  }
}

export default GoBackButton;
