function ConfirmDelete({
  isOpen,
  user,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">

      <div className="confirm-modal">

        <div className="confirm-modal__icon">
          🗑️
        </div>

        <h2>
          Delete User
        </h2>

        <p>
          Are you sure you want to
          delete
        </p>

        <strong>
          {user?.firstName}
          {" "}
          {user?.lastName}
        </strong>

        <div className="confirm-modal__actions">

          <button
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="delete-button"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmDelete;