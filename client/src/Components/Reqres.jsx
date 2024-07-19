import React from 'react';

const Reqres = ({ log, onClose }) => {
  if (!log) {
    return null;
  }

  const renderObject = (obj) => {
    return Object.keys(obj).map((key) => (
      <tr key={key}>
        <td className="border px-4 py-2 bg-gray-100 font-semibold">{key}</td>
        <td className="border px-4 py-2">{JSON.stringify(obj[key], null, 2)}</td>
      </tr>
    ));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={onClose}
        className="mb-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Close
      </button>
      <div className="border border-gray-200 rounded-lg mb-6 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th colSpan="2" className="px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">
                Request
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="border px-4 py-2 bg-gray-100 font-bold">URL</td>
              <td className="border px-4 py-2">{log.projectID}</td>
            </tr>
            <tr>
              <td colSpan="2" className="border px-4 py-2">
                <div className="font-bold mb-2">Body</div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Key</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    </tr>
                  </thead>
                  <tbody>{renderObject(log.filter)}</tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="border px-4 py-2">
                <div className="font-bold mb-2">Headers</div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Key</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    </tr>
                  </thead>
                  <tbody>{renderObject(log.filter)}</tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-lg font-medium text-gray-700 uppercase tracking-wider">Response</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="border px-4 py-2 whitespace-pre-wrap">{JSON.stringify(log, null, 2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reqres;
