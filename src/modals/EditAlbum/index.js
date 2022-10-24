import React from "react";
import ModalProvider from "react-modal";

import { updateAlbum, uploadFile, URL } from "Service/api";
import { ToastContainer, toast } from "react-toastify";

import useForm from "Hooks/useForm";
import {
  Column,
  Button,
  Row,
  Text,
  Img,
  Input,
  Line,
} from "Components";
import * as yup from "yup";
import { isValidUrl } from "App/util";

const EditAlbumModal = (props) => {
  const [artwork, setArtwork] = React.useState(props.album.artwork);

  const formValidationSchema = yup.object().shape({
    songCount: yup.number()
      .required("Song Count is required")
      .typeError('Song Count must be a number')
      .positive('Song Count must be greater than zero'),
    name: yup.string().required("Name is required"),
  });

  const form = useForm(
    { name: props.album.name, songCount: props.album.songCount, artwork: props.album.artwork },
    {
      validate: true,
      validateSchema: formValidationSchema,
    }
  );
  const fileRef = React.createRef();


  function callApi(data) {
    let tempData = data;
    tempData.songCount = Number(tempData.songCount);
    const req = {
      data: { ...tempData },
    };


    updateAlbum(props.album.id, req)
      .then((res) => {
        toast.success("Album updated successfully!");

        props.onRequestClose();

      })
      .catch((err) => {
        if (err.response.status === 422) {
          toast.error(err.response.data.message);
        }
      });
  }

  const handleFileSelect = () => {

    fileRef.current.click();
  };

  const handleFileUpload = (event) => {
    const fileToUpload = event.target.files[0];
    console.log(event.target.files[0]);
    const req = {
      data: { files: fileToUpload },
    };

    uploadFile(req, (event) => {
      console.log(Math.round(
        (100 * event.loaded) / event.total
      ));

    })
      .then((res) => {
        setArtwork(`${URL}${res?.data?.uploadFileRes?.data?.uploadSuccess[0].path}`);
        console.log(res?.data?.uploadFileRes?.data?.uploadSuccess[0].path);
        form.handleChange("artwork", `${res?.data?.uploadFileRes?.data?.uploadSuccess[0].path}`);
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
        shouldCloseOnOverlayClick={false}
        {...props}>
        <div className="m-[auto] max-h-[97vh] overflow-y-auto rounded-radius5">
          <Column className="bg-white_A700 items-center  w-full">
            <Column
              className="bg-black bg-repeat items-center justify-end p-[13px] w-full">
              <Text className="font-semibold text-[18px] text-white_A700 w-[auto]">
                Add Album
              </Text>
            </Column>

            <Row className="p-[20px] w-full">
              <Column className="md:w-4/12">

                <Column className="w-[127px]">
                  <Text className="font-semibold text-[13px] text-center text-bluegray_900 w-full">
                    Cover Image
                  </Text>
                  {isValidUrl(artwork) ? (<Img
                    src={artwork}
                    className="h-[127px] w-[127px]"
                    alt="album artwork" />) : <Img
                    src="images/noImage.svg"
                    className="h-[127px] w-[127px]"
                    alt="album artwork" />}
                  <Row className="flex flex-row justify-between w-full">
                    <Button className="font-semibold text-[10px] border-none text-gray_800 w-[auto]" onClick={handleFileSelect}>
                      Upload Image
                    </Button>
                    <input name="artwork" ref={fileRef} onChange={handleFileUpload} hidden={true} accept="image/*" type="file" autoComplete="off" tabIndex="-1" />
                    <Button className="font-semibold border-none text-[10px] text-gray_401 w-[auto]">
                      Remove
                    </Button>
                  </Row>
                </Column>

              </Column>
              <Column className="md:w-8/12">
                <form id="albumForm" noValidate={true}>
                  <Column className="mb-[20px]">
                    <label className="font-semibold text-[13px] text-bluegray_900 w-[auto]">
                      Album Title
                    </label>
                    <Input
                      className="w-[100%]"
                      wrapClassName=""
                      onChange={(e) => {
                        form.handleChange("name", e.target.value);
                      }}
                      value={form?.values?.name}
                      errors={form?.errors?.name}
                      required={true}
                      name="name"
                      placeholder="Enter album title" />
                  </Column>
                  <Column>
                    <label className="font-semibold text-[13px] text-black_901 w-[auto]">
                      Number of Songs
                    </label>
                    <Input
                      className="w-[100%]"
                      type="number"
                      wrapClassName=""
                      onChange={(e) => {
                        form.handleChange("songCount", parseInt(e.target.value));
                      }}
                      readOnly={true}
                      value={parseInt(form?.values?.songCount)}
                      errors={form?.errors?.songCount}
                      required={true}
                      name="songCount"
                      placeholder="Enter song count" />
                  </Column>
                </form>
              </Column>
            </Row>
            <Line className="bg-bluegray_900 h-[1px] my-[10px] w-[100%]" />
            <Row className="items-center justify-between w-full p-[10px]">
              <Button
                className="common-pointer font-semibold text-[15px] text-center w-[100px]"
                onClick={props.onRequestClose}
                shape="RoundedBorder5"
                variant="OutlineGray6011_2">
                Cancel
              </Button>
              <Button
                className="common-pointer font-semibold text-[15px] text-center w-[100px]"
                onClick={() => {
                  form.handleSubmit(callApi);
                }}
                shape="RoundedBorder5"
                variant="FillTealA400">
                Update
              </Button>
            </Row>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer hideProgressBar autoClose={3000} />

    </>
  );
};

export default EditAlbumModal;
