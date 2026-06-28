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
 */
export const generateDepartment = (
  company = {}
) => {
  return (
    company?.name?.trim() ||
    DEFAULT_DEPARTMENT
  );
};

/*
|--------------------------------------------------------------------------
| Indian Employee Data
|--------------------------------------------------------------------------
*/

const INDIAN_EMPLOYEES = {
  1: {
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@techsolutions.in",
    department: "Engineering",
  },

  2: {
    firstName: "Priya",
    lastName: "Reddy",
    email: "priya.reddy@techsolutions.in",
    department: "Human Resources",
  },

  3: {
    firstName: "Arjun",
    lastName: "Verma",
    email: "arjun.verma@techsolutions.in",
    department: "Finance",
  },

  4: {
    firstName: "Sneha",
    lastName: "Iyer",
    email: "sneha.iyer@techsolutions.in",
    department: "Marketing",
  },

  5: {
    firstName: "Vikram",
    lastName: "Patel",
    email: "vikram.patel@techsolutions.in",
    department: "Operations",
  },

  6: {
    firstName: "Neha",
    lastName: "Gupta",
    email: "neha.gupta@techsolutions.in",
    department: "Sales",
  },

  7: {
    firstName: "Karthik",
    lastName: "Rao",
    email: "karthik.rao@techsolutions.in",
    department: "Engineering",
  },

  8: {
    firstName: "Ananya",
    lastName: "Nair",
    email: "ananya.nair@techsolutions.in",
    department: "Product",
  },

  9: {
    firstName: "Rohit",
    lastName: "Mehta",
    email: "rohit.mehta@techsolutions.in",
    department: "Customer Support",
  },

  10: {
    firstName: "Kavya",
    lastName: "Singh",
    email: "kavya.singh@techsolutions.in",
    department: "Information Technology",
  },
};

/*
|--------------------------------------------------------------------------
| Maps JSONPlaceholder User
|--------------------------------------------------------------------------
*/

export const mapApiUserToUser = (
  user
) => {
  const employee =
    INDIAN_EMPLOYEES[user.id];

  if (employee) {
    return {
      id: Number(user.id),
      firstName:
        employee.firstName,
      lastName:
        employee.lastName,
      email: employee.email,
      department:
        employee.department,
    };
  }

  const {
    firstName,
    lastName,
  } = splitFullName(user.name);

  return {
    id: Number(user.id),
    firstName,
    lastName,
    email: user.email || "",
    department:
      generateDepartment(
        user.company
      ),
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
          firstName
            .trim()
            .toLowerCase()
        ) &&
      user.lastName
        .toLowerCase()
        .includes(
          lastName
            .trim()
            .toLowerCase()
        ) &&
      user.email
        .toLowerCase()
        .includes(
          email
            .trim()
            .toLowerCase()
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

  sortedUsers.sort(
    (first, second) => {
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
            sensitivity:
              "base",
            numeric: true,
          }
        );

      return direction ===
        SORT_DIRECTIONS.ASC
        ? comparison
        : -comparison;
    }
  );

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
    (currentPage - 1) *
    pageSize;

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
    Math.ceil(
      totalRecords / pageSize
    )
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
    searchUsers(
      users,
      searchText
    );

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