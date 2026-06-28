function ErrorMessage({
  message,
  onRetry,
}) {
  return (
    <div className="error">

      <div className="error__card">

        <h2>
          Something went wrong
        </h2>

        <p>{message}</p>

        <button
          className="primary-button"
          onClick={onRetry}
        >
          Retry
        </button>

      </div>

    </div>
  );
}

export default ErrorMessage;