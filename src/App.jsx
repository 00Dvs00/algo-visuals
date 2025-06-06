import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800/50 backdrop-blur-sm">
        <div className="text-xl font-bold">Algorithm Visualizer</div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition-colors duration-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-400 transition-colors duration-200">
            About
          </Link>
          <a
            href="https://github.com/00Dvs00"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-6">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Algorithm Visualizer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Explore algorithms with animations
          </p>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {/* Sorting Button */}
          <Link to="/LinkedList"
            className="group bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 rounded-xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 block"
          >
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors duration-300">
                LinkedList
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Learn about trees, graphs, linked lists, and other structures
              </p>
            </div>
          </Link>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        Made with ❤️ using React and Tailwind
      </footer>
    </div>
  );
}

export default App;
