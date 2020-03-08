import React from 'react'

const StarButton = (props) => {
  const node = props.node
  const totalCount = node.stargazers.totalCount
  const viewerHasStarred = node.viewerHasStarred
  const starCount = totalCount === 1
    ? "1 star"
    : `${totalCount} stars`
  return (
    <button>
      { starCount } | { viewerHasStarred ? "starred" : "-"}
    </button>
  )
}

export default StarButton