import React from 'react';

class LoadingMessage extends React.Component {
  render() {
    return (
      <div data-testid="loading-message">
        Carregando...
      </div>
    );
  }
}

export default LoadingMessage;
