import './index.css'

const UserStories = props => {
  const {details} = props
  const {userName, storyUrl} = details
  return (
    <div className="user-story-card">
      <img className="story-images" src={storyUrl} alt={userName} />
      <p>{userName}</p>
    </div>
  )
}

export default UserStories
