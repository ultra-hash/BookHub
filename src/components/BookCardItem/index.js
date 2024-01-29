import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

function BookCardItem(props) {
  const {bookDetails} = props
  return (
    <div className="book-card-item">
      <div>
        <img
          className="book-image"
          src={bookDetails.cover_pic}
          alt={bookDetails.title}
        />
      </div>
      <div className="book-details">
        <h1 className="book-title">{bookDetails.title}</h1>
        <p className="book-author">{bookDetails.author_name}</p>
        <p className="book-rating">
          Avg Rating <BsFillStarFill className="book-star-icon" />{' '}
          {bookDetails.rating}
        </p>
        <p className="book-status">
          Status :{' '}
          <span className="book-status-value">{bookDetails.read_status}</span>
        </p>
      </div>
    </div>
  )
}

export default BookCardItem
