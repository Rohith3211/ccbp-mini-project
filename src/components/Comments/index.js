import './index.css'

const Comments = props => {
  const {details} = props
  return (
    <div>
      <p className="li-para">
        <span>{details.user_name}</span>
        {details.comment}
      </p>
    </div>
  )
}

export default Comments
