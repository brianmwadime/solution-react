import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { URL, uploadFile, createSongs, fetchCategory } from "Service/api";
import ModalProvider from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4d } from "uuid";

import {
  Column,
  Row,
  Button,
  Text,
  Line,
  TextArea,
  CheckBox,
  TableRow as TableRows,
} from "Components";
import * as yup from "yup";
import { AxiosError } from "axios";

interface Props {
  albumId: Number;
  songCount: React.ReactNode;
  onRequestClose?: () => void;
  isOpen: boolean;
  albumName?: string;
  // [x: string]: any;
}

const AddSongsToAlbumModal = (props: Props) => {
  const { albumId, songCount, isOpen, albumName, onRequestClose } = props;
  const [rowsData, setRowsData] = useState([]);
  const [categories, setCategories] = React.useState([]);

  const SongItemSchema = yup.object().shape({
    name: yup.string().required("Title is required"),
    fileType: yup.string().required("File type is required"),
    filePath: yup.string().required("Upload your song file"), // .url()s
    albumId: yup.number().required("Album Id is required"),
    artwork: yup.string().required("Song artwork is required"),
    basePrice: yup.number(),
    categoryId: yup.string().required("Category Id is required"),
  })

  const ArrayOfSongItemsSchema = yup.array().of(SongItemSchema);

  const SongsArraySchema = yup.lazy((value) => {
    if (Array.isArray(value)) {
      return ArrayOfSongItemsSchema;
    }
    return SongItemSchema;
  });

  const tosExample = "1. I indemnify Solution from any claim, damages, or piracy claim.\n2. Where I’ve used content or IP from another artist, I have sorted out with that artist.\n3. I indemnify Solution from any claim, damages, or piracy claim.";

  React.useEffect(() => {
    fetchCategory()
      .then((res) => {
        console.log(res);
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Try again later.");
      });
  }, []);

  useEffect(() => {

    const rows = [];
    let i = 0;
    do {
      rows.push({
        tempId: uuidv4d(),
        name: "",
        fileType: undefined,
        filePath: undefined,
        albumId: albumId,
        artwork: undefined,
        basePrice: 500,
        categoryId: undefined
      });
      i++;
    }
    while (i < songCount);

    setRowsData([...rows])
  }, [albumId, songCount]);

  const addTableRows = () => {
    const rowInput: Record<string,any> = {
      tempId: uuidv4d(),
      name: "",
      fileType: undefined,
      filePath: null,
      albumId: albumId,
      artwork: null,
      basePrice: 500,
      categoryId: undefined,
    }

    setRowsData([...rowsData, rowInput])

  }
  const deleteTableRows = (index: number) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  }

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {

    const { name } = event.target;
    const rowsInput = [...rowsData];
    if (name === "filePath" || name === "artwork") {
      rowsInput[index][name] = event.target.files[0];

    } else {
      rowsInput[index][name] = event.target.value
    }

    setRowsData(rowsInput);

  }

  const handleFileUpload = async (rows: any[]) => {
    let filesData = new FormData();

    rows.forEach((data: Record<string, any>) => filesData.append("files", data.filePath));

    const req = {
      data: filesData,
    };

      await uploadFile(req)
      .then(response => response.data)
      .then((data) => {
          
          for (let i = 0; i < rows.length; i++) {
            console.log("file: ", data?.uploadFileRes, " index: ", i);
            rows[i].filePath = data?.uploadFileRes?.data?.uploadSuccess[i].path;
          }

          setRowsData(rows);
          toast.success(data?.uploadFileRes?.message);
      });

  };

  const handlePreviewsUpload = async (rows: any[]) => {
    let filesData = new FormData();

    rows.forEach((data: Record<string, any>) => filesData.append("files", data.artwork));

    const req = {
      data: filesData,
    };

    await uploadFile(req)
      .then(response => response.data)
      .then((data) => {
        for (let i = 0; i < rows.length; i++) {
          console.log("artwork: ", data?.uploadFileRes, " index: ", i);
          rows[i].artwork = data?.uploadFileRes?.data?.uploadSuccess[i].path;
        }

        setRowsData(rows);
        
        toast.success(data?.uploadFileRes?.message);
      });

  };

  const callSaveSongsToAlbumApi = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      await SongsArraySchema.validate(rowsData);

      console.group("Song data start");
      console.table(rowsData);
      console.groupEnd();

      await handleFileUpload(rowsData);

      await handlePreviewsUpload(rowsData);

      console.group("Song data updated");
      console.table(rowsData);
      console.groupEnd();

      await addSongsToAlbum(rowsData);

    } catch (e) {
      if (e instanceof yup.ValidationError) {
        toast.error("Please fill in all the fields.");
      }

      if (e instanceof AxiosError) {
        if (e.response?.status === 400) {
          toast.error(e.response.data.message);
        } else {
          toast.error(e.message);
        }
      }

    }

  }

  const addSongsToAlbum = async (rows: any[]) => {

    const req = {
      data: { data: rows },
    };

    await createSongs(req)
      .then(response => response.data)
      .then((res) => {
        
        onRequestClose();

        toast.success(res?.message);
      });
    // .catch((err) => {
    //   // console.error(err);
    //   toast.error(err.message);
    // });
  }

  return (
    <>
      <ModalProvider
        appElement={document.getElementById("root")}
        className="m-[auto] w-full md:w-[800px]"
        overlayClassName="fixed flex h-[100%] inset-y-[0] w-[100%] modal-overlay"
        shouldCloseOnOverlayClick={false}
        isOpen={isOpen}>
        <div className="bg-white_A700 m-[auto] max-h-[97vh] overflow-y-auto  rounded-radius5">
          <Column className="items-center rounded-radius5 w-full">

            <Column
              className="bg-black bg-repeat items-center justify-end p-[13px] w-full">
              <Text className="font-semibold text-[18px] text-white_A700 w-[auto]">
                Add Songs to {albumName}
              </Text>
            </Column>
            <Column className="px-[20px] w-full">
              <Row className="mt-[20px] w-full">
                <Column className="md:w-3/12 md:mr-5 items-center justify-center">
                  <div className="flex flex-col items-center w-[128px]">
                    <Column
                      className="bg-cover relative bg-no-repeat h-[128px] items-end w-[127px]"
                      style={{
                        backgroundImage:
                          "url('images/noImage.svg')",
                      }}>
                      {/* <Button
                        className="absolute top-1 right-1 flex items-center p-3 rounded justify-center"
                        shape="icbCircleBorder8"
                        size="smIcn"
                        variant="icbFillBluegray40019">
                        <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M2.58653 0.864191L3.62443 1.73509L1.41994 4.3623L0.382578 3.49136L2.58653 0.864191ZM4.245 0.487163L3.78213 0.0987728C3.60325 -0.0513263 3.33616 -0.0279585 3.18549 0.150972L2.81346 0.594355L3.85137 1.46526L4.28533 0.948086C4.40174 0.80934 4.38374 0.603586 4.245 0.487173L4.245 0.487163ZM0.00047381 4.87654C-0.0100582 4.95623 0.0666509 5.0201 0.143167 4.99425L1.18413 4.64334L0.146768 3.7724L0.00047381 4.87654Z" fill="currentColor" />
                        </svg>
                      </Button> */}
                    </Column>
                    <Text className="font-semibold mt-[13px] text-[15px] text-bluegray_900 w-[auto]">
                      {albumName}
                    </Text>
                  </div>
                </Column>

                <div className="flex w-full overflow-x-auto">
                  <form id="songsToAlbumForm" noValidate={true} onSubmit={callSaveSongsToAlbumApi}>
                    <table className="border-collapse table w-full text-sm text-left">
                      <thead>
                        <tr>
                          <th scope="col" className="py-2 px-2">Name</th>
                          <th scope="col" className="py-2 px-2">Type</th>
                          <th scope="col" className="py-2 px-2">Category</th>
                          <th scope="col" className="py-2 px-2">Upload</th>
                          <th scope="col" className="py-2 px-2">Preview</th>
                          <th scope="col" className="py-2 pl-2">
                            <button type="button" className="bg-transparent w-auto text-black_900_b1 rounded focus:outline-none p-2 border border-black_900_b1 inline-flex items-center" onClick={addTableRows}>
                              <svg className="fill-current" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.5883 4.57142H7.42856V1.41171C7.42856 0.63542 6.77656 0 5.99999 0C5.22342 0 4.57142 0.63543 4.57142 1.41171V4.57142H1.41171C0.63542 4.57142 0 5.22342 0 5.99999C0 6.77656 0.63543 7.42856 1.41171 7.42856H4.57142V10.5883C4.57142 11.3646 5.22342 12 5.99999 12C6.77656 12 7.42856 11.3646 7.42856 10.5883V7.42856H10.5883C11.3646 7.42856 12 6.77656 12 5.99999C12 5.22342 11.3646 4.57142 10.5883 4.57142Z" fill="currentColor" />
                              </svg>

                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        <TableRows categories={categories} albumId={albumId} rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                      </tbody>
                    </table>
                  </form>
                </div>

              </Row>
              <Column className="mt-[20px] w-full">
                <TextArea
                  className="w-full mb-[20px]"
                  name="tos"
                  value={tosExample}
                  rows={2}
                  readOnly={true}
                  placeholder="Terms & Conditions"
                  size="sm"
                  variant="OutlineGray601" />
                <CheckBox
                  className="font-normal text-[16px] text-black"
                  inputClassName="h-[22px] mr-[10px] w-[22px]"
                  name="Label"
                  
                  label="I agree to all the Terms & Conditions"
                  shape="RoundedBorder5"
                  size="sm" />
              </Column>
              <Line className="bg-bluegray_900 h-[1px] mt-[20px] w-full" />
              <Row className="items-center justify-between my-4 w-full">
                <Button
                  type="button"
                  className="common-pointer font-normal text-[15px] text-center w-auto"
                  onClick={onRequestClose}
                  shape="RoundedBorder5"
                  size="md"
                  variant="OutlineGray601">
                  Cancel
                </Button>
                <Button
                  className="common-pointer font-semibold text-[15px] text-center ml-[20px] w-auto"
                  type="submit"
                  form="songsToAlbumForm"

                  shape="RoundedBorder5"
                  size="md"
                  variant="FillTealA400">
                  Add Songs to Album
                </Button>
              </Row>
            </Column>
          </Column>
        </div>
      </ModalProvider>
      <ToastContainer hideProgressBar autoClose={3000} />
    </>
  );
};

AddSongsToAlbumModal.propTypes = {
  albumName: PropTypes.string.isRequired,
  albumId: PropTypes.any.isRequired,
  songCount: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
}

export default AddSongsToAlbumModal;
