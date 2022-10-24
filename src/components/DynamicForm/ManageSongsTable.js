import React, { useState } from "react";
import TableRow from "./TableRow";

function ManageSongsTable() {
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {

    const rowsInput = {
      name: '',
      type: '',
      filePath: null,
      albumId: null,
      posterUrl: null,
    }

    setRowsData([...rowsData, rowsInput])

  }
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  }

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);

  }

  return (
    <>
      <table className="border-collapse table-auto w-full text-sm text-left">
        <thead>
          <tr>
            <th scope="col" className="py-3 px-6">Name</th>
            <th scope="col" className="py-3 px-6">Type</th>
            <th scope="col" className="py-3 px-6">Upload</th>
            <th scope="col" className="py-3 px-6">Preview</th>
            <th scope="col" className="py-3 px-6">
              <button className="bg-transparent w-auto text-black_900_b1 rounded focus:outline-none py-2 px-4 border border-black_900_b1 inline-flex items-center" onClick={addTableRows}>
                <svg className="fill-current w-4 h-4 mr-2" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.5883 4.57142H7.42856V1.41171C7.42856 0.63542 6.77656 0 5.99999 0C5.22342 0 4.57142 0.63543 4.57142 1.41171V4.57142H1.41171C0.63542 4.57142 0 5.22342 0 5.99999C0 6.77656 0.63543 7.42856 1.41171 7.42856H4.57142V10.5883C4.57142 11.3646 5.22342 12 5.99999 12C6.77656 12 7.42856 11.3646 7.42856 10.5883V7.42856H10.5883C11.3646 7.42856 12 6.77656 12 5.99999C12 5.22342 11.3646 4.57142 10.5883 4.57142Z" fill="currentColor" />
                </svg>
                <span>Add</span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>

          <TableRow rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
        </tbody>
      </table>

    </>
  )
}

export default ManageSongsTable;