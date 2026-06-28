import { useEffect, useState } from "react";

import {
  EMPTY_USER,
  FORM_FIELDS,
  FORM_TITLES,
} from "../utils/constants";

import {
  validateUser,
} from "../utils/validators";

function UserForm({
  isOpen,
  user,
  onClose,
  onSave,
}) {
  const [formData, setFormData] =
    useState(EMPTY_USER);

  const [
    validationErrors,
    setValidationErrors,
  ] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData(EMPTY_USER);
    }

    setValidationErrors({});
  }, [user]);

  if (!isOpen) {
    return null;
  }

  const isEditMode =
    Boolean(formData.id);

  const handleInputChange = (
    event
  ) => {
    const { name, value } =
      event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setValidationErrors(
      (previousErrors) => ({
        ...previousErrors,
        [name]: "",
      })
    );
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const errors =
      validateUser(formData);

    if (
      Object.keys(errors).length > 0
    ) {
      setValidationErrors(errors);

      return;
    }

    const result =
      await onSave(formData);

    if (!result.success) {
      setValidationErrors(
        result.errors
      );

      return;
    }

    setValidationErrors({});
  };

  return (
    <div className="modal-backdrop">

      <div className="form-modal">

        <div className="form-modal__header">

          <h2>
            {isEditMode
              ? FORM_TITLES.EDIT
              : FORM_TITLES.ADD}
          </h2>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <div className="form-field">

              <label>
                First Name
              </label>

              <input
                type="text"
                name={
                  FORM_FIELDS.FIRST_NAME
                }
                value={
                  formData.firstName
                }
                onChange={
                  handleInputChange
                }
              />

              {validationErrors.firstName && (
                <small>
                  {
                    validationErrors.firstName
                  }
                </small>
              )}

            </div>

            <div className="form-field">

              <label>
                Last Name
              </label>

              <input
                type="text"
                name={
                  FORM_FIELDS.LAST_NAME
                }
                value={
                  formData.lastName
                }
                onChange={
                  handleInputChange
                }
              />

              {validationErrors.lastName && (
                <small>
                  {
                    validationErrors.lastName
                  }
                </small>
              )}

            </div>

            <div className="form-field">

              <label>
                Email
              </label>

              <input
                type="email"
                name={
                  FORM_FIELDS.EMAIL
                }
                value={
                  formData.email
                }
                onChange={
                  handleInputChange
                }
              />

              {validationErrors.email && (
                <small>
                  {
                    validationErrors.email
                  }
                </small>
              )}

            </div>

            <div className="form-field">

              <label>
                Department
              </label>

              <input
                type="text"
                name={
                  FORM_FIELDS.DEPARTMENT
                }
                value={
                  formData.department
                }
                onChange={
                  handleInputChange
                }
              />

              {validationErrors.department && (
                <small>
                  {
                    validationErrors.department
                  }
                </small>
              )}

            </div>

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              {isEditMode
                ? "Update User"
                : "Create User"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default UserForm;