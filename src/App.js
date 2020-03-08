import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import client from './client'
import { SEARCH_REPOSITORIES } from './graphql'

const DEFAULT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: 'riot'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      ...DEFAULT_STATE,
      query: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    const { query, first, last, before, after } = this.state

    return (
      <ApolloProvider client={client}>
        <form onSubmit={this.handleSubmit}>
          <input value={query} onChange={this.handleChange} />
        </form>
        <Query
          query={SEARCH_REPOSITORIES}
          variables={{query, first, last, before, after}}
        >
          {
            ({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error) return `Error! ${error.message}`

              const search = data.search
              const repositoryCount = search.repositoryCount
              const repositoryUnit
                = repositoryCount === 1 ? 'Repository' : 'Repositories'

              return (
                <>
                  <h2>GitHub Repositories Search Results - {repositoryCount} {repositoryUnit}</h2>
                  <ul>
                    {
                      search.edges.map(edge => {
                        const node = edge.node
                        return (
                          <li key={node.id}>
                            <a href={node.url} target="_blank">{node.name}</a>
                          </li>
                        )
                      })
                    }
                  </ul>
                </>
              )
            }
          }
        </Query>
      </ApolloProvider>
    )
  }
}

export default App
