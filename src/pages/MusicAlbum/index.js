import React from "react";

import { useNavigate } from "react-router-dom";
import { fetchAlbums } from "Service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAlbumModal from "Modals/AddAlbum";
import {
  Column,
  Row,
  Img,
  Text,
  Input,
  Button,
  Stack,
  SelectBox,
  List,
  Switch,
  Line,
} from "Components";
import { CloseSVG } from "../../assets/images/index.js";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const MusicAlbumPage = () => {
  const [apiData5, setapiData5] = React.useState();
  const navigate = useNavigate();
  const [isOpenAddAlbumModal, setAddAlbumModal] = React.useState(false);
  React.useEffect(() => {
    callApi5();
  }, []);

  function callApi5() {
    const req = {};

    fetchAlbums(req)
      .then((res) => {
        setapiData5(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Try again later.");
      });
  }
  function handleNavigate3() {
    navigate("/music");
  }
  function handleNavigate5() {
    navigate("/addalbum");
  }
  function handleNavigate6() {
    navigate("/dashboard");
  }
  function handleNavigate13() {
    navigate("/earnings");
  }
  function handleNavigate14() {
    navigate("/payments");
  }
  function handleNavigate15() {
    navigate("/music");
  }
  function handleNavigate16() {
    navigate("/dashboard");
  }
  function handleOpenAddAlbumModal() {
    setAddAlbumModal(true);
  }
  function handleCloseAddAlbumModal() {
    setAddAlbumModal(false);
  }

  const [inputvalue, setInputvalue] = React.useState("");

  return (
    <>
      <Column className="bg-white_A700 font-poppins mx-[auto] w-[100%]">
        <Row className="w-[96%]">
          <aside className="w-[24%]">
            <Column className="">
              <Column className="bg-black_901 lg:p-[26px] xl:p-[30px] 2xl:p-[34px] 3xl:p-[40px] w-[82%]">
                <Img
                  src="images/img_group2_2.svg"
                  className="3xl:h-[103px] lg:h-[67px] xl:h-[76px] 2xl:h-[86px] lg:mt-[21px] xl:mt-[24px] 2xl:mt-[28px] 3xl:mt-[33px] w-[52%]"
                  alt="GroupTwo"
                />
                <Row
                  className="common-pointer lg:ml-[3px] xl:ml-[4px] 2xl:ml-[5px] 3xl:ml-[6px] 3xl:mt-[111px] lg:mt-[72px] xl:mt-[82px] 2xl:mt-[93px] pr-[3px] rounded-radius6 w-[42%]"
                  onClick={handleNavigate16}
                >
                  <Img
                    src="images/img_home.svg"
                    className="lg:h-[17px] xl:h-[19px] 2xl:h-[22px] 3xl:h-[26px] w-[25%]"
                    alt="home"
                  />
                  <Text className="font-normal xl:ml-[10px] 2xl:ml-[12px] 3xl:ml-[14px] lg:ml-[9px] mt-[3px] not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-white_A700 w-[auto]">
                    Home
                  </Text>
                </Row>
                <Row
                  className="common-pointer items-center lg:ml-[3px] xl:ml-[4px] 2xl:ml-[5px] 3xl:ml-[6px] lg:mt-[35px] xl:mt-[40px] 2xl:mt-[45px] 3xl:mt-[54px] lg:pr-[3px] xl:pr-[4px] 2xl:pr-[5px] 3xl:pr-[6px] rounded-radius6 w-[42%]"
                  onClick={handleNavigate15}
                >
                  <Img
                    src="images/img_music_1.svg"
                    className="lg:h-[16px] xl:h-[18px] 2xl:h-[21px] 3xl:h-[25px] lg:w-[15px] xl:w-[17px] 2xl:w-[20px] 3xl:w-[24px]"
                    alt="music"
                  />
                  <Text className="font-normal xl:ml-[10px] 2xl:ml-[12px] 3xl:ml-[14px] lg:ml-[9px] not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-white_A700 w-[auto]">
                    Music
                  </Text>
                </Row>
                <Row
                  className="common-pointer lg:ml-[3px] xl:ml-[4px] 2xl:ml-[5px] 3xl:ml-[6px] lg:mt-[36px] xl:mt-[41px] 2xl:mt-[47px] 3xl:mt-[56px] w-[55%]"
                  onClick={handleNavigate14}
                >
                  <Img
                    src="images/img_playlist_1.svg"
                    className="lg:h-[14px] xl:h-[17px] 2xl:h-[19px] 3xl:h-[22px] mb-[1px] lg:w-[14px] xl:w-[16px] 2xl:w-[18px] 3xl:w-[21px]"
                    alt="playlist"
                  />
                  <Text className="font-normal xl:ml-[10px] 2xl:ml-[12px] 3xl:ml-[14px] lg:ml-[9px] mt-[3px] not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-white_A700 w-[auto]">
                    Payments
                  </Text>
                </Row>
                <Row
                  className="common-pointer items-end ml-[2px] lg:mt-[34px] xl:mt-[39px] 2xl:mt-[44px] 3xl:mt-[52px] w-[53%]"
                  onClick={handleNavigate13}
                >
                  <Img
                    src="images/img_earnings_1.svg"
                    className="lg:h-[19px] xl:h-[22px] 2xl:h-[25px] 3xl:h-[29px] lg:w-[18px] xl:w-[21px] 2xl:w-[24px] 3xl:w-[28px]"
                    alt="earnings"
                  />
                  <Text className="font-normal mb-[1px] xl:ml-[10px] 2xl:ml-[12px] 3xl:ml-[14px] lg:ml-[9px] lg:mt-[3px] xl:mt-[4px] 2xl:mt-[5px] 3xl:mt-[6px] not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-white_A700 w-[auto]">
                    Earnings
                  </Text>
                </Row>
                <Row className="items-end lg:ml-[3px] xl:ml-[4px] 2xl:ml-[5px] 3xl:ml-[6px] lg:mt-[33px] xl:mt-[38px] 2xl:mt-[43px] 3xl:mt-[51px] w-[51%]">
                  <Img
                    src="images/img_settings_1.svg"
                    className="lg:h-[19px] xl:h-[22px] 2xl:h-[25px] 3xl:h-[29px] lg:w-[18px] xl:w-[21px] 2xl:w-[24px] 3xl:w-[28px]"
                    alt="settings"
                  />
                  <Text className="font-normal mb-[1px] xl:ml-[10px] 2xl:ml-[12px] 3xl:ml-[14px] lg:ml-[9px] lg:mt-[3px] xl:mt-[4px] 2xl:mt-[5px] 3xl:mt-[6px] not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-white_A700 w-[auto]">
                    Settings
                  </Text>
                </Row>
                <Row className="items-end lg:mb-[304px] xl:mb-[347px] 2xl:mb-[391px] 3xl:mb-[469px] lg:ml-[3px] xl:ml-[4px] 2xl:ml-[5px] 3xl:ml-[6px] lg:mt-[33px] xl:mt-[38px] 2xl:mt-[43px] 3xl:mt-[51px] w-[46%]">
                  <Img
                    src="images/img_refresh_1.svg"
                    className="lg:h-[19px] xl:h-[22px] 2xl:h-[25px] 3xl:h-[29px] lg:w-[18px] xl:w-[21px] 2xl:w-[24px] 3xl:w-[28px]"
                    alt="refresh"
                  />
                  <Text className="font-normal mb-[1px] xl:ml-[10px] 2xl:ml-[12px] 3xl:ml-[14px] lg:ml-[9px] lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] not-italic lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-teal_A400 w-[auto]">
                    Logout
                  </Text>
                </Row>
              </Column>
            </Column>
          </aside>
          <Column className="lg:mt-[37px] xl:mt-[42px] 2xl:mt-[48px] 3xl:mt-[57px] w-[76%]">
            <header className="w-[100%]">
              <Row className="items-center w-[100%]">
                <Text className="cursor-pointer hover:font-bold font-bold font-dmsans lg:text-[18px] xl:text-[21px] 2xl:text-[24px] 3xl:text-[28px] text-gray_900 w-[auto]">
                  Music
                </Text>
                <Input
                  value={inputvalue}
                  onChange={(e) => setInputvalue(e?.target?.value)}
                  className="font-poppins font-semibold p-[0] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] lg:text-[9px] placeholder:text-black_901 text-black_901 w-[100%]"
                  wrapClassName="2xl:ml-[316px] 3xl:ml-[379px] flex lg:ml-[245px] w-[50%] xl:ml-[281px]"
                  name="search"
                  placeholder="Search content"
                  prefix={
                    <Img
                      src="images/img_search.svg"
                      className="cursor-pointer ml-[4px] lg:w-[12px] lg:h-[13px] lg:mr-[14px] xl:w-[14px] xl:h-[15px] xl:mr-[16px] 2xl:w-[16px] 2xl:h-[17px] 2xl:mr-[19px] 3xl:w-[19px] 3xl:h-[20px] 3xl:mr-[22px] my-[auto]"
                      alt="search"
                    />
                  }
                  suffix={
                    inputvalue?.length > 0 ? (
                      <CloseSVG
                        className="cursor-pointer lg:w-[12px] lg:h-[13px] lg:ml-[7px] lg:mr-[17px] xl:w-[14px] xl:h-[15px] xl:ml-[8px] xl:mr-[19px] 2xl:w-[16px] 2xl:h-[17px] 2xl:ml-[10px] 2xl:mr-[22px] 3xl:w-[19px] 3xl:h-[20px] 3xl:ml-[12px] 3xl:mr-[26px] my-[auto]"
                        onClick={() => setInputvalue("")}
                        color="#060124"
                      />
                    ) : inputvalue?.length > 0 ? (
                      <CloseSVG
                        color="#060124"
                        className="cursor-pointer lg:w-[12px] lg:h-[13px] lg:ml-[7px] lg:mr-[17px] xl:w-[14px] xl:h-[15px] xl:ml-[8px] xl:mr-[19px] 2xl:w-[16px] 2xl:h-[17px] 2xl:ml-[10px] 2xl:mr-[22px] 3xl:w-[19px] 3xl:h-[20px] 3xl:ml-[12px] 3xl:mr-[26px] my-[auto]"
                        onClick={() => setInputvalue("")}
                      />
                    ) : (
                      ""
                    )
                  }
                  shape="srcCircleBorder29"
                  size="smSrc"
                  variant="srcOutlineGray30066"
                ></Input>
                <Button
                  className="flex lg:h-[44px] xl:h-[50px] 2xl:h-[57px] 3xl:h-[68px] items-center justify-center lg:ml-[14px] xl:ml-[16px] 2xl:ml-[18px] 3xl:ml-[21px] rounded-radius50 lg:w-[43px] xl:w-[49px] 2xl:w-[56px] 3xl:w-[67px]"
                  size="lgIcn"
                  variant="icbFillTealA400"
                >
                  <Img
                    src="images/img_clock.svg"
                    className="flex items-center justify-center"
                    alt="clock"
                  />
                </Button>
                <Button
                  className="flex lg:h-[44px] xl:h-[50px] 2xl:h-[57px] 3xl:h-[68px] items-center justify-center 2xl:ml-[10px] 3xl:ml-[12px] lg:ml-[7px] xl:ml-[8px] rounded-radius50 lg:w-[43px] xl:w-[49px] 2xl:w-[56px] 3xl:w-[67px]"
                  size="lgIcn"
                  variant="icbFillTealA400"
                >
                  <Img
                    src="images/img_user.svg"
                    className="flex items-center justify-center"
                    alt="user"
                  />
                </Button>
              </Row>
            </header>
            <Row
              className="common-pointer bg-teal_A400 items-center lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] p-[4px] rounded-radius4 w-[12%]"
              onClick={handleOpenAddAlbumModal}
            >
              <Stack className="bg-white_A700 lg:h-[17px] xl:h-[19px] 2xl:h-[22px] 3xl:h-[26px] lg:ml-[21px] xl:ml-[24px] 2xl:ml-[28px] 3xl:ml-[33px] mt-[1px] px-[4px] rounded-radius50 lg:w-[16px] xl:w-[18px] 2xl:w-[21px] 3xl:w-[25px]">
                <Img
                  src="images/img_plus_12X12.svg"
                  className="absolute bottom-[0] lg:h-[10px] xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] right-[0] xl:w-[10px] 2xl:w-[12px] 3xl:w-[14px] lg:w-[9px]"
                  alt="plus"
                />
              </Stack>
              <Text className="font-semibold xl:ml-[10px] 2xl:ml-[12px] 3xl:ml-[14px] lg:ml-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-white_A700 w-[auto]">
                Album
              </Text>
            </Row>
            <Column className="bg-gray_50 lg:mt-[11px] xl:mt-[13px] 2xl:mt-[15px] 3xl:mt-[18px] lg:p-[17px] xl:p-[19px] 2xl:p-[22px] 3xl:p-[26px] rounded-radius12 w-[100%]">
              <Tabs
                selectedTabClassName="!text-teal_A400 font-poppins font-semibold !opacity-100 !bg-teal_A400"
                selectedTabPanelClassName=" tab-panel--selected"
                className="flex flex-col w-[100%]"
              >
                <TabList className="flex flex-row mt-[4px] rounded-radius4 w-[25%]">
                  <Tab className="font-semibold lg:ml-[21px] xl:ml-[24px] 2xl:ml-[27px] 3xl:ml-[32px] lg:mr-[140px] xl:mr-[161px] 2xl:mr-[181px] 3xl:mr-[217px] mt-[1px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                    <Text className="">Songs</Text>
                  </Tab>
                  <Tab className="font-semibold xl:ml-[113px] 2xl:ml-[128px] 3xl:ml-[153px] lg:ml-[99px] lg:mr-[54px] xl:mr-[62px] 2xl:mr-[70px] 3xl:mr-[84px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                    <Text className="">Albums</Text>
                  </Tab>
                </TabList>
                <div className="lg:mb-[106px] xl:mb-[121px] 2xl:mb-[137px] 3xl:mb-[164px] ml-[1px] lg:mt-[28px] xl:mt-[32px] 2xl:mt-[36px] 3xl:mt-[43px] w-[94%]">
                  {[...Array(2)].map((_, index) => {
                    return (
                      <TabPanel
                        key={"tab-content-" + index}
                        className="w-[100%]"
                      >
                        <Column className="w-[100%]">
                          <Row className="pb-[1px] w-[55%]">
                            <SelectBox
                              className="font-normal mt-[1px] not-italic lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-gray_800 w-[29%]"
                              placeholderClassName="text-gray_800"
                              name="dropdowncount"
                              placeholder="Show 10 Entries"
                              isSearchable={false}
                              isMulti={false}
                              indicator={
                                <Img
                                  src="images/img_volume.svg"
                                  className="lg:w-[7px] lg:h-[9px] lg:mr-[8px] xl:w-[8px] xl:h-[10px] xl:mr-[9px] 2xl:w-[9px] 2xl:h-[12px] 2xl:mr-[11px] 3xl:w-[10px] 3xl:h-[14px] 3xl:mr-[13px]"
                                  alt="volume"
                                />
                              }
                              size="sm"
                            ></SelectBox>
                            <Text className="font-semibold lg:ml-[34px] xl:ml-[39px] 2xl:ml-[44px] 3xl:ml-[52px] 2xl:mt-[10px] 3xl:mt-[12px] lg:mt-[7px] xl:mt-[8px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                              Filter By:
                            </Text>
                            <SelectBox
                              className="font-semibold mb-[1px] lg:ml-[10px] xl:ml-[11px] 2xl:ml-[13px] 3xl:ml-[15px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-gray_800 w-[21%]"
                              placeholderClassName="text-gray_800"
                              name="dropdowntype"
                              placeholder="Type"
                              isSearchable={false}
                              isMulti={false}
                              indicator={
                                <Img
                                  src="images/img_arrowdown_gray_800.svg"
                                  className="lg:w-[7px] lg:h-[4px] lg:mr-[8px] xl:w-[8px] xl:h-[4px] xl:mr-[9px] 2xl:w-[9px] 2xl:h-[5px] 2xl:mr-[11px] 3xl:w-[10px] 3xl:h-[5px] 3xl:mr-[13px]"
                                  alt="arrow_down"
                                />
                              }
                              size="md"
                              variant="OutlineGray401"
                            ></SelectBox>
                            <Button
                              className="font-semibold mb-[1px] 2xl:ml-[11px] 3xl:ml-[13px] lg:ml-[8px] xl:ml-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-center w-[13%]"
                              shape="RoundedBorder8"
                              size="md"
                              variant="OutlineGray401"
                            >
                              Status
                            </Button>
                            <Button
                              className="font-semibold mb-[1px] ml-[4px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-center w-[13%]"
                              shape="RoundedBorder8"
                              size="md"
                              variant="FillGray50"
                            >
                              Reset
                            </Button>
                          </Row>
                          <Row
                            className="bg-cover bg-repeat lg:mt-[38px] xl:mt-[44px] 2xl:mt-[50px] 3xl:mt-[60px] lg:p-[3px] xl:p-[4px] 2xl:p-[5px] 3xl:p-[6px] w-[100%]"
                            style={{
                              backgroundImage:
                                "url('images/img_group7509.svg')",
                            }}
                          >
                            <Text className="font-semibold 2xl:ml-[10px] 3xl:ml-[12px] lg:ml-[7px] xl:ml-[8px] mt-[2px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                              No.
                            </Text>
                            <Text className="font-semibold lg:ml-[15px] xl:ml-[17px] 2xl:ml-[20px] 3xl:ml-[24px] mt-[4px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                              Cover Image
                            </Text>
                            <Text className="font-semibold lg:ml-[14px] xl:ml-[16px] 2xl:ml-[19px] 3xl:ml-[22px] mt-[2px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                              Album Title
                            </Text>
                            <Text className="font-semibold lg:ml-[26px] xl:ml-[30px] 2xl:ml-[34px] 3xl:ml-[40px] mt-[3px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                              No of Songs
                            </Text>
                            <Text className="font-semibold lg:ml-[13px] xl:ml-[15px] 2xl:ml-[17px] 3xl:ml-[20px] mt-[2px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                              No of Views
                            </Text>
                            <Text className="font-semibold lg:ml-[23px] xl:ml-[26px] 2xl:ml-[30px] 3xl:ml-[36px] mt-[2px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                              No of Purchases
                            </Text>
                            <Text className="font-semibold lg:ml-[37px] xl:ml-[42px] 2xl:ml-[48px] 3xl:ml-[57px] mt-[3px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                              Earnings
                            </Text>
                            <Text className="font-semibold lg:ml-[23px] xl:ml-[26px] 2xl:ml-[30px] 3xl:ml-[36px] mt-[2px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                              Active
                            </Text>
                            <Text className="font-semibold lg:ml-[26px] xl:ml-[30px] 2xl:ml-[34px] 3xl:ml-[40px] mt-[2px] lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                              Action
                            </Text>
                          </Row>
                          <List
                            className="gap-[0] min-h-[auto] lg:py-[155px] xl:py-[177px] 2xl:py-[200px] 3xl:py-[240px] w-[100%]"
                            orientation="vertical"
                          >
                            {apiData5?.data?.data?.map(
                              (apiData5DataEle, index) => {
                                return (
                                  <React.Fragment
                                    key={`apiData5DataEle${index}`}
                                  >
                                    <Row
                                      className="bg-cover bg-repeat my-[0] lg:p-[3px] xl:p-[4px] 2xl:p-[5px] 3xl:p-[6px] w-[100%]"
                                      style={{
                                        backgroundImage:
                                          "url('images/img_group7481.svg')",
                                      }}
                                    >
                                      <Text className="font-normal 2xl:ml-[10px] 3xl:ml-[12px] lg:ml-[7px] xl:ml-[8px] lg:mt-[6px] xl:mt-[7px] 2xl:mt-[8px] 3xl:mt-[9px] not-italic lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                                        1
                                      </Text>
                                      <Img
                                        src="images/img_avatar.png"
                                        className="lg:h-[19px] xl:h-[22px] 2xl:h-[25px] 3xl:h-[29px] lg:ml-[28px] xl:ml-[32px] 2xl:ml-[36px] 3xl:ml-[43px] mt-[2px] w-[3%]"
                                        alt="albumart"
                                      />
                                      <Text className="font-normal lg:ml-[56px] xl:ml-[64px] 2xl:ml-[73px] 3xl:ml-[87px] 2xl:mt-[10px] 3xl:mt-[12px] lg:mt-[7px] xl:mt-[8px] not-italic lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                                        Midnight Train
                                      </Text>
                                      <Text className="font-normal lg:ml-[42px] xl:ml-[48px] 2xl:ml-[54px] 3xl:ml-[64px] lg:mt-[6px] xl:mt-[7px] 2xl:mt-[8px] 3xl:mt-[9px] not-italic lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                                        7
                                      </Text>
                                      <Text className="font-normal lg:ml-[36px] xl:ml-[41px] 2xl:ml-[47px] 3xl:ml-[56px] 3xl:mt-[10px] lg:mt-[7px] xl:mt-[8px] 2xl:mt-[9px] not-italic lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                                        2,010,000
                                      </Text>
                                      <Text className="font-normal lg:ml-[37px] xl:ml-[42px] 2xl:ml-[48px] 3xl:ml-[57px] 3xl:mt-[10px] lg:mt-[7px] xl:mt-[8px] 2xl:mt-[9px] not-italic lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                                        2,000,000
                                      </Text>
                                      <Text className="font-normal lg:ml-[56px] xl:ml-[64px] 2xl:ml-[73px] 3xl:ml-[87px] 3xl:mt-[10px] lg:mt-[7px] xl:mt-[8px] 2xl:mt-[9px] not-italic lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-bluegray_900 w-[auto]">
                                        200,000 KES
                                      </Text>
                                      <Switch
                                        onColor=""
                                        offColor=""
                                        onHandleColor=""
                                        offHandleColor=""
                                        value={true}
                                        className="lg:ml-[23px] xl:ml-[26px] 2xl:ml-[30px] 3xl:ml-[36px] lg:mt-[3px] xl:mt-[4px] 2xl:mt-[5px] 3xl:mt-[6px] w-[4%]"
                                      />
                                      <Button
                                        className="font-semibold lg:ml-[23px] xl:ml-[26px] 2xl:ml-[30px] 3xl:ml-[36px] mt-[3px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[8px] text-center w-[7%]"
                                        shape="RoundedBorder5"
                                        variant="OutlineTealA400"
                                      >
                                        View{" "}
                                      </Button>
                                      <Button
                                        className="flex lg:h-[13px] xl:h-[15px] 2xl:h-[17px] 3xl:h-[20px] items-center justify-center lg:ml-[13px] xl:ml-[15px] 2xl:ml-[17px] 3xl:ml-[20px] lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] rounded-radius50 lg:w-[12px] xl:w-[14px] 2xl:w-[16px] 3xl:w-[19px]"
                                        size="smIcn"
                                      >
                                        <Img
                                          src="images/img_edit.svg"
                                          className="flex items-center justify-center lg:h-[5px] xl:h-[6px] 2xl:h-[7px] 3xl:h-[8px]"
                                          alt="edit"
                                        />
                                      </Button>
                                      <Button
                                        className="flex lg:h-[13px] xl:h-[15px] 2xl:h-[17px] 3xl:h-[20px] items-center justify-center 2xl:ml-[10px] 3xl:ml-[12px] lg:ml-[7px] xl:ml-[8px] lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] rounded-radius50 lg:w-[12px] xl:w-[14px] 2xl:w-[16px] 3xl:w-[19px]"
                                        size="smIcn"
                                      >
                                        <Img
                                          src="images/img_trash.svg"
                                          className="flex items-center justify-center"
                                          alt="trash"
                                        />
                                      </Button>
                                    </Row>
                                  </React.Fragment>
                                );
                              }
                            )}
                          </List>
                          <Line className="bg-gray_400_87 h-[1px] w-[100%]" />
                          <Text className="font-normal lg:mt-[196px] xl:mt-[224px] 2xl:mt-[252px] 3xl:mt-[302px] not-italic lg:text-[10px] xl:text-[11px] 2xl:text-[13px] 3xl:text-[15px] text-gray_800 w-[auto]">
                            Showing 1-5 of 100 entries
                          </Text>
                        </Column>
                      </TabPanel>
                    );
                  })}
                </div>
              </Tabs>
            </Column>
          </Column>
        </Row>
      </Column>

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

export default MusicAlbumPage;
