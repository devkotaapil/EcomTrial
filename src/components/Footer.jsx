// src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 mt-auto">
    <div className="container mx-auto text-center">
      <p>&copy; 2025 Appeal. All rights reserved.</p>
      <div className="space-x-4 mt-2">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
    </div>
  </footer>
);

export default Footer;