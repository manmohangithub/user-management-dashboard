import UserRow from "./UserRow";

import {
  TABLE_COLUMNS,
} from "../utils/constants";

function UserTable({
  users,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
}) {
  return (
    <section className="table-card">

      <table className="user-table">

        <thead>

          <tr>

            {TABLE_COLUMNS.map(
              (column) => (
                <th
                  key={column.key}
                >
                  <button
                    className="table-sort"
                    onClick={() =>
                      onSort(column.key)
                    }
                  >
                    {column.label}

                    {sortConfig.field ===
                      column.key &&
                      (
                        <span>
                          {sortConfig.direction ===
                          "asc"
                            ? " ▲"
                            : " ▼"}
                        </span>
                      )}

                  </button>
                </th>
              )
            )}

            <th>
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.length === 0 ? (
            <tr>

              <td
                colSpan="6"
                className="table-empty"
              >
                No users found.
              </td>

            </tr>
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}

        </tbody>

      </table>

    </section>
  );
}

export default UserTable;