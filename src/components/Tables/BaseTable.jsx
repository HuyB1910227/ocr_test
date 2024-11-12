import { CaretDownOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const BaseTable = ({
  children,
  rowsSelected,
  itemsPerPage,
  totalItems,
  page,
}) => {
  const [selectedOption, setSelectedOption] = useState(10);
  const options = [10, 20, 30, 40, 50];
  const handleMenuClick = (e) => {
    setSelectedOption(parseInt(e.key, 10));
  };

  const menuItems = options.map((option) => ({
    key: option.toString(),
    label: (
      <span>
        {option} {selectedOption === option && <CheckOutlined />}
      </span>
    ),
  }));

  const handlePageClick = (event) => {
    console.log(`User selected page number ${event.selected}`);
  };

  return (
    <div className="base-table">
      <div className="table-content">
        {/* {typeof children === "function" ? children(data) : children} */}
        {children}
      </div>

      <div className="table-footer py-2 flex justify-between items-center border-gray-300">
        <span className="text-gray-700">Rows selected: {rowsSelected}</span>
        <div className="flex items-center gap-14">
          <span className="text-gray-700">
            Rows per page:{" "}
            <Dropdown
              menu={{
                items: menuItems,
                onClick: handleMenuClick,
              }}
              trigger={["click"]}
            >
              <Button>
                {selectedOption} <CaretDownOutlined />
              </Button>
            </Dropdown>
          </span>
          <div className="paginate relative top-2">
            <ReactPaginate
              pageCount={Math.ceil(totalItems / itemsPerPage)}
              onPageChange={handlePageClick}
              containerClassName="flex items-center space-x-2"
              pageClassName="border border-gray-300 rounded hover:bg-gray-100"
              pageLinkClassName="py-1 px-3 block w-full h-full text-gray-700 "
              activeClassName="bg-orange-400 hover:bg-orange-500 text-white"
              previousClassName="border border-gray-300 rounded hover:bg-gray-100"
              nextClassName="border border-gray-300 rounded hover:bg-gray-100"
              previousLinkClassName="py-1 px-3 block w-full h-full "
              nextLinkClassName="py-1 px-3 block w-full h-full "
              disabledClassName="text-gray-400 cursor-not-allowed"
              breakClassName="border border-gray-300 rounded cursor-pointer"
              previousLabel="&lt;&lt;"
              nextLabel="&gt;&gt;"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseTable;
