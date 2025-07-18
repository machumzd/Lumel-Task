"use client";
import CustomTable from "@/components/landingPage/CustomTable";
import {
  calculateTotalPrice,
  deepClone,
  findAndUpdate,
  rebalanceValues,
  updateParentValues,
} from "@/components/utils/commonMethods";
import { TableData } from "@/data/TableData";
import { useState } from "react";

export default function Home() {
  const datas = deepClone(TableData.rows).map(updateParentValues);
  const [original] = useState(datas);
  const [data, setData] = useState(datas);

  const handleUpdate = (id, input, type) => {
    let updated = deepClone(data);

    const updateFn = (item) => {
      if (type === "percentage") {
        const percentage = (input / 100) * item.value;
        item.value = item.value + percentage;
      } else if (type === "value") {
        if (item.children) {
          return rebalanceValues(item, input);
        } else {
          item.value = input;
        }
      }
      return item;
    };

    updated = findAndUpdate(updated, id, updateFn).map(updateParentValues);
    setData(updated);
  };

  const total = calculateTotalPrice(data);

  const handleReset = () => {
    setData(deepClone(original).map(updateParentValues));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-300 to-yellow-400 p-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold  text-center text-gray-800">
            Lumel Task Dashboard
          </h1>
          <button
            onClick={handleReset}
            className=" bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
          >
            Reset
          </button>
        </div>
        <CustomTable
          tableData={data}
          totalPrice={total}
          ogData={original}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}
