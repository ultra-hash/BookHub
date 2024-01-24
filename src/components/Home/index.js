import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import NavBar from '../Header'
import Footer from '../Footer'
import LoaderComponent from '../Loader'
import apiStatusConstant from '../../constants'

import './index.css'
import SomethingWentWrong from '../SomethingWentWrong'

class Home extends Component {
  state = {
    books: [],
    isLoading: true,
    apiRequestStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.setState(
      {apiRequestStatus: apiStatusConstant.pending, isLoading: true},
      this.getTopRatedBooks,
    )
  }

  getTopRatedBooks = async () => {
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (data.books) {
      return this.onSuccess(data.books)
    }
    return this.onFailure(data.error_msg)
  }

  onSuccess = books => {
    this.setState({
      books: [...books],
      apiRequestStatus: apiStatusConstant.success,
      isLoading: false,
    })
  }

  onFailure = errorMessage => {
    this.setState({
      errorMsg: errorMessage,
      apiRequestStatus: apiStatusConstant.failed,
      isLoading: false,
    })
  }

  handleOnRetry = () => {
    this.setState(
      {apiRequestStatus: apiStatusConstant.pending, isLoading: true},
      this.getTopRatedBooks,
    )
  }

  renderHomeTopSection = () => (
    <div className="home-main-section">
      <h1 className="home-main-header">Find Your Next Favorite Books?</h1>
      <p className="home-main-paragraph">
        You are in the right place. Tell us what titles or genres you have
        enjoyed in the past, and we will give you surprisingly insightful
        recommendations.
      </p>
      <Link to="/shelf" className="home-btn-link">
        <button className="home-find-books-btn" type="button">
          Find Books
        </button>
      </Link>
    </div>
  )

  renderHomeBottomSection = () => {
    const {books, apiRequestStatus} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }
    return (
      <div className="home-slider-container">
        <div className="home-slider-top-section">
          <h1 className="home-slider-heading">Top Rated Books</h1>
          <Link to="/shelf" className="home-btn-link">
            <button className="home-find-books-btn" type="button">
              Find Books
            </button>
          </Link>
        </div>

        {apiRequestStatus === apiStatusConstant.success && (
          <Slider {...settings}>
            {books.map(book => (
              <Link
                to={`/books/${book.id}`}
                className="home-btn-link"
                key={book.id}
              >
                <div className="home-slider-card">
                  <img
                    className="home-slider-image"
                    src={book.cover_pic}
                    alt={book.title}
                  />
                  <h1 className="home-slider-card-title">{book.title}</h1>
                  <p className="home-slider-card-author">{book.author_name}</p>
                </div>
              </Link>
            ))}
          </Slider>
        )}

        {apiRequestStatus === apiStatusConstant.failed && (
          <SomethingWentWrong callbackFunction={this.handleOnRetry} />
        )}
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-page">
        <NavBar />

        {isLoading && <LoaderComponent />}

        {!isLoading && (
          <div className="home-container">
            {this.renderHomeTopSection()}
            {this.renderHomeBottomSection()}
          </div>
        )}

        <Footer />
      </div>
    )
  }
}

export default Home
