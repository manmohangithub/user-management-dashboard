import { useState } from "react";

function FilterPopup({
  filters,
  applyFilters,
  resetFilters,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [localFilters, setLocalFilters] =
    useState(filters);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLocalFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));
  };

  const handleApply = () => {
    applyFilters(localFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const emptyFilters = {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    };

    setLocalFilters(emptyFilters);
    resetFilters();
    setIsOpen(false);
  };

  return (
    <div className="filter">

      <button
        className="secondary-button"
        onClick={() =>
          setIsOpen(!isOpen)
        }
      >
        Filter
      </button>

      {isOpen && (
        <div className="filter__popup">

          <h3>Filters</h3>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={localFilters.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={localFilters.lastName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={localFilters.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={localFilters.department}
            onChange={handleChange}
          />

          <div className="filter__actions">

            <button
              className="secondary-button"
              onClick={handleReset}
            >
              Reset
            </button>

            <button
              className="primary-button"
              onClick={handleApply}
            >
              Apply
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default FilterPopup;