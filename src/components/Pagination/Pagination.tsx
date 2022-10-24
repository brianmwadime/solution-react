//@ts-nocheck
import React from 'react';
// import { Icon, Popup } from 'UI'
import cn from 'classnames';
import { debounce } from 'Util';
import { numberWithCommas } from 'Util';
interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  limit?: number
  debounceRequest?: number
}
export default function Pagination(props: Props) {
  const { page, totalPages, onPageChange, limit = 5, debounceRequest = 0 } = props;
  const [currentPage, setCurrentPage] = React.useState(page);
  React.useMemo(
    () => setCurrentPage(page),
    [page],
  );

  const debounceChange = React.useCallback(debounce(onPageChange, debounceRequest), []);

    const changePage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
            debounceChange(page);
        }
    }
    
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    return (
        <div className="flex items-center">
            {/* <Popup
                content="Previous Page"
                // hideOnClick={true}
                animation="none"
                delay={1500}> */}
                <button
                    className={cn("py-2 px-3", { "opacity-50 cursor-default": isFirstPage })}
                    disabled={isFirstPage}
                    onClick={() => changePage(currentPage - 1)}>

                    <svg className={ cn({"fill-gray-500": isFirstPage}, {"fill-teal-900": !isFirstPage}) } viewBox="0 0 16 16" width="18px" height="18px" ><path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>
                    {/* <Icon name="chevron-left" size="18" color={isFirstPage ? 'gray-medium' : 'teal'} /> */}
                </button>
            {/* </Popup> */}
            <span className="mr-2 color-gray-medium">Page</span>
            <input
                type="number"
                className={cn("py-1 px-2 bg-white border border-gray-light rounded w-16", { "opacity-50 cursor-default": totalPages === 1 })}
                value={currentPage}
                min={1}
                max={totalPages ? totalPages : 1}
                onChange={(e) => changePage(parseInt(e.target.value))}
            />
            <span className="mx-3 color-gray-medium">of</span>
            <span >{numberWithCommas(totalPages)}</span>
            {/* <Popup
                content="Next Page"
                // hideOnClick={true}
                animation="none"
                delay={1500}> */}
                <button
                    className={cn("py-2 px-3", { "opacity-50 cursor-default": isLastPage })}
                    disabled={isLastPage}
                    onClick={() => changePage(currentPage + 1)}>
                    <svg  className={ cn({"fill-gray-500": isLastPage}, {"fill-teal-900": !isLastPage}) } viewBox="0 0 16 16" width="18px" height="18px"><path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
                    {/* <Icon name="chevron-right" size="18" color={isLastPage ? 'gray-medium' : 'teal'} /> */}
                </button>
            {/* </Popup> */}
        </div>
    )
}
