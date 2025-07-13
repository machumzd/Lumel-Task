import React from "react";
import { calculateDifference } from "../utils/commonMethods";

const TableItem = ({ item, original, handleUpdate, level = 0 }) => {
  const variance = calculateDifference(original, item);
  const indent = Math.min(level * 4, 12);

  return (
    <>
      <tr className="border-b">
        <td className={`pl-${indent} py-3`}>{item.label}</td>
        <td>{item.value}</td>
        <td>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="border px-2 py-1 w-20 text-sm rounded"
              onChange={(e) => (item.temp = parseFloat(e.target.value))}
            />
            <button
              onClick={() => handleUpdate(item.id, item.temp, "percentage")}
              className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
            >
              Allocation %
            </button>
            <button
              onClick={() => handleUpdate(item.id, item.temp, "value")}
              className="bg-green-500 text-white px-2 py-1 rounded text-xs"
            >
              Allocation Val
            </button>
          </div>
        </td>
        <td className="text-sm text-gray-600">{variance}</td>
      </tr>

      {/* Render children if present */}
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
