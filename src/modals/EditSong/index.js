import React from "react";
import ModalProvider from "react-modal";
import PropTypes from "prop-types";
import { updateSong, uploadFile, fetchCategory, URL } from "Service/api";
import { ToastContainer, toast } from "react-toastify";
import useForm from "Hooks/useForm";
import {
  Column,
  Text,
  Row,
  Img,
  Input,
  SelectBox,
  TextArea,
  Line,
  Button,
  ErrorMessage,
  CheckBox
} from "Components";
import { isValidUrl } from "App/util";
import * as yup from "yup";

const EditSongModal = (props) => {
  const [artwork, setArtwork] = React.useState(props.song.artwork);
  const [categories, setCategories] = React.useState([]);
  const fileRef = React.createRef();
  const previewRef = React.createRef();

  const formValidationSchema = yup.object().shape({
    name: yup.string().required("Title is required"),
    filePath: yup.string().url().required("Upload your song file"),
    basePrice: yup.string().required("Price is required"),
    categoryId: yup.string().required("Category Id is required"),
    tosAccepted: yup.boolean().oneOf([true], "You must accept the terms & conditions"),
  });

  const form = useForm({ name: props.song.name, categoryId: props.song.categoryId, fileType: props.song.fileType, filePath: props.song.filePath, artwork: props.song.artwork, tosAccepted: props.song.tosAccepted, thanksNote: props.song.thanksNote, basePrice: props.song.basePrice },
    {
      validate: true,
      validateSchema: formValidationSchema,
    });

  const tosExample = "1. I indemnify Solution from any claim, damages, or piracy claim.\n2. Where I’ve used content or IP from another artist, I have sorted out with that artist.\n3. I indemnify Solution from any claim, damages, or piracy claim.";

  React.useEffect(() => {

    const fetchData = async () => {
      await fetchCategory()
        .then((res) => {
          setCategories(res.data.data?.map((category) => { return { "value": category.id, "label": category.name }; }));

        })
        .catch((err) => {
          console.error(err);
          toast.error("Try again later.");
        });
    }

    fetchData()
      .catch(console.error);

  }, []);

  function callCreateSongApi(data) {
    let tempData = data;
    tempData.basePrice = Number(tempData.basePrice);
    const req = {
      data: { ...tempData, trackLength: 60 },
    };

    updateSong(props.song.id, req)
      .then((res) => {
        toast.success("Song updated successfully!");
        props.onRequestClose(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Try again later.");
      });
  }

  const handleFileSelect = () => {

    fileRef.current.click();
  };

  const handlePreviewSelect = () => {

    previewRef.current.click();
  };

  const handleFileUpload = (event) => {
    const fileToUpload = event.target.files[0];

    const req = {
      data: { files: fileToUpload },
    };

    uploadFile(req)
      .then((res) => {
        form.handleChange("filePath", res?.data?.uploadFileRes?.data?.uploadSuccess[0].path);
        toast.success(res?.data?.uploadFileRes?.message);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Try again later.");
      });
  };

  const handlePreviewUpload = (event) => {
    const fileToUpload = event.target.files[0];

    const req = {
      data: { files: fileToUpload },
    };

    uploadFile(req)
      .then((res) => {
        setArtwork(`${URL}${res?.data?.uploadFileRes?.data?.uploadSuccess[0].path}`);
        form.handleChange("artwork", res?.data?.uploadFileRes?.data?.uploadSuccess[0].path);
        toast.success(res?.data?.uploadFileRes?.message);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Try again later.");
      });
  };

  return (

    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-[auto] w-full md:w-[600px]"
        overlayClassName="fixed flex h-[100%] inset-y-[0] w-[100%] modal-overlay"
        {...props}>
        <div className="m-[auto] max-h-[97vh] overflow-y-auto  rounded-radius5">
          <Column className="items-center rounded-radius5 w-[100%]">
            <Column
              className="bg-black bg-repeat items-center justify-end p-[13px] w-full">
              <Text className="font-semibold text-[18px] text-white_A700 w-[auto]">
                Update Song
              </Text>
            </Column>
            <Column className="bg-white_A700 items-center px-[20px] w-full">
              <Row className="items-start mt-[20px] w-full">
                <div className="w-4/12">
                  <Column className="w-[127px] mt-[20px]">
                    {isValidUrl(artwork) ? (<Img
                      src={artwork}
                      className="h-[127px] w-[127px]"
                      alt="album artwork" />) : <Img
                      src="images/noImage.svg"
                      className="h-[127px] w-[127px]"
                      alt="album artwork" />}
                    <Row className="flex flex-row justify-between w-full">
                      <Button className="font-semibold text-[10px] border-none text-gray_800 w-[auto]" size="upload" onClick={handlePreviewSelect}>
                        Upload Image
                      </Button>
                      <input hidden={true} ref={previewRef} onChange={handlePreviewUpload} accept="image/*" type="file" autoComplete="off" tabIndex="-1" />

                      <Button className="font-semibold border-none text-[10px] text-gray_401 w-[auto]" size="upload">
                        Remove
                      </Button>
                    </Row>
                  </Column>
                </div>
                <Column className=" w-8/12">
                  <Column className="mb-[15px] w-[100%]">
                    <label className="font-semibold text-[15px] text-bluegray_900 w-[auto]">
                      Song Title
                    </label>
                    <Input
                      className="w-[100%]"
                      onChange={(e) => {
                        form.handleChange("name", e.target.value);
                      }}
                      value={form?.values?.name}
                      errors={form?.errors?.name}
                      name="name"
                      placeholder="Enter title"
                    ></Input>
                  </Column>
                  <Column className="mb-[15px] w-[100%]">
                    <label className="font-semibold text-[15px] text-bluegray_900 w-[auto]">
                      Select Category
                    </label>
                    <SelectBox
                      className="w-[100%]"
                      onChange={(e) => {
                        console.log(e);
                        form.handleChange("categoryId", e);
                      }}
                      options={categories}
                      value={categories.find((category) => category.value === form?.values?.categoryId)}
                      placeholderClassName=""
                      name="categoryId"
                      errors={form?.errors?.categoryId}
                      placeholder="-- Select Genre --"
                      isSearchable={false}
                      isMulti={false}
                      indicator={
                        <Img
                          src="images/img_mail.svg"
                          className="mr-[15px]"
                          alt="mail"
                        />
                      }
                      size="sm" />
                  </Column>
                  <Column className="mb-[15px] w-[100%]">
                    <label className="font-semibold text-[15px] text-black_901 w-[auto]">
                      Base Price
                    </label>
                    <Input
                      className="w-[100%]"
                      name="basePrice"
                      onChange={(e) => {
                        form.handleChange("basePrice", e.target.value);
                      }}
                      value={form?.values?.basePrice}
                      errors={form?.errors?.basePrice}
                      placeholder="Enter base price"
                    ></Input>
                  </Column>
                </Column>
              </Row>
              <Row className="items-end mb-[15px]  w-full">
                <Column className="md:w-6/12">

                  <button type="button" className="inline-flex flex-row items-center justify-center p-2 rounded-md font-semibold border md:mr-5" onClick={() => (handleFileSelect())}>
                    <span className="text-[15px] text-black">Upload</span>
                    <svg className="fill-black ml-[8px]" width="20" height="20" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" fillOpacity="1" fillRule="evenodd" clipRule="evenodd" d="M4.53313 0.435059C3.94227 0.435059 3.38561 0.542479 2.87867 0.754339C2.3712 0.966409 1.92375 1.26407 1.54872 1.63904C1.17375 2.01403 0.876077 2.46147 0.663997 2.96893C0.452147 3.47592 0.344727 4.03256 0.344727 4.62338C0.344727 5.20719 0.452147 5.76028 0.663997 6.26727C0.876107 6.77475 1.17375 7.22219 1.54872 7.59715C1.92398 7.97236 2.37142 8.27179 2.87867 8.48715C3.38594 8.70251 3.9426 8.8117 4.53313 8.8117C5.11671 8.8117 5.66981 8.70251 6.17708 8.48715C6.68437 8.27178 7.1318 7.97235 7.507 7.59715C7.88218 7.22199 8.18164 6.77455 8.39701 6.26727C8.61239 5.75997 8.72157 5.20688 8.72157 4.62338C8.72157 4.03287 8.61238 3.47624 8.39701 2.96893C8.18168 2.46171 7.88223 2.01427 7.507 1.63904C7.132 1.26407 6.68455 0.966419 6.17708 0.754339C5.67014 0.542479 5.11704 0.435059 4.53313 0.435059ZM2.74259 3.52901C2.6592 3.52901 2.5869 3.47855 2.52772 3.37904C2.46869 3.27912 2.43876 3.16147 2.43876 3.02932C2.43876 2.88583 2.4687 2.76514 2.52772 2.6706C2.58713 2.57667 2.66298 2.52903 2.75314 2.52903H6.3237C6.40689 2.52903 6.47903 2.57949 6.53818 2.679C6.59746 2.7787 6.62753 2.89657 6.62753 3.02934C6.62753 3.17264 6.59747 3.29312 6.53818 3.38746C6.47915 3.4814 6.40343 3.52903 6.31314 3.52903L2.74259 3.52901ZM3.31771 5.80166C3.31278 5.80166 3.30779 5.80155 3.30275 5.80137C3.21609 5.79798 3.14389 5.76805 3.08824 5.71239C3.02571 5.64987 2.99401 5.5758 2.99401 5.49226C2.99401 5.40897 3.02571 5.33503 3.08824 5.2725L4.2817 4.06851C4.33418 4.00926 4.40157 3.97923 4.48197 3.97923C4.4868 3.97923 4.49163 3.97934 4.49657 3.97954C4.58354 3.98294 4.65929 4.01287 4.72164 4.06851L5.94675 5.28305C6.00253 5.33883 6.02891 5.411 6.02515 5.49754C6.0218 5.58445 5.99187 5.65674 5.93619 5.71239C5.87369 5.77493 5.79973 5.80664 5.71644 5.80664C5.63315 5.80664 5.55919 5.77493 5.49667 5.71239L4.82643 5.05274V6.8327C4.82643 6.91591 4.7947 6.98807 4.7322 7.04718C4.66952 7.10646 4.59543 7.13652 4.51204 7.13652C4.422 7.13652 4.34626 7.10646 4.28697 7.04718C4.22794 6.98815 4.19801 6.91243 4.19801 6.82214V5.05273L3.51762 5.72295C3.46503 5.77517 3.39778 5.80166 3.31771 5.80166Z" />
                    </svg>
                  </button>
                  <input name="filePath" required={true} accept=".mp3,audio/*" hidden={true} ref={fileRef} type="file" autoComplete="off" tabIndex="-1" onChange={handleFileUpload} />

                  {!!form?.errors.filePath && <ErrorMessage errors={form?.errors.filePath} />}
                </Column>
                <Column className=" md:w-6/12">
                  <label className="font-semibold text-[15px] text-black_901 w-[auto]">
                    Thank You Note
                  </label>
                  <Input
                    className="w-[100%]"
                    name="thanksNote"
                    onChange={(e) => {
                      form.handleChange("thanksNote", e.target.value);
                    }}
                    value={form?.values?.thanksNote}
                    placeholder=""
                  ></Input>
                </Column>
              </Row>
              <Column className="mb-[15px] w-full">
                <label className="font-semibold text-[15px] text-black_901 w-[auto]">
                  Type
                </label>
                <SelectBox
                  onChange={(e) => {
                    form.handleChange("fileType", e);
                  }}
                  options={[{ "value": 0, "label": "Audio" }, { "value": 1, "label": "Video" }]}
                  value={[{ "value": 0, "label": "Audio" }, { "value": 1, "label": "Video" }].filter((type) => type.value === form?.values?.fileType)}
                  placeholderClassName=""
                  name="fileType"
                  placeholder="-- Select file type --"
                  isSearchable={false}
                  isMulti={false}
                  indicator={
                    <Img
                      src="images/img_mail.svg"
                      className="mr-[15px]"
                      alt="mail"
                    />
                  }
                  size="sm" />
              </Column>
              <Column className="mb-[15px] w-full">
                <Text className="font-semibold text-[13px] text-black_901 w-[auto]">
                  Terms & Conditions
                </Text>
                <TextArea
                  className="mt-[6px] w-[100%]"

                  value={tosExample}
                  readOnly={true} />
              </Column>
              <Row className="justify-start w-full">
                <CheckBox
                  className="font-normal text-[14px]"
                  inputClassName="h-[22px] mr-[10px] w-[22px]"
                  name="tosAccepted"
                  checked={Boolean(form?.values?.tosAccepted)}
                  errors={form?.errors?.tosAccepted}
                  onChange={(e) => {
                    form.handleChange("tosAccepted", e.target.checked);
                  }}
                  label="I agree to all the Terms & Conditions"
                  shape="RoundedBorder5"
                  size="sm" />
              </Row>
              <Line className="bg-bluegray_900 h-[1px] my-[10px] w-[100%]" />
              <Row className="items-center justify-between w-full py-[5px]">
                <Button
                  className="common-pointer font-normal text-[15px] text-center w-[100px]"
                  onClick={() => props.onRequestClose()}
                  shape="RoundedBorder5"
                  size="sm"
                  variant="OutlineGray601">
                  Cancel
                </Button>
                <Row className="justify-between">
                  <Button
                    className="common-pointer font-semibold text-[15px] text-center w-[100px]"
                    onClick={() => {
                      form.handleSubmit(callCreateSongApi);
                    }}
                    shape="RoundedBorder5"
                    size="sm"
                    variant="FillTealA400">
                    Save Song
                  </Button>

                </Row>
              </Row>
            </Column>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  );
};

EditSongModal.propTypes = {
  song: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func,
};

export default EditSongModal;
