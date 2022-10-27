import React from "react";

import { useNavigate } from "react-router-dom";
import { postLogin } from "Service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withRouter from "HOCs/withRouter";
import useForm from "Hooks/useForm";
import {
  Img,
  Text,
  Line,
  PagerIndicator,
  Input,
  CheckBox,
  Button,
} from "Components";
import usePageTitle from "Hooks/usePageTitle";

const LoginPage = (props) => {
  usePageTitle('Solution - Login');
  const form = useForm({ username: "", password: "" });
  const navigate = useNavigate();

  function callLoginApi(data) {
    const req = { data: { ...data } };

    postLogin(req)
      .then((res) => {
        localStorage.setItem("userId", JSON.stringify(res?.data?.id));

        localStorage.setItem("token", JSON.stringify(res?.data?.token));

        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Try again later");
      });
  }
  function navigateToRegister() {
    navigate("/register", { replace: true });
  }

  return (
    <>
      <div className="flex flex-col md:flex-row" style={{ 'minHeight': '100vh' }}>
        <div
          className=" md:w-6/12 bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('images/img_group7454.png')" }}>
          <div className="flex flex-col bg-black_900_b1 bg-top bg-contain bg-no-repeat  justify-end items-center mb-[60px] h-full w-full"
            style={{ backgroundImage: "url('images/flare@3x.png')" }}>

            <div className="flex flex-col items-center">
              <Text className="font-semibold  text-[57px] text-center text-white_A700 w-full">
                Your Content
                <br />
                Market Place
              </Text>
              <Line className="bg-teal_A400 h-[5px] my-[30px] w-[174px]" />
              <Text className="text-center text-white_A700 font-medium w-full">
                The online platform that brings together creators <br />
                And their audience….
              </Text>

              <PagerIndicator
                className="h-[1px] lg:mt-[23px] xl:mt-[26px] 2xl:mt-[30px] 3xl:mt-[36px] w-[max-content]"
                count={2}
                activeCss="undefined"
                activeIndex={1}
                inactiveCss="undefined"
                selectedWrapperCss="inline-block"
                unselectedWrapperCss="inline-block"
              />
            </div>
          </div>

        </div>


        <div className="md:w-6/12 flex flex-col justify-center py-10">
          <Img
            src="images/img_group2.svg"
            className="h-[89px] mb-[60px]"
            alt="GroupTwo"
          />
          <Text className="font-semibold mb-[10px] text-[36px] text-center text-teal_A400 w-[auto]">
            <span className="text-black_901 font-poppins">
              Boring in the past
              <br />
              We Bring you all
            </span>
            <span className="text-black_900 font-poppins"> </span>
            <span className="text-teal_A400 font-poppins">New!</span>
          </Text>
          <div className="flex items-center justify-center flex-col pl-[60px] pr-[60px] w-full">
            <div className="mb-6 w-full">
              <label className="font-semibold text-[16px] text-black_901 w-[auto]">
                Username
              </label>
              <Input
                className="w-[100%]"
                onChange={(e) => {
                  form.handleChange("username", e.target.value);
                }}
                value={form?.values?.username}
                name="username"
                placeholder="Enter username"
                variant="OutlineBluegray100"></Input>
            </div>
            <div className="mb-6 w-full">
              <div className="flex flex-row justify-between">
                <label className="font-semibold text-[16px] text-black_901 w-[auto]">
                  Password
                </label>
                <a href="/forgotpassword" className="font-normal text-[16px] text-teal_A400 w-[auto]">
                  Forgot Password?
                </a>
              </div>
              <Input
                className="w-[100%]"
                onChange={(e) => {
                  form.handleChange("password", e.target.value);
                }}
                value={form?.values?.password}
                name="password"
                type="password"
                size="sm"
                placeholder="Enter password"
                variant="OutlineBluegray100"
              ></Input>
            </div>
          </div>
          <div className="flex flex-row justify-start px-[60px] w-full">
            <CheckBox
              className="font-normal text-[16px] justify-start text-gray_600"
              inputClassName="mr-[10px]"
              name="rememberPassword"
              label="Remember my password"
              shape="RoundedBorder5"
              size="sm" />
          </div>
          <div className="flex flex-row justify-start px-[60px] w-full">
            <Button
              className="common-pointer font-semibold mt-[40px] text-[19px] w-[200px]"
              onClick={() => {
                form.handleSubmit(callLoginApi);
              }}
              shape="RoundedBorder5"
              size="lg"
              variant="FillTealA400">
              Login
            </Button>
          </div>
          <div className="flex flex-row justify-start px-[60px] w-full">
            <Text
              className="common-pointer font-medium text-[19px] mt-[40px] text-teal_A400 w-[auto]"
              onClick={navigateToRegister}>
              <span className="text-black_900 font-poppins">
                Don’t have an account?{" "}
              </span>
              <span className="text-teal_A400 font-poppins">Sign Up</span>
            </Text>
          </div>

        </div>
      </div>

      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  );
};

export default withRouter(LoginPage);
