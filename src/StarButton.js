import React from 'react'
import { Mutation } from 'react-apollo'
import { ADD_STAR, REMOVE_STAR } from './graphql'

const StarButton = (props) => {
  const node = props.node
  const totalCount = node.stargazers.totalCount
  const viewerHasStarred = node.viewerHasStarred
  const starCount = totalCount === 1
    ? "1 star"
    : `${totalCount} stars`

  const StarStatus = ({ addOrRemoveStar }) => (
    <button onClick={() => {
      addOrRemoveStar({
        variables: {
          input: {
            starrableId: node.id
          }
        }
      })
    }}>
      { starCount } | { viewerHasStarred ? "starred" : "-"}
    </button>
  )

  return (
    <Mutation mutation={viewerHasStarred ? REMOVE_STAR: ADD_STAR }>
      {
        addOrRemoveStar => <StarStatus addOrRemoveStar={addOrRemoveStar} />
      }
    </Mutation>
  )
}

export default StarButton