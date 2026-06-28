import { useCallback, useEffect, useMemo, useState } from "react";

import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userService";

import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_CONFIG,
  EMPTY_FILTERS,
  EMPTY_USER,
  INITIAL_NOTIFICATION,
  NOTIFICATION_TIMEOUT,
  NOTIFICATION_TYPES,
  SORT_DIRECTIONS,
  SUCCESS_MESSAGES,
} from "../utils/constants";

import {
  mapApiUserToUser,
  processUsers,
  paginateUsers,
  calculateTotalPages,
} from "../utils/helpers";

import {
  validateUser,
} from "../utils/validators";

const useUsers = () => {
  /*
  ==========================================================
  Users
  ==========================================================
  */

  const [allUsers, setAllUsers] = useState([]);

  /*
  ==========================================================
  UI State
  ==========================================================
  */

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [notification, setNotification] =
    useState(INITIAL_NOTIFICATION);

  /*
  ==========================================================
  Search
  ==========================================================
  */

  const [searchText, setSearchText] =
    useState("");

  /*
  ==========================================================
  Filters
  ==========================================================
  */

  const [filters, setFilters] =
    useState(EMPTY_FILTERS);

  /*
  ==========================================================
  Sorting
  ==========================================================
  */

  const [sortConfig, setSortConfig] =
    useState(DEFAULT_SORT_CONFIG);

  /*
  ==========================================================
  Pagination
  ==========================================================
  */

  const [currentPage, setCurrentPage] =
    useState(DEFAULT_CURRENT_PAGE);

  const [pageSize, setPageSize] =
    useState(DEFAULT_PAGE_SIZE);

  /*
  ==========================================================
  User Form
  ==========================================================
  */

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  /*
  ==========================================================
  Delete Modal
  ==========================================================
  */

  const [userToDelete, setUserToDelete] =
    useState(null);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  /*
  ==========================================================
  Notification
  ==========================================================
  */

  const showNotification = useCallback(
    (type, message) => {
      setNotification({
        type,
        message,
      });

      setTimeout(() => {
        setNotification(
          INITIAL_NOTIFICATION
        );
      }, NOTIFICATION_TIMEOUT);
    },
    []
  );

  /*
  ==========================================================
  Load Users
  ==========================================================
  */

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const response =
        await fetchUsers();

      const mappedUsers =
        response.map(mapApiUserToUser);

      setAllUsers(mappedUsers);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  /*
  ==========================================================
  Processing Pipeline
  ==========================================================
  */

  const processedUsers =
    useMemo(() => {
      return processUsers({
        users: allUsers,
        searchText,
        filters,
        sortConfig,
      });
    }, [
      allUsers,
      searchText,
      filters,
      sortConfig,
    ]);

  /*
  ==========================================================
  Pagination
  ==========================================================
  */

  const totalPages =
    calculateTotalPages(
      processedUsers.length,
      pageSize
    );

  const visibleUsers =
    useMemo(() => {
      return paginateUsers(
        processedUsers,
        currentPage,
        pageSize
      );
    }, [
      processedUsers,
      currentPage,
      pageSize,
    ]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(
        DEFAULT_CURRENT_PAGE
      );
    }
  }, [currentPage, totalPages]);

  /*
  ==========================================================
  Search
  ==========================================================
  */

  const updateSearchText = (
    value
  ) => {
    setSearchText(value);

    setCurrentPage(
      DEFAULT_CURRENT_PAGE
    );
  };

  /*
  ==========================================================
  Filters
  ==========================================================
  */

  const applyFilters = (
    updatedFilters
  ) => {
    setFilters(updatedFilters);

    setCurrentPage(
      DEFAULT_CURRENT_PAGE
    );
  };

  const resetFilters = () => {
    setFilters(EMPTY_FILTERS);

    setCurrentPage(
      DEFAULT_CURRENT_PAGE
    );
  };

  /*
  ==========================================================
  Sorting
  ==========================================================
  */

  const handleSort = (field) => {
    setSortConfig((previousSort) => {
      if (
        previousSort.field === field
      ) {
        return {
          field,
          direction:
            previousSort.direction ===
            SORT_DIRECTIONS.ASC
              ? SORT_DIRECTIONS.DESC
              : SORT_DIRECTIONS.ASC,
        };
      }

      return {
        field,
        direction:
          SORT_DIRECTIONS.ASC,
      };
    });
  };

  /*
  ==========================================================
  Pagination Actions
  ==========================================================
  */

  const changePage = (
    pageNumber
  ) => {
    if (
      pageNumber < 1 ||
      pageNumber > totalPages
    ) {
      return;
    }

    setCurrentPage(pageNumber);
  };

  const changePageSize = (
    newPageSize
  ) => {
    setPageSize(Number(newPageSize));

    setCurrentPage(
      DEFAULT_CURRENT_PAGE
    );
  };

    /*
  ==========================================================
  User Form Actions
  ==========================================================
  */

  const openAddForm = () => {
    setSelectedUser({ ...EMPTY_USER });
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setSelectedUser({ ...user });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedUser(null);
    setIsFormOpen(false);
  };

  /*
  ==========================================================
  Save User
  ==========================================================
  */

  const saveUser = async (user) => {
    const validationErrors = validateUser(user);

    if (Object.keys(validationErrors).length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }

    try {
      /*
      ==========================================================
      UPDATE EXISTING USER
      ==========================================================
      */

      if (user.id) {
        let normalizedUser;

        // Existing JSONPlaceholder users
        if (user.id <= 10) {
          const updatedUser = await updateUser(
            user.id,
            user
          );

          normalizedUser = {
            ...user,
            ...updatedUser,
          };
        }

        // Users created locally (not present on JSONPlaceholder)
        else {
          normalizedUser = {
            ...user,
          };
        }

        setAllUsers((previousUsers) =>
          previousUsers.map((currentUser) =>
            currentUser.id === normalizedUser.id
              ? normalizedUser
              : currentUser
          )
        );

        showNotification(
          NOTIFICATION_TYPES.SUCCESS,
          SUCCESS_MESSAGES.USER_UPDATED
        );
      }

      /*
      ==========================================================
      CREATE NEW USER
      ==========================================================
      */

      else {
        const createdUser = await createUser(user);

        const nextId =
          allUsers.length > 0
            ? Math.max(
                ...allUsers.map(
                  (currentUser) =>
                    currentUser.id
                )
              ) + 1
            : 1;

        const normalizedUser = {
          ...user,
          ...createdUser,
          id: nextId,
        };

        setAllUsers((previousUsers) => [
          normalizedUser,
          ...previousUsers,
        ]);

        showNotification(
          NOTIFICATION_TYPES.SUCCESS,
          SUCCESS_MESSAGES.USER_CREATED
        );
      }

      closeForm();

      return {
        success: true,
        errors: {},
      };
    } catch (saveError) {
      setError(saveError.message);

      showNotification(
        NOTIFICATION_TYPES.ERROR,
        saveError.message
      );

      return {
        success: false,
        errors: {},
      };
    }
  };
  /*
  ==========================================================
  Delete Modal
  ==========================================================
  */

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  /*
  ==========================================================
  Delete User
  ==========================================================
  */

  const confirmDelete = async () => {
    if (!userToDelete) {
      return;
    }

    try {
      await deleteUser(userToDelete.id);

      setAllUsers((previousUsers) =>
        previousUsers.filter(
          (currentUser) =>
            currentUser.id !==
            userToDelete.id
        )
      );

      showNotification(
        NOTIFICATION_TYPES.SUCCESS,
        SUCCESS_MESSAGES.USER_DELETED
      );

      closeDeleteModal();
    } catch (deleteError) {
      setError(deleteError.message);

      showNotification(
        NOTIFICATION_TYPES.ERROR,
        deleteError.message
      );
    }
  };

  /*
  ==========================================================
  Retry
  ==========================================================
  */

  const retryFetch = () => {
    loadUsers();
  };

  /*
  ==========================================================
  Pagination Object
  ==========================================================
  */

  const pagination = {
    currentPage,
    pageSize,
    totalPages,
    totalRecords: processedUsers.length,
  };

  /*
  ==========================================================
  Public API
  ==========================================================
  */

  return {
    users: visibleUsers,

    loading,
    error,
    notification,

    searchText,
    setSearchText: updateSearchText,

    filters,
    applyFilters,
    resetFilters,

    sortConfig,
    handleSort,

    pagination,
    changePage,
    changePageSize,

    selectedUser,
    isFormOpen,
    openAddForm,
    openEditForm,
    closeForm,

    saveUser,

    userToDelete,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,

    retryFetch,
  };
};

export default useUsers;