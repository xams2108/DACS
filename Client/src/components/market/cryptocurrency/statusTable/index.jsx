import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import {
  DeleteOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { useAuthProvider } from "../../../../providers/authProvider";
import { useNotification } from "../../../../providers/Notification";
import Service from "../../../../services/api/order.api";
import ModalConfrim from "../../../modal/confirm";

const statusOptions = [
  { label: "Pending", value: "Pending", icon: <ClockCircleOutlined /> },
  { label: "Success", value: "Success", icon: <CheckCircleOutlined /> },
];

function StatusTable() {
  const { user } = useAuthProvider();
  const notification = useNotification();

  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await Service.getOrder();
      setDataTable(res?.data || []);
    } catch (err) {
      console.error("Lỗi khi gọi getOrder:", err.message);
      notification.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
    return () => setDataTable([]);
  }, [user]);

  const openModal = (record) => {
    setSelectedRecord(record);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedRecord(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRecord) return;

    try {
      const res = await Service.deleteOrder(selectedRecord._id);
      setDataTable((prev) =>
        prev.filter((item) => item._id !== selectedRecord._id)
      );
      notification.success({ description: res.message });
    } catch (err) {
      console.error("Error deleting order:", err.message);
      notification.error("Delete failed.");
    } finally {
      onClose();
    }
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const label = type.toUpperCase();
        const className =
          type === "notify"
            ? "type-label type-notify"
            : "type-label type-trade";
        return <span className={className}>{label}</span>;
      },
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
      render: (price) =>
        typeof price === "number" ? price+"$" : "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const option = statusOptions.find((opt) => opt.value === status);
        const colorClass =
          status === "success" ? "status-active" : "status-pending";
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
          onClick={() => openModal(record)}
          icon={<DeleteOutlined />}
          className="StatusTable__delete-btn"
        />
      ),
    },
  ];

  return (
    <>
      <ModalConfrim
        isOpen={isOpen}
        onClose={onClose}
        title="Confirm Delete"
        message="Do you really want to delete this order?"
        onConfirm={handleConfirmDelete}
      />
      <div className="StatusTable">
        <div className="StatusTable__header">
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchData}
            loading={loading}
            className="StatusTable__refresh-btn"
          >
            Refresh
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={dataTable}
          rowKey="_id"
          pagination={false}
          loading={loading}
        />
      </div>
    </>
  );
}

export default StatusTable;
