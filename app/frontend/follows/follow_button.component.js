import { Component }                     from 'react';
import { connect }                       from 'react-redux';
import { bindActionCreators }            from 'redux';

import { follow, unFollow, fetchFollow } from './follows.actions';

export class FollowButton extends Component {
  componentDidMount() {
    const { followingId, followingType, fetchFollow } = this.props;

    fetchFollow({ followingId, followingType });
  }

  render() {
    const { session } = this.props;

    if (session.signed_in) {
      return (
        <div>
          {this.renderFollowButton()}
          {this.renderUnFollowButton()}
        </div>
      )
    }

    return null;
  }

  renderFollowButton() {
    const { followingId, followingType, followId, follow } = this.props;

    if (!followId) {
      return (
        <button 
          className="follow"
          onClick={() => follow({ followingId, followingType })}>
          Follow
        </button>
      );
    }
    return null;
  }

  renderUnFollowButton() {
    const { followId, unFollow } = this.props;

    if (followId) {
      return (
        <button 
          className="unfollow"
          onClick={() => unFollow(followId)}>
          Unfollow
        </button>
      );
    }

    return null;
  }
}

function mapStateToProps(state, { followingType }) {
  const { session } = state;
  const resource = state[followingType.toLowerCase()];
  const followId = resource && resource.follow && resource.follow.id;

  return { 
    followId,
    session 
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ follow, unFollow, fetchFollow }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
