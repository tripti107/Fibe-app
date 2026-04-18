export default function Modal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Car Details</h2>
          <button onClick={onClose} className="modal-close" aria-label="Close details dialog">×</button>
        </div>

        <div className="modal-body">
          <div className="modal-row">
            <span className="modal-key">Code</span>
            <span className="modal-value code-pill">{item.codigo}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">Name</span>
            <span className="modal-value">{item.nome}</span>
          </div>
        </div>
      </div>
    </div>
  );
}