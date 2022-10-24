import React from "react";

function TableRow({ albumId, rowsData, categories, deleteTableRows, handleChange }) {
  const fileRefs = React.useRef([]);
  fileRefs.current = [];

  const previewRefs = React.useRef([]);
  previewRefs.current = [];

  const handleFileSelect = (index) => {

    fileRefs.current[index].click();
  };

  const handlePreviewSelect = (index) => {

    previewRefs.current[index].click();
  };

  const addTFileRefs = el => {
    if (el && !fileRefs.current.includes(el)) {
      fileRefs.current.push(el);
    }

  };

  const addToPreviewRefs = el => {
    if (el && !previewRefs.current.includes(el)) {
      previewRefs.current.push(el);
    }

  };

  const deleteRow = (index) => {
    console.group(`Delete row ${index}`)
    console.log(fileRefs.current[index]);
    console.log(previewRefs.current[index]);
    console.groupEnd();
    fileRefs.current.splice(index, 1);
    previewRefs.current.splice(index, 1);


    deleteTableRows(index);
  }


  return (
    rowsData.map((data, index) => {
      const { name, type, albumId, categoryId, tempId } = data;
      return (
        <React.Fragment key={`song-row-${tempId}`}>
          <tr className="w-full">
            <td className="py-1 px-2 w-[150px]">
              <input name="albumId" required={true} value={albumId} hidden={true} readOnly={true} autoComplete="off" />
              <input type="text" required={true} value={name} onChange={(e) => (handleChange(index, e))} autoComplete="off" name="name" className="rounded w-full py-1 px-2 text-[12px] leading-12 focus:outline-none focus:border-gray-500" />
            </td>
            <td className="py-1 px-2">
              <select value={type} required={true} onChange={(e) => (handleChange(index, e))} name="fileType" className="block appearance-none w-[100px] bg-gray-200 border border-gray-200 text-gray-700 py-1 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value={undefined}>Select</option>
                <option value={0}>Audio</option>
                <option value={1}>Video</option>
              </select>
            </td>
            <td className="py-1 px-2">
              <select value={categoryId} required={true} onChange={(e) => (handleChange(index, e))} name="categoryId" className="block appearance-none w-[100px] bg-gray-200 border border-gray-200 text-gray-700 py-1 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value={undefined}>Select</option>
                {categories.map((category, index) => {
                  return (<option key={`cat-${index}`} value={category.id}>{category.name}</option>)
                })
                }
              </select>
            </td>
            <td className="py-1 px-2">
              <button type="button" className="inline-flex flex-row items-center py-1 px-2 font-semibold border w-[auto]" onClick={() => (handleFileSelect(index))}>
                <span className="text-[12px] text-gray-500">Upload</span>
                <svg className="ml-[8px]" width="12" height="12" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" fillOpacity="0.32" fillRule="evenodd" clipRule="evenodd" d="M4.53313 0.435059C3.94227 0.435059 3.38561 0.542479 2.87867 0.754339C2.3712 0.966409 1.92375 1.26407 1.54872 1.63904C1.17375 2.01403 0.876077 2.46147 0.663997 2.96893C0.452147 3.47592 0.344727 4.03256 0.344727 4.62338C0.344727 5.20719 0.452147 5.76028 0.663997 6.26727C0.876107 6.77475 1.17375 7.22219 1.54872 7.59715C1.92398 7.97236 2.37142 8.27179 2.87867 8.48715C3.38594 8.70251 3.9426 8.8117 4.53313 8.8117C5.11671 8.8117 5.66981 8.70251 6.17708 8.48715C6.68437 8.27178 7.1318 7.97235 7.507 7.59715C7.88218 7.22199 8.18164 6.77455 8.39701 6.26727C8.61239 5.75997 8.72157 5.20688 8.72157 4.62338C8.72157 4.03287 8.61238 3.47624 8.39701 2.96893C8.18168 2.46171 7.88223 2.01427 7.507 1.63904C7.132 1.26407 6.68455 0.966419 6.17708 0.754339C5.67014 0.542479 5.11704 0.435059 4.53313 0.435059ZM2.74259 3.52901C2.6592 3.52901 2.5869 3.47855 2.52772 3.37904C2.46869 3.27912 2.43876 3.16147 2.43876 3.02932C2.43876 2.88583 2.4687 2.76514 2.52772 2.6706C2.58713 2.57667 2.66298 2.52903 2.75314 2.52903H6.3237C6.40689 2.52903 6.47903 2.57949 6.53818 2.679C6.59746 2.7787 6.62753 2.89657 6.62753 3.02934C6.62753 3.17264 6.59747 3.29312 6.53818 3.38746C6.47915 3.4814 6.40343 3.52903 6.31314 3.52903L2.74259 3.52901ZM3.31771 5.80166C3.31278 5.80166 3.30779 5.80155 3.30275 5.80137C3.21609 5.79798 3.14389 5.76805 3.08824 5.71239C3.02571 5.64987 2.99401 5.5758 2.99401 5.49226C2.99401 5.40897 3.02571 5.33503 3.08824 5.2725L4.2817 4.06851C4.33418 4.00926 4.40157 3.97923 4.48197 3.97923C4.4868 3.97923 4.49163 3.97934 4.49657 3.97954C4.58354 3.98294 4.65929 4.01287 4.72164 4.06851L5.94675 5.28305C6.00253 5.33883 6.02891 5.411 6.02515 5.49754C6.0218 5.58445 5.99187 5.65674 5.93619 5.71239C5.87369 5.77493 5.79973 5.80664 5.71644 5.80664C5.63315 5.80664 5.55919 5.77493 5.49667 5.71239L4.82643 5.05274V6.8327C4.82643 6.91591 4.7947 6.98807 4.7322 7.04718C4.66952 7.10646 4.59543 7.13652 4.51204 7.13652C4.422 7.13652 4.34626 7.10646 4.28697 7.04718C4.22794 6.98815 4.19801 6.91243 4.19801 6.82214V5.05273L3.51762 5.72295C3.46503 5.77517 3.39778 5.80166 3.31771 5.80166Z" />
                </svg>
              </button>
              <input required={true} accept=".mp3,audio/*" hidden={true} id={`song-row-file-${tempId}`} ref={addTFileRefs} type="file" autoComplete="off" tabIndex="-1" onChange={(e) => (handleChange(index, e))} name="filePath" />
            </td>
            <td className="py-1 px-2">
              <button type="button" className="font-semibold text-[10px] border-none text-gray_800 w-[auto]" onClick={() => handlePreviewSelect(index)}>
                Upload Avatar
              </button>
              <input required={true} accept="image/*" hidden={true} id={`song-row-preview-${tempId}`} ref={addToPreviewRefs} type="file" autoComplete="off" tabIndex="-1" onChange={(e) => (handleChange(index, e))} name="artwork" />
            </td>
            <td className="py-1 pl-2 text-center">
              {index != 0 && <button type="button" className="" onClick={() => (deleteRow(index))}>
                <svg className="fill-current  w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path fill="fill-current" d="M17.41,16l8.29-8.29c0.39-0.39,0.39-1.02,0-1.41s-1.02-0.39-1.41,0L16,14.59L7.71,6.29c-0.39-0.39-1.02-0.39-1.41,0s-0.39,1.02,0,1.41L14.59,16l-8.29,8.29c-0.39,0.39-0.39,1.02,0,1.41C6.49,25.9,6.74,26,7,26s0.51-0.1,0.71-0.29L16,17.41l8.29,8.29C24.49,25.9,24.74,26,25,26s0.51-0.1,0.71-0.29c0.39-0.39,0.39-1.02,0-1.41L17.41,16z"></path>
                </svg>
              </button>}
            </td>
          </tr>
        </React.Fragment>
      )
    })

  )

}
export default TableRow;