import React from 'react'
import { Query, Center, Badge } from 'components'
import gql from 'graphql-tag'

export default class Home extends React.Component {
  state = {
    currentView: 'code',
    code: '',
  }

  render() {
    return (
      <Query
        query={gql`
        query {
          user(id: ${window.localStorage.getItem('id')}) {
            project {
              id
            }
          }
        }
      `}
      >
        {({ data: { user } }) => (
          <Center>
            { /*<Badge />*/ }
            <button onClick={() => this.props.history.push('/voting')}>vote</button>
            {user.project ? (
              <button onClick={() => this.props.history.push('/edit-project')}>edit project</button>
            ) : (
              <button onClick={() => this.props.history.push('/new-project')}>
                create project
              </button>
            )}
            <button
              onClick={() => (window.location.href = 'https://join.slack.com/t/chicode/signup')}
            >
              talk on slack
            </button>
            <a href="http://18.221.89.141">ctf</a>
            <button onClick={logout}>logout</button>
          </Center>
        )}
      </Query>
    )
  }
}
