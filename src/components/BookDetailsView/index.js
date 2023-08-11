import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  pending: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetailsView extends Component {
  state = {
    bookDetails: {},
    isLoading: false,
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount = () => {
    this.callApi()
  }

  callApi = async () => {
    const {match} = this.props
    const {id} = match.params

    this.setState({
      isLoading: true,
      apiStatus: apiStatusConstant.pending,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      'Content-type': 'Application/json',
    }
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.book_details)
    } else {
      this.onFailure()
    }
  }

  onSuccess = book => {
    const newBookDetails = {
      id: book.id,
      title: book.title,
      readStatus: book.read_status,
      rating: book.rating,
      authorName: book.author_name,
      coverPic: book.cover_pic,
      aboutBook: book.about_book,
      aboutAuthor: book.about_author,
    }

    this.setState({
      bookDetails: newBookDetails,
      isLoading: false,
      apiStatus: apiStatusConstant.success,
    })
  }

  onFailure = () => {
    this.setState({isLoading: false, apiStatus: apiStatusConstant.failure})
  }

  onRetry = () => {
    this.callApi()
  }

  renderOnFailure = () => (
    <div className="BookDetails-FailureView">
      <img
        className="Home-FailureViewImage"
        src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/something-went-wrong"
        alt="failure view"
      />
      <p className="Home-FailureViewText">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="Home-FailureViewButton"
        onClick={this.onRetry}
      >
        Try Again
      </button>
    </div>
  )

  render() {
    const {isLoading, bookDetails, apiStatus} = this.state
    return (
      <div className="BookDetails-OuterContainer">
        <Header />
        {isLoading && (
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
          </div>
        )}

        {apiStatus === apiStatusConstant.success && (
          <div className="BookDetails-body">
            <div className="BookDetails-Container">
              <div className="BookDetails-card-container">
                <div className="BookDetails-book-image-container">
                  <img
                    className="BookDetails-book-image"
                    src={bookDetails.coverPic}
                    alt={bookDetails.title}
                  />
                </div>
                <div className="BookDetails-bookDetails-container">
                  <h1 className="BookDetails-book-title">
                    {bookDetails.title}
                  </h1>
                  <p className="BookDetails-book-author">
                    {bookDetails.authorName}
                  </p>
                  <div className="BookDetails-book-rating-container">
                    <p className="BookDetails-book-rating">Avg Rating</p>
                    <BsFillStarFill fill="#FBBF24" size={16} />
                    <p className="BookDetails-book-rating-value">
                      {bookDetails.rating}
                    </p>
                  </div>
                  <p className="BookDetails-book-status">
                    Status:{' '}
                    <span className="BookDetails-book-status-value">
                      {bookDetails.readStatus}
                    </span>
                  </p>
                </div>
              </div>
              <hr className="BookDetails-separator" />
              <div>
                <h1 className="BookDetails-book-about-author-heading">
                  About Author
                </h1>
                <p className="BookDetails-book-about-author-para">
                  {bookDetails.aboutAuthor}
                </p>
                <h1 className="BookDetails-book-about-book-heading">
                  About Book
                </h1>
                <p className="BookDetails-book-about-book-para">
                  {bookDetails.aboutBook}
                </p>
              </div>
            </div>
            <Footer />
          </div>
        )}

        {apiStatus === apiStatusConstant.failure && this.renderOnFailure()}
      </div>
    )
  }
}

export default BookDetailsView
