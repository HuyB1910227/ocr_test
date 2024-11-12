import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import BaseTable from '../../components/Tables/BaseTable';
import ModalUpload from '../../components/Dashboard/UploadFile/PopUpUploadFile/ModalUpload';
import {
    CaretDownOutlined,
    SearchOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import ActionDropdown from '../../components/Dashboard/ActionDropdown/ActionDropdown';
import UploadStatus from '../../components/Statuses/UploadStatus/UploadStatus';
import dataTableDashBoard from '../../../database/dashboard/dataTableDashboard.json';
import FilterBar from '../../components/Dashboard/Filter/FilterBar';
import ViewDropdown from '../../components/Dashboard/ViewDropdown/ViewDropdown';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
    //test
    const [items, setItems] = useState(dataTableDashBoard);
    console.log(items);
    //test
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState({
        Name: true,
        Status: true,
        'Date Upload': true,
        Actions: true,
    });
    const itemsPerPage = 5;
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    //handle check box (select files)
    const handleCheckAll = (e) => {
        if (e.target.checked) {
            // Select all items
            const allIds = items.slice(0, itemsPerPage).map((item) => item.id);
            setSelectedItems(allIds);
        } else {
            // Unselect all items
            setSelectedItems([]);
        }
    };

    const handleCheckItem = (id) => {
        setSelectedItems(
            (prevSelected) =>
                prevSelected.includes(id)
                    ? prevSelected.filter((itemId) => itemId !== id) // Uncheck item
                    : [...prevSelected, id] // Check item
        );
    };

    return (
        <div className="dashboard_page px-8 flex">
            <Sidebar />
            <div className="dashboard-right-side h-[93vh] flex-1 py-8 pl-12 pr-8">
                <h1 className="text-3xl font-bold mb-2 mt-2">
                    Bank statement converter
                </h1>
                <h2 className="text-lg text-gray-600">
                    Manage and view your documents
                </h2>
                <BaseTable
                    totalItems={items.length}
                    itemsPerPage={itemsPerPage}
                    rowsSelected={0}
                >
                    <div className="flex justify-between items-center py-2 border-gray-300">
                        {/* Filter component (Search, Status Button & Date Upload Button) */}
                        <FilterBar />

                        {/* Upload File & Views Button component */}
                        <div className="flex items-center space-x-2">
                            {selectedItems.length > 0 && (
                                <>
                                    {/*Button Delete*/}
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                                        onClick={() => {
                                            // Logic xử lý xóa các mục đã chọn
                                            const newItems = items.filter(
                                                (item) =>
                                                    !selectedItems.includes(
                                                        item.id
                                                    )
                                            );
                                            setItems(newItems);
                                            setSelectedItems([]); // Deselect all items
                                        }}
                                    >
                                        <span>Delete</span>
                                    </button>

                                    {/*Button Download or combine*/}
                                    <button
                                        className="px-4 py-2 bg-blue-400 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                        onClick={() => {
                                            // Logic xử lý download hoặc combine các mục đã chọn
                                            console.log(
                                                'Download or combine items:',
                                                selectedItems
                                            );
                                        }}
                                    >
                                        <span>Download</span>
                                    </button>

                                    {/*Button Download or combine*/}
                                    <button
                                        className="px-4 py-2 bg-orange-400 text-white rounded-lg flex items-center space-x-2 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                        onClick={() => {
                                            // Logic xử lý download hoặc combine các mục đã chọn
                                            console.log(
                                                'Convert items:',
                                                selectedItems
                                            );
                                        }}
                                    >
                                        <span>Convert</span>
                                    </button>
                                </>
                            )}

                            {/*Button Upload */}
                            {selectedItems.length == 0 && (
                                <button
                                    className="px-4 py-2 bg-orange-400 text-white rounded-lg flex items-center space-x-2 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                                    onClick={() => showModal()}
                                >
                                    <span className="text-black">
                                        Upload files
                                    </span>
                                    <UploadOutlined className="text-black" />
                                </button>
                            )}

                            {/* Button View */}
                            <ViewDropdown
                                selectedColumns={selectedColumns}
                                setSelectedColumns={setSelectedColumns}
                            />
                        </div>
                    </div>

                    {/* table content */}
                    <div className="border rounded">
                        <table className="min-w-full bg-white border-collapse separate">
                            <thead className="bg-gray-100 rounded-t-lg border-b">
                                <tr>
                                    <th className="px-4 py-2 border-gray-300 text-left text-gray-700 font-medium w-1">
                                        <input
                                            type="checkbox"
                                            onChange={handleCheckAll}
                                            checked={
                                                selectedItems.length ===
                                                items.slice(0, itemsPerPage)
                                                    .length
                                            }
                                        />
                                    </th>
                                    {selectedColumns.Name && (
                                        <th className="px-4 py-2 border-gray-300 text-left text-gray-700 font-medium w-1/2">
                                            Name <CaretDownOutlined />
                                        </th>
                                    )}
                                    {selectedColumns.Status && (
                                        <th className="px-4 py-2 border-gray-300 text-left text-gray-700 font-medium">
                                            Status <CaretDownOutlined />
                                        </th>
                                    )}
                                    {selectedColumns['Date Upload'] && (
                                        <th className="px-4 py-2 border-gray-300 text-left text-gray-700 font-medium">
                                            Date Uploads <CaretDownOutlined />
                                        </th>
                                    )}
                                    {selectedColumns.Actions && (
                                        <th className="px-4 py-2 border-gray-300 text-left text-gray-700 font-medium">
                                            Actions
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {items.slice(0, itemsPerPage).map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2">
                                            <input
                                                type="checkbox"
                                                value={item.id}
                                                checked={selectedItems.includes(
                                                    item.id
                                                )}
                                                onChange={() =>
                                                    handleCheckItem(item.id)
                                                }
                                            />
                                        </td>
                                        {selectedColumns.Name && (
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => {
                                                        navigate(
                                                            '/review-page'
                                                        );
                                                    }}
                                                    className="hover:underline text-[15px]"
                                                >
                                                    {item.name}{' '}
                                                    <SearchOutlined className="text-sm text-gray-400" />
                                                </button>
                                            </td>
                                        )}
                                        {selectedColumns.Status && (
                                            <td className="px-4 py-2">
                                                <UploadStatus
                                                    status={item.status}
                                                />
                                            </td>
                                        )}
                                        {selectedColumns['Date Upload'] && (
                                            <td className="px-4 py-2 text-[15px]">
                                                {item.dateUploaded}
                                            </td>
                                        )}
                                        {selectedColumns.Actions && (
                                            <td className="px-6 py-2">
                                                {' '}
                                                <ActionDropdown
                                                    status={item.status}
                                                ></ActionDropdown>{' '}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </BaseTable>
            </div>

            {/* Modal Upload */}
            {isModalOpen && (
                <ModalUpload
                    isOpenModalUpload={isModalOpen}
                    onClose={handleCloseModal}
                ></ModalUpload>
            )}
        </div>
    );
};

export default DashBoard;
