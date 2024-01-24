import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import apiStatusConstant from '../../constants'
import Header from '../Header'
import Footer from '../Footer'
import LoaderComponent from '../Loader'
import SomethingWentWrong from '../SomethingWentWrong'

import './index.css'

class BookDetails extends Component {
  state = {
    bookDetails: {},
    isLoading: false,
    apiRequestStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.setState(
      {
        isLoading: true,
        apiRequestStatus: apiStatusConstant.pending,
      },
      this.getBookDetails,
    )
  }

  getBookDetails = async () => {
    // const bookId = '7850622e-1b70-4396-963d-e68d5a2577d7'
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (data.book_details) {
      return this.handleOnSuccess(data.book_details)
    }
    return this.handleOnFailure()
  }

  handleOnSuccess = bookDetails => {
    this.setState({
      bookDetails: {...bookDetails},
      isLoading: false,
      apiRequestStatus: apiStatusConstant.success,
    })
  }

  handleOnFailure = () => {
    this.setState({
      isLoading: false,
      apiRequestStatus: apiStatusConstant.failed,
    })
  }

  handleOnRetry = () => {
    this.setState(
      {
        isLoading: true,
        apiRequestStatus: apiStatusConstant.pending,
      },
      this.getBookDetails,
    )
  }

  render() {
    const {isLoading, apiRequestStatus, bookDetails} = this.state
    return (
      <div className="book-details-page">
        <Header />
        {isLoading && <LoaderComponent />}
        {!isLoading && (
          <div className="book-details-container">
            {apiRequestStatus === apiStatusConstant.success && (
              <div className="book-details-full-card">
                <div className="book-details-card">
                  <img
                    className="book-details-card-image"
                    src={bookDetails.cover_pic}
                    alt={bookDetails.title}
                  />
                  <div className="book-details-card-context">
                    <h1 className="book-details-title">{bookDetails.title}</h1>
                    <p className="book-details-author-name">
                      {bookDetails.author_name}
                    </p>
                    <p className="book-details-rating">
                      Avg Rating{' '}
                      <BsFillStarFill
                        className="book-details-star-icon"
                        size={20}
                        color="#FBBF24"
                      />
                      {bookDetails.rating}
                    </p>
                    <p className="book-details-status-para">
                      Status:{' '}
                      <span className="book-details-status">
                        {bookDetails.read_status}
                      </span>
                    </p>
                  </div>
                </div>

                <hr className="book-details-divider" />

                <div className="book-details-about-container">
                  <h1 className="book-details-about-heading">About Author</h1>
                  <p className="book-details-about-para">
                    {bookDetails.about_author}
                  </p>
                  <br />
                  <h1 className="book-details-about-heading">About Book</h1>
                  <p className="book-details-about-para">
                    {bookDetails.about_book}
                  </p>
                </div>
              </div>
            )}

            {apiRequestStatus === apiStatusConstant.failed && (
              <SomethingWentWrong callbackFunction={this.handleOnRetry} />
            )}
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default BookDetails
