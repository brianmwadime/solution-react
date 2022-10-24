import React from "react";

import { useNavigate } from "react-router-dom";
import { Column, Row, SearchBar, Text, Input, Button, Radio, List, SideBar } from "Components";
import { CloseSVG } from "../../assets/images/index.js";

const WithdrawPage = () => {
  const [activeAccount, setActiveAccount] = React.useState();

  const [inputvalue, setInputvalue] = React.useState("");

  return (
    <>
      <div className="bg-white_A700 font-poppins min-h-screen">
        <Row className="flex-grow flex-row min-h-[50vh]">
          <SideBar />
          <div className="w-full max-w-screen px-12 md:px-12 my-6">
            <header className="w-[100%]">
              <SearchBar pageTitle="Earnings" />
            </header>
            <main id="main" className="flex flex-col space-y-3 items-start flex-grow">
              <Column className="bg-gray_50 justify-center mt-[20px] p-[20px] rounded-radius12 w-[100%]">
                <Text className="font-bold text-[25px] text-black_900 w-[auto]">
                  Withdraw Money
                </Text>
                <Row className="font-satoshivariable items-start mt-[25px] mb-[25px] w-full">
                  <List
                    className="lg:gap-[20px] grid grid-cols-3 min-h-[auto] w-[auto]"
                    orientation="horizontal">
                    <div className="flex flex-col items-start justify-end px-[8px] w-[74px]">
                      <Text className="font-medium leading-[16px]text-[18px] text-black_900_90">
                        Own
                        <br />
                        Mobile
                      </Text>
                      <Radio
                        value={true}
                        className="mb-[8px]"
                        inputClassName="h-[14.05px] mr-[5px] w-[14.05px]"
                        checked={false}
                        name="own"
                        label=""
                        variant="FillGray902"
                      ></Radio>
                    </div>
                    <div className="border border-bluegray_400_40 border-solid flex flex-col items-start px-[8px] justify-end w-[74px] rounded-radius8">
                      <Text className="font-medium font-satoshivariable lg:leading-[14px] xl:leading-[16px] 2xl:leading-[18px] 3xl:leading-[21px] lg:mt-[50px] xl:mt-[57px] 2xl:mt-[65px] 3xl:mt-[78px] lg:text-[11px] xl:text-[13px] 2xl:text-[15px] 3xl:text-[18px] text-bluegray_400_71 w-[45%]">
                        Jua
                        <br />
                        Cali
                      </Text>
                      <Text className="font-normal font-poppins mt-[4px] not-italic lg:text-[5px] xl:text-[6px] 2xl:text-[7px] 3xl:text-[8px] text-bluegray_400_71 w-[auto]">
                        0700 000 000
                      </Text>
                      <Radio
                        value="undefined"
                        className="mb-[8px]"
                        inputClassName="h-[14.05px] mr-[5px] w-[14.05px]"
                        checked={false}
                        name="radio"
                        label=""
                        variant="FillBluegray40067"
                      ></Radio>
                    </div>
                    <div className="border border-solid border-teal_A400 flex flex-col items-start justify-end px-[8px] w-[74px] rounded-radius8">
                      <Text className="font-medium font-satoshivariable leading-[16px] lg:mt-[50px] xl:mt-[57px] 2xl:mt-[65px] 3xl:mt-[78px] lg:text-[11px] xl:text-[13px] 2xl:text-[15px] 3xl:text-[18px] text-teal_A400 w-[45%]">
                        Jua
                        <br />
                        Cali
                      </Text>
                      <Text className="font-normal font-poppins mt-[4px] not-italic lg:text-[5px] xl:text-[6px] 2xl:text-[7px] 3xl:text-[8px] text-bluegray_400 w-[auto]">
                        0700 000 000
                      </Text>
                      <Radio
                        value="undefined"
                        className="mb-[8px]"
                        inputClassName="mr-[5px] w-[undefinedpx]"
                        checked={false}
                        name="radioactive"
                        label=""
                      ></Radio>
                    </div>
                  </List>
                </Row>
                <div className="font-poppins mb-[20px] rounded-radius5 md:w-[500px]">
                  <label className="font-semibold text-[16px] text-black_901 w-[auto]">
                    Mobile Number
                  </label>
                  <Input
                    className="w-[100%]"
                    name="phone"
                    placeholder="Enter Phone number"
                    variant="OutlineBluegray1001_2"
                  ></Input>
                </div>
                <div className="font-poppins mb-[20px] rounded-radius5 md:w-[500px]">
                  <label className="font-semibold text-[16px] text-black_901 w-[auto]">
                    Amount
                  </label>
                  <Input
                    className="w-[100%]"
                    name="amount"
                    placeholder="Enter Amount"
                    variant="OutlineBluegray1001_2"
                  ></Input>
                </div>
                <Button
                  className="font-semibold text-[16px] text-center md:w-[200px]"
                  shape="RoundedBorder5"
                  size="lg"
                  variant="FillTealA400">
                  Send
                </Button>
              </Column>
            </main>
          </div>
        </Row>
      </div>
    </>
  );
};

export default WithdrawPage;
