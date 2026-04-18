export default function DataTable({ data, onView, sortKey, sortDir, onSort }) {
  const icon = (key) => {
    if (sortKey !== key) return " ↕";
    return sortDir === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="table-card">
      <table className="data-table" role="table">
        <thead>
          <tr>
            <th className={`table-header ${sortKey === "codigo" ? "active" : ""}`} onClick={() => onSort("codigo")}> 
              Code{icon("codigo")}
            </th>
            <th className={`table-header ${sortKey === "nome" ? "active" : ""}`} onClick={() => onSort("nome")}> 
              Name{icon("nome")}
            </th>
            <th className="table-header no-sort">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="empty-state">
                No results found.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.codigo}>
                <td className="table-cell code-cell">
                  <span className="code-pill">{item.codigo}</span>
                </td>
                <td className="table-cell">{item.nome}</td>
                <td className="table-cell">
                  <button
                    onClick={() => onView(item)}
                    className="view-button"
                    aria-label={`View details for ${item.nome}`}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}