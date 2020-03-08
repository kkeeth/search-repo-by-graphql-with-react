import React from 'react'

const StarButton = (props) => {
  console.log(props.node)
  const totalCount = props.node.stargazers.totalCount
  return (
    <button>
      {
        totalCount === 1
          ? "1 star"
          : `${totalCount} stars`
      }
    </button>
  )
}

export default StarButton