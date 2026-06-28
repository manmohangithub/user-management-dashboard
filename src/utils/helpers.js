import {
  DEFAULT_DEPARTMENT,
  SORT_DIRECTIONS,
} from "./constants";

/*
|--------------------------------------------------------------------------
| Name Helpers
|--------------------------------------------------------------------------
*/

/**
 * Splits a full name into first and last names.
 */
export const splitFullName = (fullName = "") => {
  const trimmedName = fullName.trim();

  if (!trimmedName) {
    return {
      firstName: "",
      lastName: "",
    };
  }

  const [firstName, ...lastNameParts] =
    trimmedName.split(/\s+/);

  return {
    firstName,
    lastName: lastNameParts.join(" "),
  };
};

/**
 * Uses company.name as the department.
 * Falls back to DEFAULT_DEPARTMENT.
 */
export const generateDepartment = (company = {}) => {
  return company?.name?.trim() || DEFAULT_DEPARTMENT;
};

/**
 * Maps JSONPlaceholder user
 * to dashboard user model.
 */
export const mapApiUserToUser = (user) => {
  const {
    firstName,
    lastName,
  } = splitFullName(user.name);

  return {
    id: Number(user.id),
    firstName,
    lastName,
    email: user.email || "",
    department: generateDepartment(user.company),
  };
};

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

export const searchUsers = (
  users,
  searchText = ""
) => {
  const keyword =
    searchText.trim().toLowerCase();

  if (!keyword) {
    return [...users];
  }

  return users.filter((user) => {
    return (
      user.firstName
        .toLowerCase()
        .includes(keyword) ||
      user.lastName
        .toLowerCase()
        .includes(keyword) ||
      user.email
        .toLowerCase()
        .includes(keyword) ||
      user.department
        .toLowerCase()
        .includes(keyword)
    );
  });
};

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

export const filterUsers = (
  users,
  filters
) => {
  const {
    firstName = "",
    lastName = "",
    email = "",
    department = "",
  } = filters;

  return users.filter((user) => {
    return (
      user.firstName
        .toLowerCase()
        .includes(
          firstName.trim().toLowerCase()
        ) &&
      user.lastName
        .toLowerCase()
        .includes(
          lastName.trim().toLowerCase()
        ) &&
      user.email
        .toLowerCase()
        .includes(
          email.trim().toLowerCase()
        ) &&
      user.department
        .toLowerCase()
        .includes(
          department
            .trim()
            .toLowerCase()
        )
    );
  });
};

/*
|--------------------------------------------------------------------------
| Sorting
|--------------------------------------------------------------------------
*/

export const sortUsers = (
  users,
  sortConfig
) => {
  const {
    field,
    direction,
  } = sortConfig;

  const sortedUsers = [...users];

  sortedUsers.sort((first, second) => {
    if (field === "id") {
      return direction ===
        SORT_DIRECTIONS.ASC
        ? first.id - second.id
        : second.id - first.id;
    }

    const firstValue = String(
      first[field] ?? ""
    );

    const secondValue = String(
      second[field] ?? ""
    );

    const comparison =
      firstValue.localeCompare(
        secondValue,
        undefined,
        {
          sensitivity: "base",
          numeric: true,
        }
      );

    return direction ===
      SORT_DIRECTIONS.ASC
      ? comparison
      : -comparison;
  });

  return sortedUsers;
};

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

export const paginateUsers = (
  users,
  currentPage,
  pageSize
) => {
  const startIndex =
    (currentPage - 1) * pageSize;

  return users.slice(
    startIndex,
    startIndex + pageSize
  );
};

export const calculateTotalPages = (
  totalRecords,
  pageSize
) => {
  if (pageSize <= 0) {
    return 1;
  }

  return Math.max(
    1,
    Math.ceil(totalRecords / pageSize)
  );
};

/*
|--------------------------------------------------------------------------
| Processing Pipeline
|--------------------------------------------------------------------------
*/

export const processUsers = ({
  users,
  searchText,
  filters,
  sortConfig,
}) => {
  const searchedUsers =
    searchUsers(users, searchText);

  const filteredUsers =
    filterUsers(
      searchedUsers,
      filters
    );

  return sortUsers(
    filteredUsers,
    sortConfig
  );
};