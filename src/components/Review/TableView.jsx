import React from 'react';
import { Space, Table, Tag } from 'antd';
import { DeleteOutlined, FileSyncOutlined } from '@ant-design/icons';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        className: 'review-column',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        className: 'review-column',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        className: 'review-column',
    },
    {
        title: 'Sex',
        key: 'sex',
        dataIndex: 'sex',
        className: 'review-column',
    },
    {
        title: 'Address',
        key: 'action',
        className: 'review-column',

        render: (_, record) => (
            <Space size="middle">
                <a>New York No. 1 Lake Park</a>
            </Space>
        ),
    },
    {
        title: 'Address',
        key: 'action',
        className: 'review-column',

        render: (_, record) => (
            <Space size="middle">
                <a>New York No. 1 Lake Park New York No. 1 Lake Park</a>
            </Space>
        ),
    },
    {
        title: 'Address',
        key: 'action',
        className: 'review-column',

        render: (_, record) => (
            <Space size="middle">
                <a>New York No. 1 Lake Park</a>
            </Space>
        ),
    },
    {
        title: 'Address',
        key: 'action',
        className: 'review-column',

        render: () => <a>New York No. 1 Lake Park</a>,
    },
    {
        title: 'Actions',
        key: 'action',
        className: 'review-column',

        render: () => (
            <div className="flex gap-4">
                <button>
                    <DeleteOutlined className="text-red-400" />
                </button>
                <button>
                    <FileSyncOutlined className="text-blue-400" />
                </button>
            </div>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        sex: 'Male',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        sex: 'Male',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        sex: 'Male',
    },
    {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        sex: 'Male',
    },
    {
        key: '5',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        sex: 'Male',
    },
    {
        key: '6',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        sex: 'Male',
    },
    {
        key: '7',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        sex: 'Male',
    },
    {
        key: '8',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        sex: 'Male',
    },
    {
        key: '9',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        sex: 'Male',
    },
    {
        key: '10',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        sex: 'Male',
    },
];

const TableView = () => {
    return (
        <>
            <p className="text-end font-bold">FileName.pdf</p>
            <p className="font-bold">Review (update as necessary)</p>
            <div className="w-full overflow-x-auto">
                <Table columns={columns} dataSource={data} />
            </div>
        </>
    );
};

export default TableView;
