import React from "react";
import { Table, Button } from "antd";
import {DeleteOutlined,CheckCircleOutlined,ClockCircleOutlined,} from "@ant-design/icons";
import "./styles.scss";
import {useAuthProvider} from "../../../../providers/authProvider"
const statusOptions = [
  { label: "Pending", value: "Pending", icon: <ClockCircleOutlined /> },
  { label: "Success", value: "Success", icon: <CheckCircleOutlined /> },
];

function StatusTable() {
  const {user } = useAuthProvider
  const deleteRecord = () => {
    
  }
  const columns = [
    {
      title: "Tyle",
      dataIndex: "tyle",
      key: "tyle",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const option = statusOptions.find((opt) => opt.value === status);
        const colorClass =
          status === "Success"
            ? "status-active"
            :"status-pending"
        return (
          <span className={colorClass}>
            {option?.icon}
            <span className="status-text">{status}</span>
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="text"
          danger
          onClick={deleteRecord(record)}
          icon={<DeleteOutlined />}
          className="StatusTable__delete-btn"
        />
      ),
    },
  ];

  

  return (
    <div className="StatusTable">
      <Table columns={columns} dataSource={user?.data} pagination={false} />
    </div>
  );
}

export default StatusTable;
