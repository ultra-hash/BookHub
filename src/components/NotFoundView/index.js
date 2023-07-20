import './index.css'

const NotFoundView = () => (
  <div className="NotFoundView-OuterContainer">
    <img
      className="NotFoundView-NotFoundImage"
      src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/Page-Not-Found"
      alt="not found"
    />
    <h1 className="NotFoundView-Heading">Page Not Found</h1>
    <p className="NotFoundView-Description">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <button type="button" className="NotFoundView-Button">
      Go Back to Home
    </button>
  </div>
)

export default NotFoundView
