import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav class="bg-[#fff] shadow-md px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-bold text-blue-600">
          MySite
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">
            Events
          </Link>
          <Link to="/Products" className="text-gray-700 hover:text-blue-600">
          Products
          </Link>
        </div>
      </div>
    </nav>
  );
}
