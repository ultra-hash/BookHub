import {Component} from 'react'
import {BsFillStarFill, BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  pending: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookShelvesView extends Component {
  state = {
    shelf: 'ALL',
    search: '',
    listOfBooks: [],
    isLoading: false,
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount = () => {
    this.callApi()
  }

  callApi = async () => {
    this.setState({isLoading: true, apiStatus: apiStatusConstant.pending})
    const {shelf, search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      'Content-type': 'Application/json',
    }
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${search}`
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccess(data.books)
      //   console.log('success')
    } else {
      this.onFailure()
      //   console.log('failure')
    }
  }

  onSuccess = booksList => {
    const newBooksList = booksList.map(book => ({
      id: book.id,
      title: book.title,
      readStatus: book.read_status,
      rating: book.rating,
      authorName: book.author_name,
      coverPic: book.cover_pic,
    }))

    this.setState({
      listOfBooks: newBooksList,
      isLoading: false,
      apiStatus: apiStatusConstant.success,
    })
  }

  onFailure = () => {
    this.setState({isLoading: false, apiStatus: apiStatusConstant.failure})
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onClickChangeShelf = value => {
    this.setState({shelf: value}, this.callApi)
  }

  onRetry = () => {
    this.callApi()
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

  renderOnEmptyList = () => {
    const {search} = this.state
    return (
      <div className="Home-FailureView">
        <img
          className="Home-FailureViewImage"
          src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/search-not-found"
          alt="no books"
        />
        <p className="Home-FailureViewText">
          Your search for {search} did not find any matches.
        </p>
      </div>
    )
  }

  render() {
    const {search, shelf, listOfBooks, isLoading, apiStatus} = this.state
    return (
      <div className="Shelf-OuterContainer">
        <Header />
        {!isLoading && (
          <div className="SHELF-main-body">
            <div className="SHELF-main-left SHELF-show-above-md">
              <div className="SHELF-tags-list-container">
                <h1 className="SHELF-tags-heading">Bookshelves</h1>
                <ul className="SHELF-tags-list">
                  {bookshelvesList.map(eachObject => (
                    <li key={eachObject.id}>
                      <button
                        type="button"
                        className={
                          shelf === eachObject.value
                            ? 'SHELF-tag SHELF-tag-active'
                            : 'SHELF-tag'
                        }
                        onClick={() =>
                          this.onClickChangeShelf(eachObject.value)
                        }
                      >
                        {eachObject.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="SHELF-main-right">
              <div className="SHELF-main-heading-search-container">
                <h1 className="SHELF-shelf-Heading SHELF-show-above-md">
                  {
                    bookshelvesList.find(
                      eachObject => eachObject.value === shelf,
                    ).label
                  }{' '}
                  Books
                </h1>
                <div className="SHELF-search-container">
                  <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={this.onChangeSearch}
                    className="SHELF-search-input"
                  />
                  <button
                    type="button"
                    className="SHELF-search-button"
                    onClick={this.callApi}
                    testid="searchButton"
                  >
                    <BsSearch size={20} />
                  </button>
                </div>
              </div>

              <div className="SHELF-tags-list-container SHELF-show-below-md">
                <h1 className="SHELF-tags-heading">Bookshelves</h1>
                <ul className="SHELF-tags-list">
                  {bookshelvesList.map(eachObject => (
                    <li key={eachObject.id}>
                      <button
                        type="button"
                        className={
                          shelf === eachObject.value
                            ? 'SHELF-tag SHELF-tag-active'
                            : 'SHELF-tag'
                        }
                        onClick={() =>
                          this.onClickChangeShelf(eachObject.value)
                        }
                      >
                        {eachObject.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {apiStatus === apiStatusConstant.success &&
                listOfBooks.length !== 0 && (
                  <div className="SHELF-books-container">
                    <ul className="SHELF-books-list-container">
                      {listOfBooks.map(book => (
                        <li>
                          <div className="SHELF-book-item">
                            <div>
                              <img
                                className="SHELF-book-cover"
                                src={book.coverPic}
                                alt={book.title}
                              />
                            </div>
                            <div>
                              <h1 className="SHELF-book-title">{book.title}</h1>
                              <p className="SHELF-book-author">
                                {book.authorName}
                              </p>
                              <div className="SHELF-book-rating-container">
                                <p className="SHELF-book-rating">Avg Rating</p>
                                <BsFillStarFill
                                  className="SHELF-book-rating-star"
                                  size={16}
                                />
                                <p className="SHELF-book-rating-value">
                                  {book.rating}
                                </p>
                              </div>
                              <p className="SHELF-book-status">
                                Status:
                                <span className="SHELF-book-status-value">
                                  {book.readStatus}
                                </span>
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {listOfBooks.length === 0 && this.renderOnEmptyList()}

              {apiStatus === apiStatusConstant.failure &&
                this.renderOnFailure()}

              <Footer />
            </div>
          </div>
        )}

        {isLoading && (
          <div className="loader-container" testid="loader">
            <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
          </div>
        )}
      </div>
    )
  }
}

export default BookShelvesView
