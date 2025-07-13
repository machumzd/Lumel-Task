import React from "react";
import { calculateDifference } from "../utils/commonMethods";

const TableItem = ({ item, original, handleUpdate, level = 0 }) => {
  const variance = calculateDifference(original, item);
  const indentPx = Math.min(level * 16, 48);

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors border-b text-sm text-gray-800">
        <td className="py-3 px-6">
          <div style={{ paddingLeft: `${indentPx}px` }} className="font-medium">
            {item.label}
          </div>
        </td>

        <td className="py-3 px-6">{item.value ?? 0}</td>

        <td className="py-3 px-6">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Enter"
              className="border border-gray-300 px-3 py-1 rounded w-24 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => (item.temp = parseFloat(e.target.value))}
            />
            <button
              onClick={() => handleUpdate(item.id, item.temp, "percentage")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
            >
              Allocation %
            </button>
            <button
              onClick={() => handleUpdate(item.id, item.temp, "value")}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
            >
              Allocation Val
            </button>
          </div>
        </td>

        <td className="py-3 px-6 text-gray-600">{variance}</td>
      </tr>

      {item.children?.map((child) => (
        <TableItem
          key={child.id}
          item={child}
          original={original?.children?.find((c) => c.id === child.id)}
          handleUpdate={handleUpdate}
          level={level + 1}
        />
      ))}
    </>
  );
};

export default TableItem;
