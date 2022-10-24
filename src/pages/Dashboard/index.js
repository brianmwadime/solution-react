import React from "react";

import { useNavigate } from "react-router-dom";
import { postList } from "Service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAlbumModal from "Modals/AddAlbum";
import { Column, Row, Img, Text, Button, List, Line, SideBar, SearchBar } from "Components";
import usePageTitle from "Hooks/usePageTitle";

const DashboardPage = () => {
  usePageTitle('Solution - Dashboard');
  const [apiData7, setapiData7] = React.useState();
  const navigate = useNavigate();
  const [isOpenAddAlbumModal, setAddAlbumModal] = React.useState(false);
  React.useEffect(() => {
    callApi7();
  }, []);

  function callApi7() {
    const req = {};

    postList(req)
      .then((res) => {
        setapiData7(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Try again later");
      });
  }

  function navigateToEarnings() {
    navigate("/earnings");
  }

  function handleOpenAddAlbumModal() {
    setAddAlbumModal(true);
  }
  function handleCloseAddAlbumModal() {
    setAddAlbumModal(false);
  }

  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <>
      <div className="bg-white_A700 font-poppins min-h-screen">
        <Row className="flex-grow flex-row min-h-[50vh]">
          <SideBar />
          <div className="w-full max-w-screen px-12 md:px-12 my-6">
            <header className="w-full">
              <SearchBar pageTitle="Dashboard" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>
            <main id="main" className="flex flex-col space-y-3 items-start flex-grow">
              <div className="flex flex-row w-full mt-[20px]">
                <div className="bg-gray_50 flex flex-row justify-between items-center p-[30px] rounded-radius12 w-full">
                  <div className="flex flex-col md:flex-row items-center w-[auto]">
                    <div className="mb-[64px] xl:mt-[10px] 2xl:mt-[12px] 3xl:mt-[14px] lg:mt-[9px] w-full">
                      <Text className="font-bold text-[25px] mb-[10px]  text-black_900 w-[auto]">
                        My Summary
                      </Text>
                      <div
                        className="bg-contain bg-[#F5562F] bg-no-repeat rounded-radius22 justify-center lg:mt-[10px] xl:mt-[11px] 2xl:mt-[13px] 3xl:mt-[15px] p-[10px] w-full"
                        style={{ backgroundImage: "url('images/img_body.svg')" }}>
                        <Row className="ml-[12px] mr-[12px] mt-[6px] w-full">
                          <div className="font-poppins mt-[12px]">
                            <Text className="font-bold lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-black_901">
                              Net Balance
                            </Text>
                            <Text className="font-semibold mt-[9px] text-[24px] text-black_901 w-[auto]">
                              KES 80,678.45
                            </Text>
                          </div>
                          <Text className="font-bold font-sfprodisplay text-[25px] text-white_A700 w-[auto]">
                            Jua Cali
                          </Text>
                        </Row>
                        <Row className="ml-[15px] mr-[auto] mt-[15px] ">
                          <div className="mt-[1px] md:w-6/12">
                            <Text className="font-normal not-italic xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[9px] text-white_A700 w-[auto]">
                              Total Earnings
                            </Text>
                            <Text className="font-normal mt-[1px] not-italic lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-white_A700 uppercase w-[auto]">
                              KES 200,000
                            </Text>
                          </div>
                          <div className="md:w-6/12">
                            <Text className="font-normal not-italic xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[9px] text-white_A700 w-[auto]">
                              Withdraw
                            </Text>
                            <Text className="font-normal lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] not-italic lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-white_A700 uppercase w-[auto]">
                              KES 120,000
                            </Text>
                          </div>
                        </Row>
                        <Row className="justify-end">
                          <Button
                            className="common-pointer font-bold mt-[19px] text-[16px] text-center py-[10px] p-[50px]"
                            onClick={navigateToEarnings}
                            shape="RoundedBorder8"
                            size="md"
                            variant="OutlineWhiteA700">
                            View More
                          </Button>
                        </Row>
                      </div>
                    </div>
                    <List
                      className="gap-[20px] ml-[20px] w-full"
                      orientation="vertical">
                      <Row className="bg-white_A700 border border-bluegray_50 border-solid items-center  p-[11px] rounded-radius15 w-[100%]">
                        <div className=" md:w-6/12">
                          <Row className="w-[100%]">
                            <Line className="bg-teal_A700 h-[16px] w-[3px]" />
                            <Text className="font-medium ml-[8px] text-[14px] text-gray_500 w-[auto]">
                              Total Uploads
                            </Text>
                            <Img
                              src="images/img_arrowup.svg"
                              className="h-[8px] ml-[8px]  mt-[1px] w-[5px]"
                              alt="arrowup"
                            />
                          </Row>
                          <Text className="font-bold ml-[11px] mt-[4px] text-[18px] text-teal_A700 w-[auto]">
                            102
                          </Text>
                        </div>
                        <Line className="bg-bluegray_50 h-[43px] my-[7px] w-[1px]" />
                        <div className="items-center ml-[15px] md:w-6/12">
                          <Row className="w-[100%]">
                            <Line className="bg-deep_orange_600 h-[16px] w-[3px]" />
                            <Text className="font-medium ml-[8px] text-[14px] text-gray_500 w-[auto]">
                              Total Likes
                            </Text>
                          </Row>
                          <Text className="font-bold mt-[6px]  text-[18px] text-deep_orange_600 w-[auto]">
                            10,400
                          </Text>
                        </div>
                      </Row>
                      <Row className="bg-white_A700 border border-bluegray_50 border-solid items-center p-[11px] rounded-radius15 w-[100%]">
                        <div className="md:w-6/12">
                          <Row className="w-[100%]">
                            <Line className="bg-red_A400 h-[16px] w-[3px]" />
                            <Text className="font-medium  ml-[8px] text-[14px] text-gray_500 w-[auto]">
                              Total Downloads
                            </Text>
                            <Img
                              src="images/img_arrowdown.svg"
                              className="lg:h-[6px] xl:h-[7px] 2xl:h-[8px] 3xl:h-[9px] w-[4%]"
                              alt="arrowdown"
                            />
                          </Row>
                          <Text className="font-bold text-[18px] text-red_A400 w-[auto]">
                            204,020
                          </Text>
                        </div>
                        <Line className="bg-bluegray_50 h-[43px] my-[7px] w-[1px]" />
                        <div className="items-center ml-[15px] md:w-6/12">
                          <Row className="w-[100%]">
                            <Line className="bg-red_A400  h-[16px] w-[3px]" />
                            <Text className="font-medium  ml-[8px] text-[14px] text-gray_500 w-[auto]">
                              Total Streams
                            </Text>
                          </Row>
                          <Text className="font-bold  text-[18px] text-deep_orange_600 w-[auto]">
                            10,400,654
                          </Text>
                        </div>
                      </Row>
                    </List>
                  </div>
                  <Button
                    variant="OutlineTealA400"
                    className="flex flex-col justify-end common-pointer border-2 font-dmsans items-center mb-[67px] p-[18px] rounded-radius12 w-[150px] h-[210px]"
                    onClick={handleOpenAddAlbumModal}>
                    <Img
                      src="images/img_plus_12X12.svg"
                      className="lg:h-[32px] xl:h-[37px] 2xl:h-[42px] 3xl:h-[50px] lg:mt-[38px] xl:mt-[44px] 2xl:mt-[50px] 3xl:mt-[60px] lg:w-[31px] xl:w-[36px] 2xl:w-[41px] 3xl:w-[49px]"
                      alt="plus"
                    />
                    <Text className="font-bold lg:leading-[19px] xl:leading-[22px] 2xl:leading-[25px] 3xl:leading-[30px] lg:mt-[41px] xl:mt-[47px] 2xl:mt-[53px] 3xl:mt-[63px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] 3xl:text-[21px] text-center text-teal_A400 w-[90%]">
                      Upload New Content
                    </Text>
                  </Button>
                </div>

              </div>
              <div className="bg-black_901 mt-[50px] rounded-radius12 w-full px-[30px]">
                <Row className="items-center mb-[40px] mt-[30px] pt-[10px] w-[100%]">
                  <div className="w-[36%]">
                    <Text className="font-bold text-[24px] text-white_A700 w-[auto]">
                      Top Genres
                    </Text>
                    <Line className="bg-gray_700 h-[1px] mt-[16px] w-full" />
                    <List
                      className="gap-2.5 min-h-[auto] mt-[18px] lg:pr-[40px]"
                      orientation="vertical" >
                      {apiData7?.data?.data?.map((category, index) => {

                        return (
                          <React.Fragment key={`apiData7DataEle${index}`}>
                            <Row className="mr-[40px] items-center my-[0] w-full">
                              <Text className="font-bold mr-[20px] text-[14px] text-white_A700 w-[auto]">
                                {category["id"]}
                              </Text>

                              <Text className="font-semibold  text-[16px] text-white_A700 w-[auto]">
                                {category["name"]}
                              </Text>
                            </Row>
                          </React.Fragment>
                        );
                      })}
                    </List>
                  </div>

                </Row>
              </div>
            </main>
          </div>
        </Row>
      </div>

      <ToastContainer hideProgressBar autoClose={3000} />
      {isOpenAddAlbumModal ? (
        <AddAlbumModal
          isOpen={isOpenAddAlbumModal}
          onRequestClose={handleCloseAddAlbumModal}
        />
      ) : null}
    </>
  );
};

export default DashboardPage;
