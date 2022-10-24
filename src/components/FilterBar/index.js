
import React from "react";
import PropTypes from "prop-types";
import cn from 'classnames';
import {
  Row,
  Text,
  Button,
  SelectBox,
} from "Components";


const FilterBar = ({ pageCount, onPageCountChange, filterBy, onTypeChange, onReset, onStatus }) => {

  const entryCountList = [
    { value: undefined, label: "Default" },
    { value: 10, label: "Show 10 entries" },
    { value: 20, label: "Show 20 entries" },
    { value: 30, label: "Show 30 entries" },
  ];

  const typeList = [
    { value: undefined, label: "All" },
    { value: 0, label: "Audio" },
    { value: 1, label: "Video" },
  ];

  return (
    <>
      <Row className="mb-[40px] mt-[20px] w-[auto] items-center">
        <SelectBox
          className="font-normal not-italic text-[13px] w-[200px] text-gray_800"
          placeholderClassName="text-gray_800"
          name="pageCount"
          value={entryCountList.filter((count) => count.value === pageCount)}
          options={entryCountList}
          onChange={(e) => onPageCountChange(e)}
          placeholder={`Select page count`}
          isSearchable={false}
          isMulti={false}
          indicator={
            <svg width="9" height="12" viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M4.17874 0.131253L0.132855 4.17852C-0.044285 4.3561 -0.044285 4.64385 0.132855 4.82189C0.309995 4.99947 0.597725 4.99947 0.774865 4.82189L4.49976 1.0956L8.22468 4.82143C8.40182 4.99901 8.68954 4.99901 8.86714 4.82143C9.04428 4.64385 9.04428 4.35567 8.86714 4.17806L4.82121 0.130823C4.6459 -0.0436769 4.35364 -0.0436769 4.17874 0.131253Z" />
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M0.132855 6.75304C-0.044285 6.93063 -0.044285 7.21881 0.132855 7.3964L4.17874 11.4437C4.35364 11.619 4.64586 11.619 4.82121 11.4437L8.86714 7.3964C9.04428 7.21881 9.04428 6.93108 8.86714 6.75304C8.68999 6.57545 8.40227 6.57545 8.22513 6.75304L4.49977 10.4793L0.774865 6.75349C0.597725 6.57545 0.309995 6.57545 0.132855 6.75304Z" />
            </svg>
          }
          size="sm"
        ></SelectBox>
        <Text className="font-semibold ml-[30px] text-[13px] text-bluegray_900 w-[auto]">
          Filter By:
        </Text>
        <SelectBox
          className="font-semibold ml-[20px] text-[13px] w-[100px] text-gray_800"
          placeholderClassName="text-gray_800"
          name="filterBy"
          placeholder="File Type"
          options={typeList}
          value={typeList.filter((type) => type.value === filterBy)}
          onChange={(e) => onTypeChange(e)}
          isSearchable={false}
          isMulti={false}
          indicator={
            <svg width="9" height="5" viewBox="0 0 9 5" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M0.132855 0.133414C-0.044285 0.311004 -0.044285 0.599184 0.132855 0.776774L4.17874 4.82405C4.35364 4.9994 4.64586 4.9994 4.82121 4.82405L8.86714 0.776774C9.04428 0.599184 9.04428 0.311454 8.86714 0.133414C8.68999 -0.0441761 8.40227 -0.0441761 8.22513 0.133414L4.49977 3.85966L0.774865 0.133864C0.597725 -0.0441761 0.309995 -0.0441761 0.132855 0.133414Z" />
            </svg>
          }
          size="sm" />
        {/* <Button
          className="font-semibold ml-[20px] text-[13px] text-center"
          shape="RoundedBorder8"
          size="md"
          variant="OutlineGray401">
          Status
        </Button> */}
        <Button
          className="font-semibold  ml-[20px] text-[13px] text-center"
          shape="RoundedBorder8"
          size="md"
          variant="FillGray50"
          onClick={onReset}
        >
          Reset
        </Button>
      </Row>
    </>
  );
}

FilterBar.propTypes = {
  onPageCountChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired

};

export { FilterBar };