import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  pending: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeView extends Component {
  state = {
    isLoading: false,
    TopRatedBooksList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount = () => {
    this.apiCallToTopRatedBooks()
  }

  apiCallToTopRatedBooks = async () => {
    this.setState({isLoading: true, apiStatus: apiStatusConstant.pending})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
      'Context-Type': 'application/json',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.books)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onSuccess = books => {
    const booksList = books.map(book => ({
      id: book.id,
      authorName: book.author_name,
      coverPic: book.cover_pic,
      title: book.title,
    }))

    this.setState({
      TopRatedBooksList: booksList,
      isLoading: false,
      apiStatus: apiStatusConstant.success,
    })
  }

  onFailure = () => {
    this.setState({isLoading: false, apiStatus: apiStatusConstant.failure})
  }

  onRetry = () => {
    this.apiCallToTopRatedBooks()
  }

  renderLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderOnSuccess = () => {
    const {TopRatedBooksList} = this.state

    const settings = {
      dots: false,
      infinite: true,
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
            slidesToScroll: 3,
            slidesToShow: 3,
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
      <Slider {...settings}>
        {TopRatedBooksList.map(book => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`} className="Home-Find-books-Link">
              <div className="Home-TopRatedBookSlide">
                <img
                  className="Home-TopRatedBookSlide-image"
                  src={book.coverPic}
                  alt={book.title}
                />
                <h1 className="Home-TopRatedBookTitle">{book.title}</h1>
                <p className="Home-TopRatedBookAuthor">{book.authorName}</p>
              </div>
            </Link>
          </li>
        ))}
      </Slider>
    )
  }

  renderOnFailure = () => (
    <div className="Home-FailureView">
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
    const {isLoading, apiStatus} = this.state
    return (
      <div className="Home-OuterContainer">
        <Header />
        {isLoading && this.renderLoading()}

        {!isLoading && (
          <>
            <div className="Home-BodyContainer">
              <div className="Home-FavoriteSection">
                <h1 className="Home-MainHeading">
                  Find Your Next Favorite Books?
                </h1>
                <p className="Home-MainSummary">
                  You are in the right place. Tell us what titles or genres you
                  have enjoyed in the past, and we will give you surprisingly
                  insightful recommendations.
                </p>
                <Link to="/shelf" className="Home-Find-books-Link">
                  <button
                    type="button"
                    className="Home-FindBookBtn Home-show-xs"
                  >
                    Find Books
                  </button>
                </Link>
              </div>
              <div className="Home-TopRatedBookSection">
                <div className="Home-TopRatedBookSection-Top">
                  <h1 className="Home-TopRatedBookHeading">Top Rated Books</h1>
                  <Link to="/shelf" className="Home-Find-books-Link">
                    <button
                      type="button"
                      className="Home-FindBookBtn Home-show-lg"
                    >
                      Find Books
                    </button>
                  </Link>
                </div>
                {apiStatus === apiStatusConstant.success &&
                  this.renderOnSuccess()}
                {apiStatus === apiStatusConstant.failure &&
                  this.renderOnFailure()}
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
    )
  }
}

export default HomeView
