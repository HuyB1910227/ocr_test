import {
    DashOutlined,
    DeleteOutlined,
    DownloadOutlined,
    FileSyncOutlined,
    ReloadOutlined,
} from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';

const ActionDropdown = ({ status }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    //cancel dropdown when clicked outside
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
            >
                <DashOutlined />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-2 font-bold text-gray-700 border-b border-gray-200">
                        Document actions
                    </div>
                    <ul>
                        {status === 'new' && (
                            <li
                                className="p-2 hover:bg-gray-100 cursor-pointerflex items-center"
                                onClick={() => alert('Delete clicked')}
                            >
                                <span className="mr-2">
                                    <FileSyncOutlined />
                                </span>{' '}
                                Convert
                            </li>
                        )}
                        {status === 'failed' && (
                            <li
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={() => alert('Re-run clicked')}
                            >
                                <span className="mr-2">
                                    <ReloadOutlined />
                                </span>{' '}
                                Re-run
                            </li>
                        )}
                        {status === 'success' && (
                            <li
                                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                onClick={() => alert('Download clicked')}
                            >
                                <span className="mr-2">
                                    <DownloadOutlined />
                                </span>{' '}
                                Download
                            </li>
                        )}
                        {status !== 'processing' && (
                            <li
                                className="p-2 hover:bg-gray-100 cursor-pointer text-red-500 flex items-center"
                                onClick={() => alert('Delete clicked')}
                            >
                                <span className="mr-2">
                                    <DeleteOutlined />
                                </span>{' '}
                                Delete
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ActionDropdown;
