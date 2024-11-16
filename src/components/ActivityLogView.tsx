// import { useState, useMemo } from 'react';
// import { DatePicker, Select, Input, Pagination, Empty } from 'antd';
// import { Dayjs } from 'dayjs';
// import { ActivityLog } from '../types';

// export const ActivityLogView = () => {
//   const [logs, ] = useState<ActivityLog[]>([
//     {
//       id: 1,
//       description: 'Checked in to Project Alpha',
//       startTime: '2024-11-01T08:00:00Z',
//       endTime: '2024-11-01T12:00:00Z',
//       employeeId: 'emp1',
//       projectId: 'proj1',
//       startLocation: { latitude: 40.7128, longitude: -74.006 },
//       endLocation: { latitude: 40.713, longitude: -74.005 },
//     },
//     {
//       id: 2,
//       description: 'Completed milestone for Project Beta',
//       startTime: '2024-11-01T14:00:00Z',
//       endTime: '2024-11-01T18:00:00Z',
//       employeeId: 'emp2',
//       projectId: 'proj2',
//       startLocation: { latitude: 34.0522, longitude: -118.2437 },
//       endLocation: { latitude: 34.0525, longitude: -118.2434 },
//     },
//   ]);
//   const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
//   const [selectedEmployee, setSelectedEmployee] = useState<string>('');
//   const [selectedProject, setSelectedProject] = useState<string>('');
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [sortField, setSortField] = useState<'startTime' | 'endTime'>('startTime');
//   const [currentPage, setCurrentPage] = useState<number>(1);

  
//   const itemsPerPage = 5;

//   // Filter and sort logs dynamically
//   const filteredAndSortedLogs = useMemo(() => {
//     const filtered = logs.filter((log) => {
//       const matchesDateRange =
//         (!dateRange[0] || new Date(log.startTime) >= dateRange[0].toDate()) &&
//         (!dateRange[1] || new Date(log.endTime) <= dateRange[1].toDate());

//       const matchesEmployee = !selectedEmployee || log.employeeId === selectedEmployee;
//       const matchesProject = !selectedProject || log.projectId === selectedProject;
//       const matchesSearchQuery = !searchQuery || log.description.toLowerCase().includes(searchQuery.toLowerCase());

//       return matchesDateRange && matchesEmployee && matchesProject && matchesSearchQuery;
//     });

//     // Sort only by valid sortable fields
//     filtered.sort((a, b) => {
//       const aValue = new Date(a[sortField]).getTime();
//       const bValue = new Date(b[sortField]).getTime();
//       return aValue - bValue;
//     });

//     return filtered;
//   }, [logs, dateRange, selectedEmployee, selectedProject, searchQuery, sortField]);

//   // Paginate logs
//   const paginatedLogs = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredAndSortedLogs.slice(start, start + itemsPerPage);
//   }, [filteredAndSortedLogs, currentPage]);

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <DatePicker.RangePicker
//           value={dateRange}
//           onChange={(dates) => setDateRange(dates || [null, null])}
//           placeholder={['Start Date', 'End Date']}
//         />
//         <Select
//           value={selectedEmployee}
//           onChange={setSelectedEmployee}
//           placeholder="Select employee"
//           options={[
//             { value: '', label: 'All Employees' },
//             { value: 'emp1', label: 'Employee 1' },
//             { value: 'emp2', label: 'Employee 2' },
//           ]}
//         />
//         <Select
//           value={selectedProject}
//           onChange={setSelectedProject}
//           placeholder="Select project"
//           options={[
//             { value: '', label: 'All Projects' },
//             { value: 'proj1', label: 'Project 1' },
//             { value: 'proj2', label: 'Project 2' },
//           ]}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <Input.Search
//           placeholder="Search logs"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           allowClear
//         />
//         <Select
//           value={sortField}
//           onChange={(value) => setSortField(value as 'startTime' | 'endTime')}
//           placeholder="Sort by"
//           options={[
//             { value: 'startTime', label: 'Start Time' },
//             { value: 'endTime', label: 'End Time' },
//           ]}
//         />
//       </div>

//       <div className="bg-white rounded-lg shadow p-4">
//         {paginatedLogs.length > 0 ? (
//           paginatedLogs.map((log) => (
//             <div key={log.id} className="border-b p-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h4 className="font-semibold">{log.description}</h4>
//                   <p className="text-sm text-gray-500">
//                     Start: {new Date(log.startTime).toLocaleString()}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     End: {new Date(log.endTime).toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   <p>
//                     Start Location: {log.startLocation.latitude},{' '}
//                     {log.startLocation.longitude}
//                   </p>
//                   <p>
//                     End Location: {log.endLocation.latitude},{' '}
//                     {log.endLocation.longitude}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <Empty description="No logs found" />
//         )}
//       </div>

//       <Pagination
//         current={currentPage}
//         pageSize={itemsPerPage}
//         total={filteredAndSortedLogs.length}
//         onChange={(page) => setCurrentPage(page)}
//         className="mt-4"
//       />
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Updated imports
import 'leaflet/dist/leaflet.css';
import { CSVLink } from 'react-csv';
import { debounce } from 'lodash';

// Fix for Leaflet marker icon issue
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface ActivityLogEntry {
  employeeName: string;
  projectName: string;
  task: string;
  startTimestamp: string;
  endTimestamp: string;
  startGPS: { lat: number; lng: number };
  endGPS: { lat: number; lng: number };
}

export const ActivityLogView: React.FC = () => {
  const [activityLogs, setActivityLogs] = useState<ActivityLogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLogEntry[]>([]);
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
    start: new Date('2023-01-01'),
    end: new Date(),
  });

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  useEffect(() => {
    filterActivityLogs();
  }, [activityLogs, employeeFilter, projectFilter, dateRange]);

  const fetchActivityLogs = async () => {
    const response = await fetch('/api/activity-logs');
    const data = await response.json();
    setActivityLogs(data);
  };

  const filterActivityLogs = () => {
    setFilteredLogs(
      activityLogs.filter((log) => {
        const employeeMatch = employeeFilter
          ? log.employeeName.toLowerCase().includes(employeeFilter.toLowerCase())
          : true;
        const projectMatch = projectFilter
          ? log.projectName.toLowerCase().includes(projectFilter.toLowerCase())
          : true;
        const dateMatch =
          new Date(log.startTimestamp) >= dateRange.start &&
          new Date(log.startTimestamp) <= dateRange.end;
        return employeeMatch && projectMatch && dateMatch;
      })
    );
  };

  const handleEmployeeFilterChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeFilter(event.target.value);
  }, 500);

  const handleProjectFilterChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectFilter(event.target.value);
  }, 500);

  const handleDateRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [start, end] = event.target.value.split(' - ');
    setDateRange({
      start: new Date(start),
      end: new Date(end),
    });
  };

  const csvData = [
    ['Employee Name', 'Project Name', 'Task', 'Start Timestamp', 'End Timestamp', 'Start GPS', 'End GPS'],
    ...filteredLogs.map((log) => [
      log.employeeName,
      log.projectName,
      log.task,
      log.startTimestamp,
      log.endTimestamp,
      `${log.startGPS.lat}, ${log.startGPS.lng}`,
      `${log.endGPS.lat}, ${log.endGPS.lng}`,
    ]),
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <label htmlFor="employee-filter" className="mr-2">
          Employee:
        </label>
        <input
          id="employee-filter"
          type="text"
          className="border rounded p-2"
          placeholder="Filter by employee"
          onChange={handleEmployeeFilterChange}
        />
        <label htmlFor="project-filter" className="ml-4 mr-2">
          Project:
        </label>
        <input
          id="project-filter"
          type="text"
          className="border rounded p-2"
          placeholder="Filter by project"
          onChange={handleProjectFilterChange}
        />
        <label htmlFor="date-range" className="ml-4 mr-2">
          Date Range:
        </label>
        <input
          id="date-range"
          type="text"
          className="border rounded p-2"
          placeholder="Filter by date range (YYYY-MM-DD - YYYY-MM-DD)"
          onChange={handleDateRangeChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded p-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Employee Name</th>
                <th className="text-left">Project Name</th>
                <th className="text-left">Task</th>
                <th className="text-left">Start Timestamp</th>
                <th className="text-left">End Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.employeeName}</td>
                  <td>{log.projectName}</td>
                  <td>{log.task}</td>
                  <td>{log.startTimestamp}</td>
                  <td>{log.endTimestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white shadow rounded p-4">
          <MapContainer center={[0, 0]} zoom={2} style={{ height: '300px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredLogs.map((log, index) => (
              <Marker key={index} position={[log.startGPS.lat, log.startGPS.lng]}>
                <Popup>
                  <p>Employee: {log.employeeName}</p>
                  <p>Project: {log.projectName}</p>
                  <p>Task: {log.task}</p>
                  <p>Start: {log.startTimestamp}</p>
                  <p>End: {log.endTimestamp}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      <div className="mt-4">
        <CSVLink data={csvData} filename="activity-logs.csv" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Export to CSV
        </CSVLink>
      </div>
    </div>
  );
};
