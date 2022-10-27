import React from "react";

import { useNavigate } from "react-router-dom";
import { postRegister } from "Service/api";
import { ToastContainer, toast } from "react-toastify";
import useForm from "Hooks/useForm";
import * as yup from "yup";
import PhoneInput, {
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'react-phone-number-input';
import usePageTitle from "Hooks/usePageTitle";
import {
  Img,
  Text,
  ErrorMessage,
  Line,
  PagerIndicator,
  Input,
  CheckBox,
  Button,
} from "Components";

const RegisterationPage = () => {
  usePageTitle('Solution - Register');
  const navigate = useNavigate();

  yup.addMethod(yup.string, "validMobileNo", function (errorMessage) {
    return this.test(`valid-mobile-no`, errorMessage, function (value) {
      const { path, createError } = this;

      return (
        (value && isValidPhoneNumber(value)) ||
        createError({ path, message: errorMessage })
      );
    });
  });

  const formValidationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    userType: yup.number().required("User type is required"),
    mobileNo: yup
      .string()
      .required("Mobile no is required")
      .validMobileNo("Phone number is not valid"),
    email: yup
      .string()
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email is not in correct format"
      )
      .required("Email is required"),
    name: yup.string().required("Name is required"),
  });

  const form = useForm(
    { username: "", password: "", email: "", name: "", userType: 3 },
    {
      validate: true,
      validateSchema: formValidationSchema,
      validationOnChange: true,
    }
  );

  function loginUser(data) {
    const req = { data: { ...data } };

    postRegister(req)
      .then((res) => {

        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  }

  function goToLogin() {
    navigate("/login");
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
            src="images/img_logo.svg"
            className="h-[89px] mb-[60px]"
            alt="GroupTwo"
          />
          <Text className="font-semibold mb-[20px] text-[36px] text-center text-teal_A400 w-[auto]">
            <span className="text-black_901 font-poppins">
              If opportunity doesn’t
              <br />
              knock, build a
            </span>
            <span className="text-teal_A400 font-poppins">door</span>
            <span className="text-black_900 font-poppins">.</span>
          </Text>
          <div className="flex items-center justify-center flex-col pl-[60px] pr-[60px] w-full">
            <div className="mb-6 w-full">
              <label className="font-semibold text-[16px] text-black_901 w-[auto]">
                Official Names
              </label>
              <Input
                className="w-[100%]"
                wrapClassName="  w-full"
                onChange={(e) => {
                  form.handleChange("name", e.target.value);
                }}
                value={form?.values?.name}
                errors={form?.errors?.name}
                name="rectangle One"
                placeholder=""
                variant="OutlineBluegray100" />

            </div>
            <div className="mb-6 w-full">
              <label className="font-semibold text-[16px] text-black_901 w-[auto]">
                Phone number
              </label>
              <PhoneInput
                className="outline outline-[1px] rounded-radius5 outline-bluegray_100"
                placeholder="Enter phone number"
                value={form?.values?.mobileNo}
                onChange={(value) => {
                  console.log(value);
                  form.handleChange("mobileNo", value);
                }} />
              {!!form?.errors?.mobileNo && <ErrorMessage errors={form?.errors?.mobileNo} />}
            </div>
            <div className="mb-6 w-full">
              <label className="font-semibold text-[16px] text-black_901 w-[auto]">
                Email
              </label>
              <Input
                className="w-[100%]"
                wrapClassName="flex w-[100%]"
                onChange={(e) => {
                  form.handleChange("email", e.target.value);
                }}
                value={form?.values?.email}
                errors={form?.errors?.email}
                name="email"
                placeholder=""
                variant="OutlineBluegray100" />
            </div>
            <div className="mb-6 w-full">
              <label Text className="font-semibold  text-[16px] text-black_901 w-[auto]">
                Username
              </label>
              <Input
                className="w-[100%]"
                wrapClassName="flex w-full"
                onChange={(e) => {
                  form.handleChange("username", e.target.value);
                }}
                value={form?.values?.username}
                errors={form?.errors?.username}
                name="username"
                placeholder=""
                variant="OutlineBluegray100" />
            </div>
            <div className="mb-6 w-full">
              <label className="font-semibold text-[16px] text-black_901 w-[auto]">
                Password
              </label>
              <Input
                className="w-full"
                wrapClassName="w-full"
                onChange={(e) => {
                  form.handleChange("password", e.target.value);
                }}
                value={form?.values?.password}
                errors={form?.errors?.password}
                name="password"
                type="password"
                size="sm"
                placeholder=""
                variant="OutlineBluegray100" />
            </div>
          </div>
          <div className="flex flex-row justify-start px-[60px] w-full">
            <CheckBox
              className="font-normal mt-[6px] text-[16px] text-teal_A400"
              inputClassName="h-[22px] mr-[10px] w-[22px]"
              name="Iagreetoall"
              label="I agree to all the Term & Conditions"
              shape="RoundedBorder5"
              size="sm" />
          </div>
          <div className="flex flex-row justify-start px-[60px] w-full">
            <Button
              className="common-pointer font-semibold text-[16px] mt-[20px] text-center w-[200px]"
              onClick={() => {
                form.handleSubmit(loginUser);
              }}
              shape="RoundedBorder5"
              size="lg"
              variant="FillTealA400">
              Sign Up
            </Button></div>
          <div className="flex flex-row justify-start px-[60px] w-full">
            <Text
              className="common-pointer font-medium text-[16px] mt-[20px] text-teal_A400 w-[auto]">
              <span className="text-black_900 font-poppins">
                Already have an account?{" "}
              </span>
              <span onClick={goToLogin} className="text-teal_A400 font-poppins">Log In</span>
            </Text></div>
        </div>
      </div>

      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  );
};

export default RegisterationPage;
