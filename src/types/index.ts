// src/types/index.ts
export interface Employee {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    joinDate: string;
  }
  
  export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'completed' | 'on-hold';
  }
  
  export interface ActivityLog {
    id: number;
    employeeId: string;
    projectId: string;
    startTime: string;
    endTime: string;
    startLocation: {
      latitude: number;
      longitude: number;
    };
    endLocation: {
      latitude: number;
      longitude: number;
    };
    description: string;
  }

  export interface ActivityLogEntry {
    employeeName: string;
    projectName: string;
    task: string;
    startTimestamp: string;
    endTimestamp: string;
    startGPS: { lat: number; lng: number };
    endGPS: { lat: number; lng: number };
  }

 