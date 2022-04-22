import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const ColumnFilter = ({column}) => {
  const {filterValue, setFilter} = column;

  return (
    <div>
      <p>Search:</p>
      <input
        value={filterValue || ""}
        onChange={(e) => {
            setFilter(e.target.value)
        }}
        placeholder={''}
      />
    </div>
  );
}

export default ColumnFilter