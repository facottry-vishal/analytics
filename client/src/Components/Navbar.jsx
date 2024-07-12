import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Replace with your logo */}
        <div className="text-white text-2xl font-bold">Logo</div>
        <div className="ml-6">
          <ul className="flex space-x-4 text-gray-300">
            <li className="hover:text-white">
              <a href="#">Dashboard</a>
            </li>
            <li className="hover:text-white">
              <a href="#">Team</a>
            </li>
            <li className="hover:text-white">
              <a href="#">Projects</a>
            </li>
            <li className="hover:text-white">
              <a href="#">Calendar</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-gray-300 placeholder-gray-500 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <svg
            className="absolute left-3 top-2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
        <svg
          className="text-gray-300 w-6 h-6 hover:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405M19 11a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          />
        </svg>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600">
          <Image
            src="/path/to/profile-picture.jpg"
            alt="Profile Picture"
            width={40}
            height={40}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
