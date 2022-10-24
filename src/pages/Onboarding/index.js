import React from "react";

import { useNavigate } from "react-router-dom";
import {
  Row,
  Column,
  Img,
  Text,
  Line,
  PagerIndicator,
  Grid,
  Stack,
  CheckBox,
  Button,
} from "Components";

const OnboardingPage = () => {
  const navigate = useNavigate();

  function handleNavigate34() {
    navigate("/login");
  }

  return (
    <>
      <Row className="bg-white_A700 font-poppins mx-[auto] px-[4px] w-[100%]">
        <Column
          className="bg-cover bg-repeat items-center w-[55%]"
          style={{ backgroundImage: "url('images/img_leftsection.png')" }}
        >
          <Column className="bg-black_900_b1 items-center lg:pb-[53px] xl:pb-[61px] 2xl:pb-[69px] 3xl:pb-[82px] w-[100%]">
            <Img
              src="images/img_flare_490X793.svg"
              className="lg:h-[382px] xl:h-[436px] 2xl:h-[491px] 3xl:h-[589px] w-[100%]"
              alt="flare"
            />
            <Text className="font-semibold lg:leading-[42px] xl:leading-[48px] 2xl:leading-[54px] 3xl:leading-[64px] lg:mt-[171px] xl:mt-[196px] 2xl:mt-[221px] 3xl:mt-[265px] lg:text-[37px] xl:text-[42px] 2xl:text-[48px] 3xl:text-[57px] text-center text-white_A700 w-[41%]">
              Your Content
              <br />
              Market Place
            </Text>
            <Line className="bg-teal_A400 h-[5px] lg:mt-[29px] xl:mt-[33px] 2xl:mt-[38px] 3xl:mt-[45px] w-[22%]" />
            <Img
              src="images/img_theonlinecoll.svg"
              className="lg:h-[43px] xl:h-[49px] 2xl:h-[56px] 3xl:h-[67px] lg:mt-[18px] xl:mt-[21px] 2xl:mt-[24px] 3xl:mt-[28px] w-[63%]"
              alt="Theonlinecoll"
            />
            <PagerIndicator
              className="h-[1px] lg:mt-[23px] xl:mt-[26px] 2xl:mt-[30px] 3xl:mt-[36px] w-[max-content]"
              count={3}
              activeCss="undefined"
              activeIndex={1}
              inactiveCss="undefined"
              selectedWrapperCss="inline-block"
              unselectedWrapperCss="inline-block"
            />
          </Column>
        </Column>
        <Column className="lg:ml-[48px] xl:ml-[55px] 2xl:ml-[62px] 3xl:ml-[74px] lg:mt-[212px] xl:mt-[242px] 2xl:mt-[273px] 3xl:mt-[327px] w-[30%]">
          <Text className="font-semibold lg:text-[28px] xl:text-[32px] 2xl:text-[36px] 3xl:text-[43px] text-teal_A400 w-[auto]">
            <span className="text-black_901 font-poppins">Select </span>
            <span className="text-teal_A400 font-poppins">Categories </span>
          </Text>
          <Grid className="lg:gap-[26px] xl:gap-[30px] 2xl:gap-[34px] 3xl:gap-[41px] grid grid-cols-2 lg:mt-[35px] xl:mt-[40px] 2xl:mt-[45px] 3xl:mt-[54px] w-[100%]">
            <Column className="items-center w-[100%]">
              <Img
                src="images/img_image.png"
                className="xl:h-[104px] 2xl:h-[117px] 3xl:h-[140px] lg:h-[91px] w-[100%]"
                alt="image"
              />
              <Text className="font-semibold lg:mt-[10px] xl:mt-[11px] 2xl:mt-[13px] 3xl:mt-[15px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-black_901 w-[auto]">
                Art
              </Text>
            </Column>
            <Column className="items-center w-[100%]">
              <Img
                src="images/img_image.png"
                className="xl:h-[104px] 2xl:h-[117px] 3xl:h-[140px] lg:h-[91px] w-[100%]"
                alt="image One"
              />
              <Text className="font-semibold lg:mt-[10px] xl:mt-[11px] 2xl:mt-[13px] 3xl:mt-[15px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-black_901 w-[auto]">
                Art
              </Text>
            </Column>
            <Column className="items-center w-[100%]">
              <Img
                src="images/img_image.png"
                className="xl:h-[104px] 2xl:h-[117px] 3xl:h-[140px] lg:h-[91px] w-[100%]"
                alt="image Two"
              />
              <Text className="font-semibold lg:mt-[10px] xl:mt-[11px] 2xl:mt-[13px] 3xl:mt-[15px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-black_901 w-[auto]">
                Art
              </Text>
            </Column>
            <Column className="items-center w-[100%]">
              <Img
                src="images/img_image.png"
                className="xl:h-[104px] 2xl:h-[117px] 3xl:h-[140px] lg:h-[91px] w-[100%]"
                alt="image Three"
              />
              <Text className="font-semibold lg:mt-[10px] xl:mt-[11px] 2xl:mt-[13px] 3xl:mt-[15px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-black_901 w-[auto]">
                Art
              </Text>
            </Column>
            <Column className="items-center w-[100%]">
              <Img
                src="images/img_image.png"
                className="xl:h-[104px] 2xl:h-[117px] 3xl:h-[140px] lg:h-[91px] w-[100%]"
                alt="image Four"
              />
              <Text className="font-semibold lg:mt-[10px] xl:mt-[11px] 2xl:mt-[13px] 3xl:mt-[15px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-black_901 w-[auto]">
                Art
              </Text>
            </Column>
            <Column className="items-center w-[100%]">
              <Stack className="xl:h-[111px] 2xl:h-[125px] 3xl:h-[149px] lg:h-[97px] w-[100%]">
                <Img
                  src="images/img_image.png"
                  className="absolute bottom-[0] xl:h-[104px] 2xl:h-[117px] 3xl:h-[140px] lg:h-[91px] inset-x-[0] mx-[auto] w-[97%]"
                  alt="image Five"
                />
                <CheckBox
                  className="absolute lg:h-[20px] xl:h-[23px] 2xl:h-[26px] 3xl:h-[31px] right-[0] top-[0]"
                  inputClassName="h-[9.56px] mr-[5px] w-[9.56px]"
                  name="selected"
                  label=""
                  variant="FillTealA400b4"
                ></CheckBox>
              </Stack>
              <Text className="font-semibold lg:mt-[10px] xl:mt-[11px] 2xl:mt-[13px] 3xl:mt-[15px] lg:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] text-black_901 w-[auto]">
                Art
              </Text>
            </Column>
          </Grid>
          <Button
            className="common-pointer font-semibold lg:mt-[42px] xl:mt-[48px] 2xl:mt-[54px] 3xl:mt-[64px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[19px] text-center w-[46%]"
            onClick={handleNavigate34}
            shape="RoundedBorder5"
            size="lg"
            variant="FillTealA400"
          >
            Next
          </Button>
        </Column>
      </Row>
    </>
  );
};

export default OnboardingPage;
