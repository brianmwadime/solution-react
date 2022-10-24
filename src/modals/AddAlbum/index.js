import React from "react";
import ModalProvider from "react-modal";

import { addNewRelease, createAlbum, uploadFile, URL } from "Service/api";
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
import AddSongsToAlbumModal from "../AddSongsToAlbum";
import * as yup from "yup";
import { isValidUrl } from "App/util";

const AddAlbumModal = (props) => {
  const [artwork, setArtwork] = React.useState();

  const formValidationSchema = yup.object().shape({
    songCount: yup.number()
      .required("Song Count is required")
      .typeError('Song Count must be a number')
      .positive('Song Count must be greater than zero'),
    year: yup.number()
      .typeError('Year must be a number')
      .positive('Year must be greater than zero'),
    name: yup.string().required("Name is required"),
  });

  const form = useForm(
    { name: "", songCount: 10, artwork: null, tosAccepted: true, year: new Date().getFullYear() },
    {
      validate: true,
      validateSchema: formValidationSchema,
    }
  );
  const fileRef = React.createRef();

  const [album, setAlbum] = React.useState(false);
  const [isOpenSongsModal, setOpenSongsModal] = React.useState(false);

  async function callApi(data) {

    let tempData = data;
    tempData.songCount = Number(tempData.songCount);
    const req = {
      data: { ...tempData },
    };

    await createAlbum(req)
      .then(response => response.data)
      .then((album) => {
        toast.success("Album created successfully!");
        setAlbum(album);
        let release = {
          data: { "albumId": album.id, "type": "2" }
        };
        console.log(release);
        addNewRelease(release);
        setOpenSongsModal(true);
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

  function handleCloseSongsModal(song) {

    props.onRequestClose(album);

    setOpenSongsModal(false);
  }

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
                    <input name="artwork" ref={fileRef} onChange={handleFileUpload} accept="image/*" type="file" autoComplete="off" tabIndex="-1" hidden={true} />
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
                      size="sm"
                      name="name"
                      placeholder="Enter album title" />
                  </Column>
                  <Column className="mb-[20px]">
                    <label className="font-semibold text-[13px] text-black_901 w-[auto]">
                      Number of Songs
                    </label>
                    <Input
                      className="w-[100%]"
                      type="number"
                      wrapClassName=""
                      onChange={(e) => {
                        form.handleChange("songCount", e.target.value);
                      }}
                      value={form?.values?.songCount}
                      errors={form?.errors?.songCount}

                      name="songCount"
                      placeholder="Enter song count" />
                  </Column>
                  <Column>
                    <label className="font-semibold text-[13px] text-black_901 w-[auto]">
                      Year
                    </label>
                    <Input
                      className="w-[100%]"
                      type="number"
                      wrapClassName=""
                      onChange={(e) => {
                        form.handleChange("year", e.target.value);
                      }}
                      value={form?.values?.year}
                      errors={form?.errors?.year}

                      name="year"
                      placeholder="Enter release year" />
                  </Column>
                </form>
              </Column>
            </Row>
            <Line className="bg-bluegray_900 h-[1px] my-[10px] w-[100%]" />
            <Row className="items-center justify-between w-full p-[10px]">
              <Button
                className="common-pointer font-semibold text-[15px] text-center w-[100px]"
                onClick={() => props.onRequestClose()}
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
                Proceed
              </Button>
            </Row>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer hideProgressBar autoClose={3000} />
      {isOpenSongsModal ? (
        <AddSongsToAlbumModal
          albumId={album.id}
          albumName={album.name}
          songCount={parseInt(album.songCount)}
          isOpen={isOpenSongsModal}
          onRequestClose={handleCloseSongsModal}
        />
      ) : null}
    </>
  );
};

export default AddAlbumModal;
