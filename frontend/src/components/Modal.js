import Modal from 'react-modal';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '24px 28px',
    borderRadius: '12px',
    width: '400px',
    maxWidth: '90%',
    border: 'none',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },
};

const typeStyles = {
  success: {
    borderLeft: '6px solid #22c55e',
    icon: <FaCheckCircle color="#22c55e" size={24} />,
    titleColor: '#22c55e',
  },
  error: {
    borderLeft: '6px solid #ef4444',
    icon: <FaTimesCircle color="#ef4444" size={24} />,
    titleColor: '#ef4444',
  },
  info: {
    borderLeft: '6px solid #3b82f6',
    icon: <FaInfoCircle color="#3b82f6" size={24} />,
    titleColor: '#3b82f6',
  },
};

export default function CustomModal({ isOpen, onRequestClose, children, type = 'info', title = '' }) {
  const styles = typeStyles[type] || typeStyles.info;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          ...customStyles.content,
          ...styles,
        },
      }}
      contentLabel="Modal"
      shouldCloseOnOverlayClick={true}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        {styles.icon}
        <h2 style={{ margin: 0, fontSize: '20px', color: styles.titleColor }}>{title}</h2>
      </div>

      <div style={{ fontSize: '15px', color: '#333' }}>
        {children}
      </div>

      <div style={{ textAlign: 'right', marginTop: '24px' }}>
        <button
          onClick={onRequestClose}
          style={{
            padding: '8px 14px',
            background: '#e5e7eb',
            color: '#111827',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.background = '#d1d5db')}
          onMouseOut={(e) => (e.target.style.background = '#e5e7eb')}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
