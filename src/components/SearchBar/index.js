import { Input, Button } from "Components";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { debounce } from 'Util';

let debounceUpdate = () => { }

const SearchBar = ({ pageTitle, searchTerm, setSearchTerm }) => {

  const [query, setQuery] = useState();

  useEffect(() => {
    debounceUpdate = debounce((value) => setSearchTerm(value), 500);
  }, [])

  // @ts-ignore
  const write = ({ target: { value } }) => {
    setQuery(value);
    debounceUpdate(value);
  }

  const reset = () => {
    setQuery(null);
    debounceUpdate(null);
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between w-[100%]">
        <h2 className="cursor-pointer hover:font-bold font-bold font-dmsans text-[24px] text-gray_900 hidden md:block w-[auto]">
          {pageTitle}
        </h2>
        <div className="flex flex-row items-center">
          <Input
            value={query}
            onChange={write}
            className="font-poppins font-semibold p-[0] text-[14px] placeholder:text-black_901 text-black_901 w-[400px]"
            wrapClassName="flex"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Filter by name"
            prefix={
              <span className="flex items-center mr-[10px] my-auto">
                <svg className="" width="16" height="17" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6 2.00126C3.79086 2.00126 2 3.79212 2 6.00126C2 8.2104 3.79086 10.0013 6 10.0013C8.20914 10.0013 10 8.2104 10 6.00126C10 3.79212 8.20914 2.00126 6 2.00126ZM1.1581e-07 6.00126C1.1581e-07 3.4086 1.66433 1.1097 4.12665 0.30045C6.58814 -0.50888 9.29187 0.35413 10.8297 2.44049C12.3676 4.52685 12.3919 7.36486 10.89 9.47726L15.707 14.2943C16.0976 14.6847 16.0976 15.3178 15.7071 15.7084C15.3166 16.0989 14.6834 16.0989 14.2929 15.7084L9.477 10.8923C7.64704 12.1935 5.24367 12.364 3.2483 11.3342C1.25293 10.3044 -0.000439884 8.24669 1.1581e-07 6.00126Z" fill="currentColor" />
                </svg>
              </span>
            }
            // suffix={
            //   searchTerm?.length > 0 ? (
            //     <svg xmlns="http://www.w3.org/2000/svg"
            //       onClick={() => reset()}
            //       fill="#060124"
            //       viewBox="0 0 24 24"
            //       width="24px"
            //       height="24px">
            //       <path fill="currentColor" d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
            //     </svg>

            //   ) : searchTerm?.length > 0 ? (
            //     <svg
            //       onClick={() => reset}
            //       fill="#060124"
            //       xmlns="http://www.w3.org/2000/svg"
            //       viewBox="0 0 30 30"
            //       width="30px"
            //       height="30px">
            //       <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
            //     </svg>
            //   ) : (
            //     ""
            //   )
            // }
            shape="srcCircleBorder29"
            size="smSrc"
            variant="srcOutlineGray30066"></Input>
          <Button
            className="flex h-[50px] w-[50px] items-center justify-center ml-[8px] rounded-radius50 "
            size="lgIcn"
            variant="icbFillTealA400">
            <span className="flex items-center justify-center">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.80297 5.27387V8.65772" stroke="#060124" strokeWidth="1.5" strokeLinecap="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M9.82369 0.762128C6.08418 0.762128 3.05599 3.79032 3.05599 7.52983V9.66379C3.05599 10.3548 2.77146 11.3913 2.4158 11.9807L1.12527 14.1349C0.332652 15.4661 0.881385 16.9497 2.34467 17.4375C7.20197 19.0532 12.4556 19.0532 17.3129 17.4375C18.6847 16.9802 19.2741 15.3747 18.5323 14.1349L17.2417 11.9807C16.8861 11.3913 16.6015 10.3446 16.6015 9.66379V7.52983C16.5914 3.81064 13.5429 0.762128 9.82369 0.762128Z" stroke="#060124" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M13.1867 17.8539C13.1867 19.7135 11.6625 21.2378 9.80289 21.2378C8.87818 21.2378 8.02459 20.8516 7.41489 20.2419C6.80519 19.6322 6.41904 18.7787 6.41904 17.8539" stroke="#060124" strokeWidth="1.5" />
              </svg>
            </span>

          </Button>
          <Button
            className="flex h-[50px] w-[50px] items-center justify-center ml-[8px] rounded-radius50 "
            size="lgIcn"
            variant="icbFillTealA400">
            <span className="flex items-center justify-center">
              <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.80959 9.93123C7.70635 9.92091 7.58247 9.92091 7.46891 9.93123C5.01191 9.84864 3.06076 7.83556 3.06076 5.35791C3.06076 2.82865 5.10482 0.774265 7.64441 0.774265C10.1737 0.774265 12.2281 2.82865 12.2281 5.35791C12.2177 7.83556 10.2666 9.84864 7.80959 9.93123Z" stroke="#060124" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd" d="M2.64798 13.7411C0.149691 15.4135 0.149691 18.1389 2.64798 19.801C5.48695 21.7006 10.1429 21.7006 12.9818 19.801C15.4801 18.1286 15.4801 15.4032 12.9818 13.7411C10.1532 11.8519 5.49728 11.8519 2.64798 13.7411Z" stroke="#060124" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}

SearchBar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func

};

export { SearchBar };