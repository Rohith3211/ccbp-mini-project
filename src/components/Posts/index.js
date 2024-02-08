import './index.css'

const Posts = props => {
  const {details} = props
  const {image} = details

  return (
    <div className="p-card">
      <img className="post-images" src={image} alt={image} />
    </div>
  )
}

export default Posts
