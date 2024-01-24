import './index.css'

const SomethingWentWrong = ({callbackFunction}) => (
  <div className="something-went-wrong-container">
    <img
      className="something-went-wrong-image"
      src="https://res.cloudinary.com/dxcascpje/image/upload/f_auto,q_auto/v1/BookHub/something-went-wrong"
      alt="failure view"
    />
    <p className="something-went-wrong-message">
      Something went wrong, Please try again.
    </p>
    <button
      className="something-went-wrong-button"
      type="button"
      onClick={callbackFunction}
    >
      Try Again
    </button>
  </div>
)

export default SomethingWentWrong
