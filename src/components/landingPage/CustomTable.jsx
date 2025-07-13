import React from "react";
import TableItem from "./CustomTableItem";

const CustomTable = ({ tableData, totalPrice, ogData, handleUpdate }) => {
  const tableHeaderClass =
    "px-6 py-4 text-left text-sm font-semibold text-gray-700 bg-gray-100";

  return (
    <div className="overflow-x-auto p-4">
      <div className="inline-block min-w-full align-middle rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className={tableHeaderClass}>Label</th>
              <th className={tableHeaderClass}>Value</th>
              <th className={tableHeaderClass}>Input</th>
              <th className={tableHeaderClass}>Variance %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tableData.map((item) => (
              <TableItem
                key={item.id}
                item={item}
                original={ogData.find((o) => o.id === item.id)}
                handleUpdate={handleUpdate}
              />
            ))}

            <tr className="bg-gray-50 font-semibold text-gray-700">
              <td className="px-6 py-3">Grand Total</td>
              <td className="px-6 py-3">{totalPrice}</td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
