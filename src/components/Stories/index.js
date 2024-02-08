import './index.css'

const Stories = props => {
  const {details} = props
  const {image} = details
  return (
    <li className="story-out-card">
      <img className="story-img" src={image} alt={image} />
    </li>
  )
}

export default Stories
