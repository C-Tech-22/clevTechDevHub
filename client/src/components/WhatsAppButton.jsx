import { FaWhatsapp } from 'react-icons/fa';
import { useSite } from '../context/SiteContext.jsx';

const WhatsAppButton = () => {
  const { settings } = useSite();
  const number = settings?.whatsapp?.replace(/[^\d]/g, '');

  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 54,
        height: 54,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 26,
        boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
        zIndex: 90,
      }}
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppButton;
