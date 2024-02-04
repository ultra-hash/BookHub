import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import LoaderComponent from '../../components/Loader'
import apiStatusConstant from '../../constants'
import BookCardItem from '../../components/BookCardItem'
import SomethingWentWrong from '../../components/SomethingWentWrong'

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

class Bookshelves extends Component {
  state = {
    isLoading: false,
    searchText: '',
    bookshelfName: bookshelvesList[0].value,
    books: [],
    apiRequestStatus: apiStatusConstant.initial,
    searchTextValue: '',
  }

  componentDidMount() {
    this.setState(
      {isLoading: true, apiRequestStatus: apiStatusConstant.pending},
      this.fetchDetails,
    )
  }

  retry = () => {
    this.setState(
      {isLoading: true, apiRequestStatus: apiStatusConstant.pending},
      this.fetchDetails,
    )
  }

  fetchDetails = async () => {
    const {searchTextValue, bookshelfName} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchTextValue}`

    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (data.books) {
      return this.onSuccess(data.books)
    }
    return this.onFailure()
  }

  onSuccess = books => {
    this.setState({
      books: [...books],
      isLoading: false,
      apiRequestStatus: apiStatusConstant.success,
    })
  }

  onFailure = () => {
    this.setState({
      isLoading: false,
      apiRequestStatus: apiStatusConstant.failed,
    })
  }

  handleOnChangeSearch = event => {
    this.setState({searchText: event.target.value})
  }

  handleOnClickSearchButton = () => {
    this.setState(
      prevState => ({
        isLoading: true,
        apiRequestStatus: apiStatusConstant.pending,
        searchTextValue: prevState.searchText,
      }),
      this.fetchDetails,
    )
  }

  handleOnClickSetCategory = event => {
    this.setState(
      {
        bookshelfName: event.target.value,
        isLoading: true,
        apiRequestStatus: apiStatusConstant.pending,
      },
      this.fetchDetails,
    )
  }

  renderNoBook = () => {
    const {searchTextValue} = this.state
    return (
      <div className="search-not-found-container">
        <img
          className="search-not-found-image"
          src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/search-not-found"
          alt="no books"
        />
        <p className="search-not-found-message">
          {`Your search for ${searchTextValue} did not find any matches.`}
        </p>
      </div>
    )
  }

  render() {
    const {
      isLoading,
      searchText,
      bookshelfName,
      books,
      apiRequestStatus,
    } = this.state

    return (
      <div className="Bookshelves-page">
        <Header />

        <div className="Bookshelves-container">
          <div className="left-section d-none d-lg-flex">
            <h1 className="Bookshelves-Heading">Bookshelves</h1>

            <ul className="BookShelf-buttons-container">
              {bookshelvesList.map(bookshelf => (
                <li key={bookshelf.id}>
                  <button
                    className={`BookShelf-button ${
                      bookshelfName === bookshelf.value && 'active'
                    }`}
                    type="button"
                    onClick={this.handleOnClickSetCategory}
                    value={bookshelf.value}
                  >
                    {bookshelf.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="right-section">
            <div className="bookshelf-details-top">
              <h1 className="d-none d-lg-flex">
                {
                  bookshelvesList.find(book => book.value === bookshelfName)
                    .label
                }{' '}
                Books
              </h1>
              <div className="Bookshelves-search-container">
                <input
                  className="Bookshelves-search-input"
                  type="search"
                  placeholder="Search"
                  value={searchText}
                  onChange={this.handleOnChangeSearch}
                />
                <button
                  className="Bookshelves-search-button"
                  type="button"
                  testId="searchButton"
                  onClick={this.handleOnClickSearchButton}
                >
                  <BsSearch />
                </button>
              </div>
              <h1 className="Bookshelves-Heading d-lg-none">Bookshelves</h1>
              <ul className="BookShelf-buttons-container d-lg-none">
                {bookshelvesList.map(bookshelf => (
                  <li key={bookshelf.id}>
                    <button
                      className={`BookShelf-button ${
                        bookshelfName === bookshelf.value && 'active'
                      }`}
                      type="button"
                      onClick={this.handleOnClickSetCategory}
                      value={bookshelf.value}
                    >
                      {bookshelf.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {isLoading && <LoaderComponent />}

            {!isLoading && (
              <div className="result-container">
                {apiRequestStatus === apiStatusConstant.failed && (
                  <SomethingWentWrong callbackFunction={this.retry} />
                )}

                {apiRequestStatus === apiStatusConstant.success && (
                  <>
                    {books.length !== 0 && (
                      <ul className="books-list-container">
                        {books.map(book => (
                          <li key={book.id}>
                            <Link
                              to={`/books/${book.id}`}
                              className="book-link"
                            >
                              <BookCardItem bookDetails={book} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    {books.length === 0 && this.renderNoBook()}
                  </>
                )}
              </div>
            )}
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
