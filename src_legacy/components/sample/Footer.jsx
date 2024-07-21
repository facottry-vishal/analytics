// components/Footer.js

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <h5 className="font-semibold mb-4">Solutions</h5>
              <ul>
                <li className="mb-2">Marketing</li>
                <li className="mb-2">Analytics</li>
                <li className="mb-2">Commerce</li>
                <li className="mb-2">Insights</li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <h5 className="font-semibold mb-4">Support</h5>
              <ul>
                <li className="mb-2">Pricing</li>
                <li className="mb-2">Documentation</li>
                <li className="mb-2">Guides</li>
                <li className="mb-2">API Status</li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <h5 className="font-semibold mb-4">Company</h5>
              <ul>
                <li className="mb-2">About</li>
                <li className="mb-2">Blog</li>
                <li className="mb-2">Jobs</li>
                <li className="mb-2">Press</li>
                <li className="mb-2">Partners</li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul>
                <li className="mb-2">Claim</li>
                <li className="mb-2">Privacy</li>
                <li className="mb-2">Terms</li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <h5 className="font-semibold mb-4">Subscribe to our newsletter</h5>
              <p className="text-gray-400 mb-4">The latest news, articles, and resources, sent to your inbox weekly.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white p-2 rounded-l-md focus:outline-none"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-md">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6 flex justify-between items-center">
            <p className="text-gray-500">© 2020 Your Company, Inc. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-500 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-500 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-500 hover:text-white"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  