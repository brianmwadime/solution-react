import React from "react";

import { useNavigate } from "react-router-dom";
import {
  Column,
  Row,

  Text,

  Button,
  SearchBar,
  FilterBar,
  SideBar,

} from "Components";

const PaymentsPage = () => {
  const navigate = useNavigate();
  const [paymentsData, setPaymentsData] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <>
      <main className="bg-white_A700 font-poppins min-h-screen">
        <Row className="flex-grow flex-row min-h-[50vh]">
          <SideBar />
          <div className="w-full max-w-screen px-12 md:px-12 my-6">
            <header className="w-full">
              <SearchBar pageTitle="Payments" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>
            <main id="main" className="flex flex-col space-y-3 items-start flex-grow">
              <Column className="bg-gray_50 justify-center mt-[14px] p-[26px] rounded-radius12 w-[100%]">
                <Text className="font-bold 3xl:mt-[10px] lg:mt-[7px] xl:mt-[8px] 2xl:mt-[9px] lg:text-[19px] xl:text-[22px] 2xl:text-[25px] 3xl:text-[30px] text-black_900 w-[auto]">
                  Payments
                </Text>
                <FilterBar />
                <div className="overflow-x-auto relative">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                    <thead className="text-xs text-gray-700 bg-[#DAF5F1]">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          No
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Date
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Channel
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Ref
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Destination
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    {paymentsData?.map(
                      (payment, index) => {
                        return (
                          <React.Fragment
                            key={`song${index}`}>
                            {<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index}
                              </th>
                              <td className="py-4 px-6">
                                {payment['createdAt']}
                              </td>
                              <td className="py-4 px-6">
                                {payment["amount"]}
                              </td>
                              <td className="py-4 px-6">
                                {payment["channel"]}
                              </td>
                              <td className="py-4 px-6">
                                {payment["destination"]}
                              </td>
                              <td className="py-4 px-6 w-[150]">
                                <Row>
                                  <Button
                                    className="font-semibold  text-center mr-[10px]"
                                    shape="RoundedBorder5"
                                    variant="OutlineTealA400">
                                    View{" "}
                                  </Button>

                                  <Button
                                    className="inline-block rounded-[50%] items-center justify-center mr-[10px]" size="mdIcn">
                                    <svg aria-hidden="true" width="12" height="12" focusable="false" viewBox="0 0 8 9" xmlns="http://www.w3.org/2000/svg">
                                      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7.4455 1.3091H5.72731V0.900006C5.72731 0.402947 5.32436 0 4.8273 0H2.86366C2.3666 0 1.96365 0.402947 1.96365 0.900006V1.3091H0.24546C0.109895 1.3091 0 1.419 0 1.55456C0 1.69013 0.109895 1.80002 0.24546 1.80002H0.41892L0.932736 8.17207C0.973256 8.63809 1.3617 8.99677 1.82947 9.00007H5.8615C6.32927 8.99677 6.71771 8.63809 6.75823 8.17207L7.27206 1.80002H7.44552C7.58108 1.80002 7.69098 1.69013 7.69098 1.55456C7.69098 1.419 7.58108 1.3091 7.44552 1.3091H7.4455ZM2.45456 1.02017C2.45456 0.727863 2.63771 0.49091 2.86366 0.49091H4.8273C5.05325 0.49091 5.2364 0.727863 5.2364 1.02017V1.54943H2.45457L2.45456 1.02017ZM6.26731 8.13277C6.24871 8.3451 6.07136 8.50826 5.85822 8.50914H1.82946C1.61758 8.50659 1.44213 8.34386 1.42363 8.13277L0.899996 1.80001H6.79094L6.26731 8.13277ZM5.96764 3.5182V6.79095C5.96764 6.92652 5.73068 7.03641 5.43838 7.03641C5.14607 7.03641 4.90912 6.92652 4.90912 6.79095V3.5182C4.90912 3.38264 5.14607 3.27274 5.43838 3.27274C5.73068 3.27274 5.96764 3.38264 5.96764 3.5182ZM4.65853 3.5182V6.79095C4.65853 6.92652 4.42158 7.03641 4.12927 7.03641C3.83697 7.03641 3.60001 6.92652 3.60001 6.79095V3.5182C3.60001 3.38264 3.83697 3.27274 4.12927 3.27274C4.42158 3.27274 4.65853 3.38264 4.65853 3.5182ZM3.34943 3.5182V6.79095C3.34943 6.92652 3.11247 7.03641 2.82017 7.03641C2.52787 7.03641 2.29091 6.92652 2.29091 6.79095V3.5182C2.29091 3.38264 2.52787 3.27274 2.82017 3.27274C3.11247 3.27274 3.34943 3.38264 3.34943 3.5182Z" />
                                    </svg>

                                  </Button>
                                </Row>
                              </td>

                            </tr>}
                          </React.Fragment>
                        );
                      }
                    )}

                  </table>
                  <Text className="font-normal mt-[20px] not-italic text-[13px] text-gray_800 w-[auto]">
                    Showing 1-5 of 100 entries
                  </Text>
                </div>
              </Column>
            </main>
          </div>
        </Row>
      </main>
    </>
  );
};

export default PaymentsPage;
