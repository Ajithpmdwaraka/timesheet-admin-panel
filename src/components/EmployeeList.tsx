import { useState } from "react"
import { Table, Button, Input, Modal, Form } from "antd"
import { Employee } from "../types/index"
import { Plus, Search } from "lucide-react"

export const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
      department: "Engineering",
      joinDate: "2021-01-10",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Manager",
      department: "Marketing",
      joinDate: "2022-04-15",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Join Date", dataIndex: "joinDate", key: "joinDate" },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, row: Employee) => (
        <div className="flex space-x-2">
          <Button type="default" size="small" onClick={() => handleEdit(row)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsEditModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setEmployees(employees.filter((employee) => employee.id !== id))
  }

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees([...employees, { ...newEmployee, id: Date.now().toString() }])
    setIsAddModalOpen(false)
  }

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Employees</h2>
        <Button
          type="primary"
          icon={<Plus />}
          className="flex items-center "
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Employee
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <Input
          className="pl-10 border border-gray-300 rounded-md"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredEmployees}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        className="border border-gray-200 rounded-lg"
      />

      {/* Edit Employee Modal */}
      <Modal
        title="Edit Employee"
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={() => setIsEditModalOpen(false)}
      >
        {editingEmployee && (
          <Form
            layout="vertical"
            initialValues={editingEmployee}
            onFinish={(values) =>
              setEmployees((prev) =>
                prev.map((emp) =>
                  emp.id === editingEmployee.id ? { ...emp, ...values } : emp
                )
              )
            }
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter the email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="role" label="Role">
              <Input />
            </Form.Item>
            <Form.Item name="department" label="Department">
              <Input />
            </Form.Item>
            <Form.Item name="joinDate" label="Join Date">
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Add Employee Modal */}
      <Modal
        title="Add Employee"
        visible={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={(values) =>
            handleAddEmployee({ ...values, id: Date.now().toString() })
          }
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Input />
          </Form.Item>
          <Form.Item name="department" label="Department">
            <Input />
          </Form.Item>
          <Form.Item name="joinDate" label="Join Date">
            <Input />
          </Form.Item>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default EmployeeList
