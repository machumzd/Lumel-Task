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
import Image from "next/image";
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-400">
      <CustomTable
        tableData={data}
        totalPrice={total}
        ogData={original}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}
