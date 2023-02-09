import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { resetState } from '../redux/actions/index';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      rankingList: [],
    };
  }

  componentDidMount() {
    this.rankingSetup();
  }

  homeClick = () => {
    const { dispatch, history } = this.props;
    dispatch(resetState());
    history.push('/');
  };

  gravatarImg = (email) => {
    const hash = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  rankingSetup = () => {
    const { name, gravatarEmail, score, history } = this.props;
    const picture = this.gravatarImg(gravatarEmail);
    const currentRanking = [{ name, score, picture }];

    if (name === '' || name === undefined) {
      history.push('/');
      return;
    }

    let localRanking = JSON.parse(localStorage.getItem('ranking'));

    if (localRanking !== null) {
      localRanking = [...localRanking, currentRanking[0]];

      this.setState({
        rankingList: localRanking.sort((a, b) => b.score - a.score),
      });
      localStorage.setItem('ranking', JSON.stringify(localRanking));
      return;
    }

    localStorage.setItem('ranking', JSON.stringify(currentRanking));
    this.setState({
      rankingList: currentRanking,
    });
  }

  render() {
    const { rankingList } = this.state;
    console.log(rankingList);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.homeClick }
        >
          Home
        </button>
        <div />
        <div>
          {rankingList.map(({ name, score, picture }, index) => (
            <div key={ index + 1 }>
              <img src={ picture } alt={ name } />
              <p data-testid={ `player-name-${index + 1}` }>{name}</p>
              <p data-testid={ `player-score-${index + 1}` }>{score}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Ranking);
