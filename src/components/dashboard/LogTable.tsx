import React, { useState } from 'react';
import Reqres from '../Reqres';

interface LogTableProps {
  logs: any[];
}

const LogTable: React.FC<LogTableProps> = ({ logs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedLog, setSelectedLog] = useState<any | null>(null);

  if (!logs || logs.length === 0) {
    return <div className="text-center text-gray-500 mt-4">No logs available</div>;
  }

  // Get the headers from the keys of the first log object
  const headers = Object.keys(logs[0]);

  const renderCellContent = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        return (
          <ul className="list-disc list-inside">
            {value.map((item: string, idx: number) => (
              <li key={idx} className="truncate">{item.split('/').pop()}</li>
            ))}
          </ul>
        );
      } else if ('$date' in value) {
        return new Date(value.$date).toLocaleDateString();
      } else if ('COUNTRY' in value && 'SUBSCRIPTION' in value) {
        return `${value.COUNTRY} (${value.SUBSCRIPTION})`;
      } else {
        return JSON.stringify(value, null, 2);
      }
    }
    return typeof value === 'string' ? value.split(' ')[0] : String(value);
  };

  const totalPages = Math.ceil(logs.length / rowsPerPage);
  const currentLogs = logs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleViewDetails = (log: any) => {
    setSelectedLog(log);
  };

  const handleCloseDetails = () => {
    setSelectedLog(null);
  };

  return (
    <div>
      {selectedLog ? (
        <Reqres log={selectedLog} onClose={handleCloseDetails} />
      ) : (
        <div className="overflow-x-auto max-h-[500px] border border-gray-300 shadow-md rounded-md py-8 m-4">
          <div className="mb-8 flex items-center justify-between px-7">
          <div className="text-gray-700 text-2xl font-bold">Log Entries</div>
          <div>
              <label className="mr-2 text-gray-600">Rows per page:</label>
              <select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-100">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(currentLogs as any[]).map((log: any, index: number) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={header} className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis">
                      <div className="truncate">
                        {header === '_id' ? log[header].$oid.split('').slice(-4).join('') : renderCellContent(log[header])}
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-blue-500">
                    <button onClick={() => handleViewDetails(log)} className="hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-8 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-8 bg-gray-300 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogTable;
