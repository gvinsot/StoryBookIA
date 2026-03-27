import React from 'react';
import './Modal.css';

/**
 * Modale interactive
 * @param {Object} props - Props du composant
 * @param {boolean} props.isOpen - État d'ouverture
 * @param {function} props.onClose - Callback de fermeture
 * @param {string} props.title - Titre de la modale
 * @param {node} props.children - Contenu de la modale
 * @param {string} props.size - small, medium, large (default: medium)
 */
export const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => {
  const { isOpen, onClose, title, children, size = 'medium' } = props;
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal modal-${size}`} onClick={e => e.stopPropagation()}>
        {title && <div className="modal-header"><h2>{title}</h2></div>}
        <div className="modal-body">{children}</div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Modal;
