import { Link } from "react-router-dom";

function LinkedList() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            LinkedList Algorithms
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Explore different LinkedList algorithms and their visualizations
          </p>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
          {/* Palindrome Button */}
          <Link 
            to="/LinkedList/palindromeOfAList"
            className="group bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-purple-500 rounded-xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 block"
          >
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors duration-300">
                Palindrome of a Linked List
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Check if a linked list reads the same forwards and backwards
              </p>
            </div>
          </Link>

          {/* Merge K Linked Lists Button */}
          <Link 
            to="/LinkedList/mergeKLinkedList"
            className="group bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-blue-500 rounded-xl p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 block"
          >
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">
                Merge K Linked Lists
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Merge multiple sorted linked lists into one sorted list
              </p>
            </div>
          </Link>
        </div>

        {/* Back to Home Button */}
        <div className="mt-8">
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-gray-500 hover:border-gray-400 rounded-lg transition-all duration-300 text-gray-300 hover:text-white"
          >
            <span className="mr-2">←</span>
            Back to Home
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

export default LinkedList;
