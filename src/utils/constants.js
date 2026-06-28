/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

export const API_BASE_URL =
  "https://jsonplaceholder.typicode.com/users";

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_CURRENT_PAGE = 1;

/*
|--------------------------------------------------------------------------
| Sorting
|--------------------------------------------------------------------------
*/

export const SORT_FIELDS = {
  ID: "id",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  DEPARTMENT: "department",
};

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
};

export const DEFAULT_SORT_CONFIG = {
  field: SORT_FIELDS.ID,
  direction: SORT_DIRECTIONS.ASC,
};

/*
|--------------------------------------------------------------------------
| User Defaults
|--------------------------------------------------------------------------
*/

export const DEFAULT_DEPARTMENT = "General";

export const EMPTY_USER = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  department: DEFAULT_DEPARTMENT,
};

/*
|--------------------------------------------------------------------------
| Filters
|--------------------------------------------------------------------------
*/

export const EMPTY_FILTERS = {
  firstName: "",
  lastName: "",
  email: "",
  department: "",
};

/*
|--------------------------------------------------------------------------
| Default Collections
|--------------------------------------------------------------------------
*/

export const EMPTY_USERS = [];

/*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

export const INITIAL_NOTIFICATION = {
  type: "",
  message: "",
};

export const NOTIFICATION_TIMEOUT = 3000;

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

export const SEARCH_PLACEHOLDER =
  "Search by first name, last name, email or department...";

/*
|--------------------------------------------------------------------------
| Validation Messages
|--------------------------------------------------------------------------
*/

export const VALIDATION_MESSAGES = {
  FIRST_NAME_REQUIRED: "First name is required.",
  LAST_NAME_REQUIRED: "Last name is required.",
  EMAIL_REQUIRED: "Email is required.",
  EMAIL_INVALID: "Please enter a valid email address.",
  DEPARTMENT_REQUIRED: "Department is required.",
};

/*
|--------------------------------------------------------------------------
| Success Messages
|--------------------------------------------------------------------------
*/

export const SUCCESS_MESSAGES = {
  USER_CREATED: "User created successfully.",
  USER_UPDATED: "User updated successfully.",
  USER_DELETED: "User deleted successfully.",
};

/*
|--------------------------------------------------------------------------
| API Error Messages
|--------------------------------------------------------------------------
*/

export const API_ERROR_MESSAGES = {
  FETCH_USERS: "Unable to fetch users. Please try again.",
  CREATE_USER: "Unable to create user. Please try again.",
  UPDATE_USER: "Unable to update user. Please try again.",
  DELETE_USER: "Unable to delete user. Please try again.",
};

/*
|--------------------------------------------------------------------------
| Table Configuration
|--------------------------------------------------------------------------
*/

export const TABLE_COLUMNS = [
  {
    key: SORT_FIELDS.ID,
    label: "ID",
    sortable: true,
  },
  {
    key: SORT_FIELDS.FIRST_NAME,
    label: "First Name",
    sortable: true,
  },
  {
    key: SORT_FIELDS.LAST_NAME,
    label: "Last Name",
    sortable: true,
  },
  {
    key: SORT_FIELDS.EMAIL,
    label: "Email",
    sortable: true,
  },
  {
    key: SORT_FIELDS.DEPARTMENT,
    label: "Department",
    sortable: true,
  },
];

/*
|--------------------------------------------------------------------------
| Form Fields
|--------------------------------------------------------------------------
*/

export const FORM_FIELDS = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  DEPARTMENT: "department",
};

/*
|--------------------------------------------------------------------------
| Form Titles
|--------------------------------------------------------------------------
*/

export const FORM_TITLES = {
  ADD: "Add User",
  EDIT: "Edit User",
};

/*
|--------------------------------------------------------------------------
| Delete Confirmation
|--------------------------------------------------------------------------
*/

export const DELETE_MODAL = {
  TITLE: "Delete User",
  MESSAGE:
    "Are you sure you want to delete this user? This action cannot be undone.",
};

/*
|--------------------------------------------------------------------------
| Application
|--------------------------------------------------------------------------
*/

export const APP_TITLE =
  "User Management Dashboard";