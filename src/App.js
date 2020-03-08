import React from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import client from './client'
import { SEARCH_REPOSITORIES } from './graphql'
import StarButton from './StarButton'

const PER_PAGE = 5
const DEFAULT_STATE = {
  first: PER_PAGE,
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

  goNext(search) {
    this.setState({
      first: PER_PAGE,
      after: search.pageInfo.endCursor,
      last: null,
      before: null
    })
  }

  backPrevious(search) {
    this.setState({
      first: null,
      after: null,
      last: PER_PAGE,
      before: search.pageInfo.startCursor
    })
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
                            <a href={node.url} target="_blank" rel="noopener noreferrer">{node.name}</a>
                            &nbsp;
                            <StarButton {...{node, query, first, last, before, after}} />
                          </li>
                        )
                      })
                    }
                  </ul>
                  <div className="buttons">
                    {
                      search.pageInfo.hasPreviousPage === true
                        ? <button onClick={this.backPrevious.bind(this, search)}>Previous</button>
                        : null
                    }
                    {
                      search.pageInfo.hasNextPage === true
                        ? <button onClick={this.goNext.bind(this, search)}>Next</button>
                        : null
                    }
                  </div>
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
