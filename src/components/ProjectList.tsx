//Code if you have API [Ajith P M]


// import { useState, useEffect } from 'react';
// import { Card, Badge } from 'antd';
// import { Project } from '../types';

// export const ProjectList = () => {
//   const [projects, setProjects] = useState<Project[]>([]);

//   // Simulating API call
//   useEffect(() => {
//     const fetchProjects = async () => {
//       const response = await fetch('/api/projects'); // Replace with your API endpoint
//       const data: Project[] = await response.json();
//       setProjects(data); // Dynamically update projects
//     };

//     fetchProjects();
//   }, []); // Fetch data when component mounts

//   const getStatusColor = (status: Project['status']) => {
//     switch (status) {
//       case 'active':
//         return 'bg-green-100 text-green-800';
//       case 'completed':
//         return 'bg-blue-100 text-blue-800';
//       case 'on-hold':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {projects.map((project) => (
//         <Card key={project.id} className="p-4">
//           <div className="flex justify-between items-start">
//             <h3 className="text-lg font-semibold">{project.name}</h3>
//             <Badge className={getStatusColor(project.status)}>
//               {project.status}
//             </Badge>
//           </div>
//           <p className="text-gray-600 mt-2">{project.description}</p>
//           <div className="mt-4 flex justify-between text-sm text-gray-500">
//             <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
//             <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// };











//Simple version with mock data



// import { useState } from 'react';
// import { Card, Badge } from 'antd';
// import { Project } from '../types';

// export const ProjectList = () => {
//   // Initializing projects with mock data
//   const [projects] = useState<Project[]>([
//     {
//       id: 1,
//       name: 'Project Alpha',
//       status: 'active',
//       description: 'This is an active project aimed at developing cutting-edge technology.',
//       startDate: '2024-01-01',
//       endDate: '2024-12-31',
//     },
//     {
//       id: 2,
//       name: 'Project Beta',
//       status: 'completed',
//       description: 'A successfully completed project focusing on renewable energy solutions.',
//       startDate: '2023-01-01',
//       endDate: '2023-12-31',
//     },
//     {
//       id: 3,
//       name: 'Project Gamma',
//       status: 'on-hold',
//       description: 'A project currently on hold due to budget constraints.',
//       startDate: '2022-07-01',
//       endDate: '2024-06-30',
//     },
//     {
//       id: 4,
//       name: 'Project Delta',
//       status: 'active',
//       description: 'A collaboration project targeting space exploration technologies.',
//       startDate: '2024-05-01',
//       endDate: '2025-04-30',
//     },
//   ]);

//   // Helper function to get badge color based on status
//   const getStatusColor = (status: Project['status']) => {
//     switch (status) {
//       case 'active':
//         return 'bg-green-100 text-green-800';
//       case 'completed':
//         return 'bg-blue-100 text-blue-800';
//       case 'on-hold':
//         return 'bg-yellow-100 text-yellow-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {projects.map((project) => (
//         <Card key={project.id} className="p-4 shadow-md">
//           <div className="flex justify-between items-start">
//             <h3 className="text-lg font-semibold">{project.name}</h3>
//             <Badge className={`px-2 py-1 rounded ${getStatusColor(project.status)}`}>
//               {project.status}
//             </Badge>
//           </div>
//           <p className="text-gray-600 mt-2">{project.description}</p>
//           <div className="mt-4 flex justify-between text-sm text-gray-500">
//             <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
//             <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// };

import { useState } from 'react';
import { Card, Badge, Button, Modal, Form, Input, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';

// Define the Project type
type Project = {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  description: string;
  startDate: string;
  endDate: string;
};

// Define the form values type
type FormValues = {
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  description: string;
  startDate: Moment;
  endDate: Moment;
};

export const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Project Alpha',
      status: 'active',
      description: 'This is an active project aimed at developing cutting-edge technology.',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    },
    {
      id: 2,
      name: 'Project Beta',
      status: 'completed',
      description: 'A successfully completed project focusing on renewable energy solutions.',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
    },
    {
      id: 3,
      name: 'Project Gamma',
      status: 'on-hold',
      description: 'A project currently on hold due to budget constraints.',
      startDate: '2022-07-01',
      endDate: '2024-06-30',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [form] = Form.useForm<FormValues>();

  const getStatusColor = (status: Project['status']): string => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddOrEditProject = (values: FormValues) => {
    const newProject: Project = {
      id: selectedProject?.id || projects.length + 1,
      ...values,
      startDate: values.startDate.format('YYYY-MM-DD'),
      endDate: values.endDate.format('YYYY-MM-DD'),
    };

    setProjects((prev) => {
      if (selectedProject) {
        return prev.map((proj) => (proj.id === selectedProject.id ? newProject : proj));
      } else {
        return [...prev, newProject];
      }
    });
    form.resetFields();
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = (id: number) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Project List</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setSelectedProject(null);
            setIsModalOpen(true);
          }}
        >
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="p-4 shadow-md"
            actions={[
              <EditOutlined
                onClick={() => {
                  form.setFieldsValue({
                    ...project,
                    startDate: moment(project.startDate),
                    endDate: moment(project.endDate),
                  });
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
              />,
              <DeleteOutlined onClick={() => handleDeleteProject(project.id)} />,
            ]}
          >
            <div
              className="cursor-pointer"
              onClick={() => handleViewProject(project)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <Badge className={`px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={selectedProject ? 'Edit Project' : 'Add Project'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        centered
      >
        <Form form={form} onFinish={handleAddOrEditProject} layout="vertical">
          <Form.Item
            name="name"
            label="Project Name"
            rules={[{ required: true, message: 'Please enter the project name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select the start date' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select the end date' }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>

      <Modal 
        title="Project Details"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        centered
      >
        {selectedProject && (
          <>
            <h3 className="text-lg font-semibold">{selectedProject.name}</h3>
            <Badge
              className={`px-2 py-1 rounded ${getStatusColor(selectedProject.status)}`}
            >
              {selectedProject.status}
            </Badge>
            <p className="text-gray-600 mt-2">{selectedProject.description}</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Start: {new Date(selectedProject.startDate).toLocaleDateString()}</p>
              <p>End: {new Date(selectedProject.endDate).toLocaleDateString()}</p>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
