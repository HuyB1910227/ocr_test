import React from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined, FileTextOutlined } from '@ant-design/icons';

const UploadTable = ({ data }) => {
    const convertFileSize = (fileSize) =>
        fileSize >= 1000000.0
            ? Number((fileSize / 1000000.0).toFixed(1)) + ' MB'
            : Number((fileSize / 1000.0).toFixed(1)) + ' KB';

    // eslint-disable-next-line react/prop-types
    data = data.map((item, index) => ({
        ...item,
        key: index,
    }));
    const columns = [
        {
            title: 'File Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <div className="flex gap-4">
                    <FileTextOutlined className="text-2xl" />
                    <div>
                        <div>{record.file.name}</div>
                        <div className="text-gray-500 text-sm">
                            {convertFileSize(record.file.size)}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        status === 'Uploading'
                            ? 'bg-gray-400 ring-gray-500/10'
                            : status === 'New'
                            ? 'bg-cyan-400 ring-cyan-500/10'
                            : 'bg-red-400 ring-red-500/10'
                    }`}
                >
                    {status}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex space-x-2">
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        type="text"
                        className=""
                    />
                </div>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
        />
    );
};

export default UploadTable;
