import { useState, useEffect, useCallback } from "react";
import { fetchCarModels } from "./services/api";
import DataTable from "./component/DataTable";
import Pagination from "./component/Pagination";
import Filter from "./component/Filter";
import Modal from "./component/Modal";
import "./App.css";

const PAGE_OPTIONS = [10, 20, 30];

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("nome");
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_OPTIONS[0]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchCarModels()
      .then((models) => { setData(models); setLoading(false); })
      .catch(() => { setError("Failed to load data. Please try again."); setLoading(false); });
  }, []);

  const filtered = data.filter((r) =>
    r.nome.toLowerCase().includes(search.toLowerCase())
  );

  
  const sorted = [...filtered].sort((a, b) => {
    let av = sortKey === "codigo" ? Number(a.codigo) : a.nome.toLowerCase();
    let bv = sortKey === "codigo" ? Number(b.codigo) : b.nome.toLowerCase();
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const handleSearch = useCallback((val) => {
    setSearch(val);
    setPage(1);
  }, []);

  if (loading) return (
    <div className="loader-page">
      <div className="loader-card">
        <div className="loader-spinner" />
        <div className="loader-text">Loading car data...</div>
      </div>
    </div>
  );
  if (error) return <div className="error-box">{error}</div>;

  return (
    <main className="app-root">
      <section className="app-header">
        <div>
          <h1 className="app-title">FIPE Car Models</h1>
          <p className="app-subtitle">Browse, search and sort car models — {data.length} total</p>
        </div>

        <div className="status-grid">
          {[
            { label: "Total", value: data.length, help: "All models" },
            { label: search ? "Matches" : "Shown", value: filtered.length, help: search ? `for “${search}”` : "All results" },
            { label: "Page", value: `${safePage}/${totalPages}`, help: `${paged.length} items on page` },
          ].map(({ label, value, help }) => (
            <div key={label} className="status-card">
              <span className="status-label">{label}</span>
              <span className="status-value">{value}</span>
              <span className="status-help">{help}</span>
            </div>
          ))}
        </div>

        <p className="status-info">
          {search
            ? `Showing ${filtered.length} matching model${filtered.length === 1 ? "" : "s"} for “${search}”.`
            : `Showing all ${data.length} car models.`}
        </p>
      </section>

      <Filter onSearch={handleSearch} />

      <div className="toolbar-row">
        <label className="page-size-label" htmlFor="rows-per-page">
          Rows per page
          <select
            id="rows-per-page"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="page-size-select"
            aria-label="Choose rows per page"
          >
            {PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <DataTable
        data={paged}
        onView={setModal}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
      />

      <Pagination
        page={safePage}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />

      <Modal item={modal} onClose={() => setModal(null)} />
    </main>
  );
}