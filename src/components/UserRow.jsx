function UserRow({
  user,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="table-row">

      <td>{user.id}</td>

      <td>{user.firstName}</td>

      <td>{user.lastName}</td>

      <td>{user.email}</td>

      <td>{user.department}</td>

      <td>

        <div className="table-actions">

          <button
            className="edit-button"
            onClick={() =>
              onEdit(user)
            }
          >
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() =>
              onDelete(user)
            }
          >
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
}

export default UserRow;