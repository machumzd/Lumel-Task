import React from "react";
import TableItem from "./CustomTableItem";

const CustomTable = ({ tableData, totalPrice, ogData, handleUpdate }) => {
  const tableHeaderClass = "px-4 py-3 text-left text-sm font-semibold text-black";

  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full divide-y divide-gray-200 p-2 rounded-3xl">
        <thead className="bg-gray-50">
          <tr>
            <th className={tableHeaderClass}>Label</th>
            <th className={tableHeaderClass}>Value</th>
            <th className={tableHeaderClass}>Input</th>
            
            <th className={tableHeaderClass}>Difference %</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {tableData.map((item) => (
            <TableItem
              key={item.id}
              item={item}
              original={ogData.find((o) => o.id === item.id)}
              handleUpdate={handleUpdate}
            />
          ))}
          <tr className="bg-gray-100 font-semibold">
            <td className="px-4 py-2">Grand Total</td>
            <td className="px-4 py-2">{totalPrice}</td>
            <td colSpan={2}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
