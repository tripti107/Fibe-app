export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination-row">
      <span className="pagination-count">Page {page} of {totalPages}</span>
      <div className="pagination-controls">
        <button
          className={`pagination-button ${page === 1 ? "disabled" : ""}`}
          disabled={page === 1}
          onClick={onPrev}
        >
          ← Prev
        </button>
        <span className="pagination-page">{page}</span>
        <button
          className={`pagination-button ${page === totalPages ? "disabled" : ""}`}
          disabled={page === totalPages}
          onClick={onNext}
        >
          Next →
        </button>
      </div>
    </div>
  );
}