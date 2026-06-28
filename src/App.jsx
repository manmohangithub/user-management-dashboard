import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import UserForm from "./components/UserForm";
import ConfirmDelete from "./components/ConfirmDelete";

import useUsers from "./hooks/useUsers";

function App() {
  const {
    users,

    loading,
    error,
    notification,

    searchText,
    setSearchText,

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
  } = useUsers();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={retryFetch}
      />
    );
  }

  return (
    <main className="app">
      <Header />

      <section className="toolbar">
        <SearchBar
          value={searchText}
          onChange={setSearchText}
        />

        <div className="toolbar__actions">
          <FilterPopup
            filters={filters}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
          />

          <button
            type="button"
            className="primary-button"
            onClick={openAddForm}
          >
            Add User
          </button>
        </div>
      </section>

      {notification.message && (
        <div
          className={`notification notification--${notification.type}`}
          role="status"
        >
          {notification.message}
        </div>
      )}

      <UserTable
        users={users}
        sortConfig={sortConfig}
        onSort={handleSort}
        onEdit={openEditForm}
        onDelete={openDeleteModal}
      />

      <Pagination
        pagination={pagination}
        onPageChange={changePage}
        onPageSizeChange={changePageSize}
      />

      <UserForm
        isOpen={isFormOpen}
        user={selectedUser}
        onClose={closeForm}
        onSave={saveUser}
      />

      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        user={userToDelete}
        onCancel={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </main>
  );
}

export default App;