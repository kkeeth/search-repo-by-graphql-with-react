import React from 'react'
import { Mutation } from 'react-apollo'
import { ADD_STAR } from './graphql'

const StarButton = (props) => {
  const node = props.node
  const totalCount = node.stargazers.totalCount
  const viewerHasStarred = node.viewerHasStarred
  const starCount = totalCount === 1
    ? "1 star"
    : `${totalCount} stars`

  const StarStatus = ({ addStar }) => (
    <button onClick={() => {
      addStar({
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
    <Mutation mutation={ADD_STAR}>
      {
        addStar => <StarStatus addStar={addStar} />
      }
    </Mutation>
  )
}

export default StarButton