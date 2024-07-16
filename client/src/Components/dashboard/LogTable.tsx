import React, { useState } from 'react';

const LogTable = () => {
    const [entries] = useState([
        {
          srNumber: 1,
          country: "India",
          subscription: "free",
          os: "Windows",
          osVersion: "Windows 10",
          modelName: "Model A",
          plan: "Basic",
          state: "A",
          actionItems: "view",
          body: { Country: "India", Subscription: "free" },
          headers: { CountryHeader: "India", SubscriptionHeader: "free" },
          projectId: "proj1",
          companyId: "comp1",
        },
        {
          srNumber: 2,
          country: "India",
          subscription: "paid",
          os: "macOS",
          osVersion: "macOS Catalina",
          modelName: "Model B",
          plan: "Standard",
          state: "B",
          actionItems: "view",
          body: { Country: "India", Subscription: "paid" },
          headers: { CountryHeader: "India", SubscriptionHeader: "paid" },
          projectId: "proj2",
          companyId: "comp1",
        },
        {
          srNumber: 3,
          country: "India",
          subscription: "premium",
          os: "Linux",
          osVersion: "Ubuntu 20.04",
          modelName: "Model C",
          plan: "Premium",
          state: "C",
          actionItems: "view",
          body: { Country: "India", Subscription: "premium" },
          headers: { CountryHeader: "India", SubscriptionHeader: "premium" },
          projectId: "proj3",
          companyId: "comp1",
        },
        {
          srNumber: 4,
          country: "India",
          subscription: "free",
          os: "Windows",
          osVersion: "Windows 10",
          modelName: "Model A",
          plan: "Basic",
          state: "A",
          actionItems: "view",
          body: { Country: "India", Subscription: "free" },
          headers: { CountryHeader: "India", SubscriptionHeader: "free" },
          projectId: "proj4",
          companyId: "comp1",
        },
        {
          srNumber: 5,
          country: "India",
          subscription: "paid",
          os: "macOS",
          osVersion: "macOS Catalina",
          modelName: "Model B",
          plan: "Standard",
          state: "B",
          actionItems: "view",
          body: { Country: "India", Subscription: "paid" },
          headers: { CountryHeader: "India", SubscriptionHeader: "paid" },
          projectId: "proj5",
          companyId: "comp1",
        },
        {
          srNumber: 6,
          country: "India",
          subscription: "premium",
          os: "Linux",
          osVersion: "Ubuntu 20.04",
          modelName: "Model C",
          plan: "Premium",
          state: "C",
          actionItems: "view",
          body: { Country: "India", Subscription: "premium" },
          headers: { CountryHeader: "India", SubscriptionHeader: "premium" },
          projectId: "proj6",
          companyId: "comp1",
        },
        {
          srNumber: 7,
          country: "India",
          subscription: "free",
          os: "Windows",
          osVersion: "Windows 10",
          modelName: "Model A",
          plan: "Basic",
          state: "A",
          actionItems: "view",
          body: { Country: "India", Subscription: "free" },
          headers: { CountryHeader: "India", SubscriptionHeader: "free" },
          projectId: "proj7",
          companyId: "comp1",
        },
        {
          srNumber: 8,
          country: "India",
          subscription: "paid",
          os: "macOS",
          osVersion: "macOS Catalina",
          modelName: "Model B",
          plan: "Standard",
          state: "B",
          actionItems: "view",
          body: { Country: "India", Subscription: "paid" },
          headers: { CountryHeader: "India", SubscriptionHeader: "paid" },
          projectId: "proj8",
          companyId: "comp1",
        },
        {
          srNumber: 9,
          country: "India",
          subscription: "premium",
          os: "Linux",
          osVersion: "Ubuntu 20.04",
          modelName: "Model C",
          plan: "Premium",
          state: "C",
          actionItems: "view",
          body: { Country: "India", Subscription: "premium" },
          headers: { CountryHeader: "India", SubscriptionHeader: "premium" },
          projectId: "proj9",
          companyId: "comp1",
        },
        {
          srNumber: 10,
          country: "India",
          subscription: "free",
          os: "Windows",
          osVersion: "Windows 10",
          modelName: "Model A",
          plan: "Basic",
          state: "A",
          actionItems: "view",
          body: { Country: "India", Subscription: "free" },
          headers: { CountryHeader: "India", SubscriptionHeader: "free" },
          projectId: "proj10",
          companyId: "comp1",
        },
        {
          srNumber: 11,
          country: "USA",
          subscription: "free",
          os: "Windows",
          osVersion: "Windows 10",
          modelName: "Model A",
          plan: "Basic",
          state: "A",
          actionItems: "view",
          body: { Country: "USA", Subscription: "free" },
          headers: { CountryHeader: "USA", SubscriptionHeader: "free" },
          projectId: "proj11",
          companyId: "comp2",
        },
        {
          srNumber: 12,
          country: "USA",
          subscription: "paid",
          os: "macOS",
          osVersion: "macOS Catalina",
          modelName: "Model B",
          plan: "Standard",
          state: "B",
          actionItems: "view",
          body: { Country: "USA", Subscription: "paid" },
          headers: { CountryHeader: "USA", SubscriptionHeader: "paid" },
          projectId: "proj12",
          companyId: "comp2",
        },
        {
          srNumber: 13,
          country: "USA",
          subscription: "premium",
          os: "Linux",
          osVersion: "Ubuntu 20.04",
          modelName: "Model C",
          plan: "Premium",
          state: "C",
          actionItems: "view",
          body: { Country: "USA", Subscription: "premium" },
          headers: { CountryHeader: "USA", SubscriptionHeader: "premium" },
          projectId: "proj13",
          companyId: "comp2",
        },
        {
          srNumber: 14,
          country: "USA",
          subscription: "free",
          os: "Windows",
          osVersion: "Windows 10",
          modelName: "Model A",
          plan: "Basic",
          state: "A",
          actionItems: "view",
          body: { Country: "USA", Subscription: "free" },
          headers: { CountryHeader: "USA", SubscriptionHeader: "free" },
          projectId: "proj14",
          companyId: "comp2",
        },
        {
          srNumber: 15,
          country: "USA",
          subscription: "paid",
          os: "macOS",
          osVersion: "macOS Catalina",
          modelName: "Model B",
          plan: "Standard",
          state: "B",
          actionItems: "view",
          body: { Country: "USA", Subscription: "paid" },
          headers: { CountryHeader: "USA", SubscriptionHeader: "paid" },
          projectId: "proj15",
          companyId: "comp2",
        },
        {
          srNumber: 16,
          country: "USA",
          subscription: "premium",
          os: "Linux",
          osVersion: "Ubuntu 20.04",
          modelName: "Model C",
          plan: "Premium",
          state: "C",
          actionItems: "view",
          body: { Country: "USA", Subscription: "premium" },
          headers: { CountryHeader: "USA", SubscriptionHeader: "premium" },
          projectId: "proj16",
          companyId: "comp2",
        },
        {
          srNumber: 17,
          country: "USA",
          subscription: "free",
          os: "Windows",
          osVersion: "Windows 10",
          modelName: "Model A",
          plan: "Basic",
          state: "A",
          actionItems: "view",
          body: { Country: "USA", Subscription: "free" },
          headers: { CountryHeader: "USA", SubscriptionHeader: "free" },
          projectId: "proj17",
          companyId: "comp2",
        },
        {
          srNumber: 18,
          country: "USA",
          subscription: "paid",
          os: "macOS",
          osVersion: "macOS Catalina",
          modelName: "Model B",
          plan: "Standard",
          state: "B",
          actionItems: "view",
          body: { Country: "USA", Subscription: "paid" },
          headers: { CountryHeader: "USA", SubscriptionHeader: "paid" },
          projectId: "proj18",
          companyId: "comp2",
        },
        {
          srNumber: 19,
          country: "USA",
          subscription: "premium",
          os: "Linux",
          osVersion: "Ubuntu 20.04",
          modelName: "Model C",
          plan: "Premium",
          state: "C",
          actionItems: "view",
          body: { Country: "USA", Subscription: "premium" },
          headers: { CountryHeader: "USA", SubscriptionHeader: "premium" },
          projectId: "proj19",
          companyId: "comp2",
        },
        {
          srNumber: 20,
          country: "USA",
          subscription: "free",
          os: "Windows",
          osVersion: "Windows 10",
          modelName: "Model A",
          plan: "Basic",
          state: "A",
          actionItems: "view",
          body: { Country: "USA", Subscription: "free" },
          headers: { CountryHeader: "USA", SubscriptionHeader: "free" },
          projectId: "proj20",
          companyId: "comp2",
        },
      ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Log Manager</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OS Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action Items</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry) => (
                <tr key={entry.srNumber}>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.srNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.country}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.subscription}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.os}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.osVersion}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.modelName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.plan}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.state}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.actionItems}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="py-4">
        <div className="flex justify-between">
          <div>
            <button
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handleChangePage(null, page + 1)}
              disabled={page >= Math.ceil(entries.length / rowsPerPage) - 1}
              className="ml-2 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogTable;
