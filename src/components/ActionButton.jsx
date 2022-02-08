import "../styles/ActionButton.css";

export const ActionButton = ({ action, label, show, dataCy }) =>
  !!show ? (
    <button onClick={action} className="action-button" data-cy={dataCy}>
      {label}
    </button>
  ) : null;
