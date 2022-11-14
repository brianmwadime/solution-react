import React from "react";

import { fetchSongs, fetchAlbums, deleteAlbum, deleteSong, URL } from "Service/api";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import AddSongModal from "Modals/AddSong";
import AddAlbumModal from "Modals/AddAlbum";
import {
  Column,
  Row,
  Img,
  Text,
  Button,
  SearchBar,
  Confirmation,
  Switch,
  SideBar,
  FilterBar,
  NoContent
} from "Components";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { isValidUrl } from "Util";
import "react-tabs/style/react-tabs.css";
import usePageTitle from "Hooks/usePageTitle";
import EditSongModal from "App/modals/EditSong";
import EditAlbumModal from "App/modals/EditAlbum";
import AddSongsToAlbumModal from "App/modals/AddSongsToAlbum";
import Pagination from "App/components/Pagination";

const MusicPage = () => {
  usePageTitle('Solution - Music');
  const [songsData, setSongsData] = React.useState([]);
  const [albumsData, setAlbumsData] = React.useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const [editSong, setEditSong] = React.useState();
  const [editAlbum, setEditAlbum] = React.useState();

  const [songsPagination, setSongsPagination] = React.useState({ currentPage: 1, itemCount: 0, pageCount: 1, perPage: 10 });
  const [albumsPagination, setAlbumsPagination] = React.useState({ currentPage: 1, itemCount: 0, pageCount: 1, perPage: 10 });

  const [isOpenAlbumSongsModal, setOpenAlbumSongsModal] = React.useState(false);
  const [isOpenEditSongModal, setEditSongModal] = React.useState(false);
  const [isOpenEditAlbumModal, setEditAlbumModal] = React.useState(false);
  const [isOpenAddSongModal, setAddSongModal] = React.useState(false);
  const [isOpenAddAlbumModal, setAddAlbumModal] = React.useState(false);

  const [songPage, setSongPage] = React.useState(1);
  const [albumPage, setAlbumPage] = React.useState(1);
  const [songPageCount, setSongPageCount] = React.useState(undefined);
  const [albumPageCount, setAlbumPageCount] = React.useState(undefined);
  const [filterSongBy, setSongFilterBy] = React.useState();
  const [filterAlbumBy, setAlbumFilterBy] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    callSongsApi();
  }, [songPage, songPageCount, filterSongBy, searchTerm]);

  React.useEffect(() => {
    callAlbumsApi();
  }, [albumPage, albumPageCount, searchTerm]);

  function callSongsApi() {
    const req = {
      headers: {},
      data: {
        "query": {
          ...(filterSongBy && {
            "fileType": {
              "$eq": filterSongBy
            }
          }),
          ...(searchTerm !== "" && {
            "name": {
              "$like": `%${searchTerm}%`
            }
          }),
          "addedBy": {
            "$eq": JSON.parse(localStorage.getItem("userId"))
          }
        },
        "options": {
          "page": songPage,
          "paginate": songPageCount
        }
      }
    };

    fetchSongs(req)
      .then((res) => {
        setSongsData(res?.data?.data);
        setSongsPagination(res?.data?.paginator);
      })
      .catch((err) => {
        console.error(err);
        toast.error("try again later");
      });
  }

  async function callAlbumsApi() {
    const req = {
      headers: {},
      data: {
        "query": {
          //   "fileType": {
          //     "$eq": filterAlbumBy
          //   },
          ...(searchTerm !== "" && {
            "name": {
              "$like": `%${searchTerm}%`
            }
          }),
          "addedBy": {
            "$eq": JSON.parse(localStorage.getItem("userId"))
          }
        },
        "options": {
          "page": albumPage,
          "paginate": albumPageCount
        }
      }
    };

    fetchAlbums(req)
      .then((res) => {
        setAlbumsData(res?.data?.data);
        setAlbumsPagination(res?.data?.paginator);
      })
      .catch((err) => {
        console.error(err);
        toast.error("try again later");
      });
  }

  async function deleteSongHandler(id) {
    if (await Confirmation({
      header: 'Delete Song',
      confirmation: `Are you sure you want to remove this song?`
    })) {
      deleteSong(id)
        .then((res) => {
          setSongsData(current =>
            current?.filter(song => {
              return song.id !== res.data.id;
            }),
          );

          toast.success(res?.message);
        })
        .catch((err) => {
          console.error(err);
          toast.error("try again later");
        });
    }
  }

  function resetFilter() {
    setSongPageCount(undefined);
    setSongFilterBy(undefined);
  }

  function editSongHandler(song) {
    setEditSong(song);
    setEditSongModal(true);
  }

  function editAlbumHandler(song) {
    setEditAlbum(song);
    setEditAlbumModal(true);
  }

  async function deleteAlbumHandler(id) {
    if (await Confirmation({
      header: 'Delete Album',
      confirmation: `Are you sure you want to remove this album?`
    })) {

      const req = {
        data: {
          "isWarning": false
        }
      }
      deleteAlbum(id, req)
        .then((res) => {
          console.log(res);
          setAlbumsData(current =>
            current?.filter(album => {
              return album.id !== res.data.id;
            }),
          );

          toast.success(res?.message);
        })
        .catch((err) => {
          console.error(err);
          toast.error("try again later");
        });
    }
  }

  function handleOpenAddSongModal() {
    setAddSongModal(true);
  }

  function handleCloseAddSongModal(song) {

    if (song != null) {
      setSongsData(current => [...current, song]);
    }

    setAddSongModal(false);
  }


  function handleCloseEditSongModal(song) {

    if (song != null) {
      setSongsData(current => {
        return current.map((currentSong, index) => {
          if (currentSong.id == song.id) {
            return song;
          }

          return currentSong;
        })
      });
    }

    setEditSongModal(false);
  }

  function handleCloseEditAlbumModal(album) {

    console.log(album);
    if (album != null) {
      setAlbumsData(current => {
        return current.map((currentAlbum, index) => {
          if (currentAlbum.id == album.id) {
            return album;
          }

          return currentAlbum;
        })
      });
    }

    setEditAlbumModal(false);
  }

  function handleOpenAddAlbumModal() {
    setAddAlbumModal(true);
  }
  function handleCloseAddAlbumModal(album) {

    if (album != null) {
      setAlbumsData(current => [...current, album]);
    }

    setAddAlbumModal(false);
  }

  function handleOpenAddSongsToAlbumModal() {
    setOpenAlbumSongsModal(true);
  }

  function handleCloseAddSongsToAlbumModal() {
    setOpenAlbumSongsModal(false);
  }

  function changeSearch(searchTerm) {
    setSearchTerm(searchTerm);
  }

  return (
    <>
      <Column className="bg-white_A700 font-poppins min-h-screen">
        <Row className="flex-grow flex-row min-h-[50vh]">
          <SideBar />
          <div className="w-full max-w-screen px-12 md:px-12 my-6">
            <header className="w-full">
              <SearchBar pageTitle="Music" searchTerm={searchTerm} setSearchTerm={changeSearch} />
            </header>
            <main id="main" className="flex flex-col space-y-3 items-start flex-grow">
              {selectedTabIndex === 0 && <Button
                className=" flex items-center justify-center  text-center mt-[10px]"
                onClick={handleOpenAddSongModal}
                size="md"
                leftIcon={
                  <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M10.5883 4.57142H7.42856V1.41171C7.42856 0.63542 6.77656 0 5.99999 0C5.22342 0 4.57142 0.63543 4.57142 1.41171V4.57142H1.41171C0.63542 4.57142 0 5.22342 0 5.99999C0 6.77656 0.63543 7.42856 1.41171 7.42856H4.57142V10.5883C4.57142 11.3646 5.22342 12 5.99999 12C6.77656 12 7.42856 11.3646 7.42856 10.5883V7.42856H10.5883C11.3646 7.42856 12 6.77656 12 5.99999C12 5.22342 11.3646 4.57142 10.5883 4.57142Z" />
                  </svg>
                }
                shape="RoundedBorder5"
                variant="FillTealA400">
                <div className="common-pointer bg-transparent font-semibold ml-[10px] text-[13px]">
                  Add Song
                </div>
              </Button>}
              {selectedTabIndex === 1 && <Button
                className=" flex items-center justify-center  text-center mt-[10px]"
                onClick={handleOpenAddAlbumModal}
                size="md"
                leftIcon={
                  <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M10.5883 4.57142H7.42856V1.41171C7.42856 0.63542 6.77656 0 5.99999 0C5.22342 0 4.57142 0.63543 4.57142 1.41171V4.57142H1.41171C0.63542 4.57142 0 5.22342 0 5.99999C0 6.77656 0.63543 7.42856 1.41171 7.42856H4.57142V10.5883C4.57142 11.3646 5.22342 12 5.99999 12C6.77656 12 7.42856 11.3646 7.42856 10.5883V7.42856H10.5883C11.3646 7.42856 12 6.77656 12 5.99999C12 5.22342 11.3646 4.57142 10.5883 4.57142Z" />
                  </svg>
                }
                shape="RoundedBorder5"
                variant="FillTealA400">
                <div className="common-pointer bg-transparent font-semibold ml-[10px] text-[13px]">
                  Add Album
                </div>
              </Button>}

              <Column className="bg-gray_50 justify-center mt-[14px] p-[26px] rounded-radius12 w-[100%]">
                <Tabs
                  selectedIndex={selectedTabIndex}
                  onSelect={(index) => setSelectedTabIndex(index)}
                  selectedTabClassName="!text-teal_A400 font-poppins font-semibold border-b-[4px] !border-b-teal_A400"
                  selectedTabPanelClassName=" tab-panel--selected"
                  className="flex flex-col justify-center w-[100%]">
                  <TabList className="flex flex-row mt-[4px] border-b-[1px] border-b-teal_A400 md:w-[300px]">
                    <Tab className="font-semibold ml-[20px] mr-[20px] pl-[20px] pr-[20px] text-[13px] text-black_901 w-[auto] ">
                      <Text className="">Songs</Text>
                    </Tab>
                    <Tab className="font-semibold ml-[20px] mr-[20px] pl-[20px] pr-[20px] text-[13px] text-black_901 w-[auto]">
                      <Text className="">Albums</Text>
                    </Tab>
                  </TabList>
                  <div className="lg:mt-[14px] xl:mt-[16px] 2xl:mt-[18px] 3xl:mt-[21px] w-[auto]">
                    {/* Songs Tab */}
                    <TabPanel
                      key="tab-content-songs"
                      className="w-[100%]" >
                      <Column className="w-[100%]">
                        <FilterBar onReset={resetFilter} pageCount={songPageCount} filterBy={filterSongBy} onPageCountChange={setSongPageCount} onTypeChange={setSongFilterBy} />
                        <div className="overflow-x-auto relative">
                          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 bg-[#DAF5F1]">
                              <tr>
                                <th scope="col" className="py-3 px-6">
                                  ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Cover Image
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Title
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  No of Views
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  No of Purchases
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Earnings
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Active
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {songsData?.map(
                                (song, index) => {
                                  return (
                                    <React.Fragment
                                      key={`song${index}`}>
                                      {<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                          {index}
                                        </th>
                                        <td className="py-4 px-6">
                                          <Img
                                            src={song?.artwork != null ? `${URL}${song?.artwork}` : "images/noImage.svg"}
                                            className="w-[50px]"
                                            alt="avatar"
                                          />
                                        </td>
                                        <td className="py-4 px-6">
                                          {song["name"]}
                                        </td>
                                        <td className="py-4 px-6">
                                          N/A
                                        </td>
                                        <td className="py-4 px-6">
                                          N/A
                                        </td>
                                        <td className="py-4 px-6">
                                          0 KES
                                        </td>
                                        <td className="py-4 px-6">
                                          <Switch
                                            onColor="#E2FBF3"
                                            offColor="#E2FBF3"
                                            onHandleColor="#00c89c"
                                            offHandleColor="#00c89c"
                                            value={song["isActive"]}

                                          />
                                        </td>

                                        <td className="py-4 px-6 w-[150]">
                                          <Row>
                                            <Button
                                              className="font-semibold  text-center mr-[10px]"
                                              shape="RoundedBorder5"
                                              variant="OutlineTealA400"
                                            >
                                              View{" "}
                                            </Button>
                                            <Button
                                              className="inline-block rounded-[50%] items-center justify-center mr-[10px]" size="mdIcn" onClick={() => editSongHandler(song)}>
                                              <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M14.9232 4.00533L19.8053 8.91132L7.44726 21.3299L2.56787 16.4239L14.9232 4.00533ZM23.5098 2.8221L21.3325 0.634175C20.4911 -0.211392 19.1248 -0.211392 18.2805 0.634175L16.1949 2.72998L21.0771 7.63604L23.5098 5.19142C24.1624 4.53554 24.1624 3.47793 23.5098 2.8221H23.5098ZM0.0135865 23.3196C-0.0752658 23.7215 0.285767 24.0815 0.685658 23.9838L6.12599 22.6583L1.2466 17.7523L0.0135865 23.3196Z" />
                                              </svg>
                                            </Button>
                                            <Button
                                              className="inline-block rounded-[50%] items-center justify-center mr-[10px]" size="mdIcn" onClick={() => deleteSongHandler(song?.id)}>
                                              <svg aria-hidden="true" width="12" height="12" focusable="false" viewBox="0 0 8 9" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7.4455 1.3091H5.72731V0.900006C5.72731 0.402947 5.32436 0 4.8273 0H2.86366C2.3666 0 1.96365 0.402947 1.96365 0.900006V1.3091H0.24546C0.109895 1.3091 0 1.419 0 1.55456C0 1.69013 0.109895 1.80002 0.24546 1.80002H0.41892L0.932736 8.17207C0.973256 8.63809 1.3617 8.99677 1.82947 9.00007H5.8615C6.32927 8.99677 6.71771 8.63809 6.75823 8.17207L7.27206 1.80002H7.44552C7.58108 1.80002 7.69098 1.69013 7.69098 1.55456C7.69098 1.419 7.58108 1.3091 7.44552 1.3091H7.4455ZM2.45456 1.02017C2.45456 0.727863 2.63771 0.49091 2.86366 0.49091H4.8273C5.05325 0.49091 5.2364 0.727863 5.2364 1.02017V1.54943H2.45457L2.45456 1.02017ZM6.26731 8.13277C6.24871 8.3451 6.07136 8.50826 5.85822 8.50914H1.82946C1.61758 8.50659 1.44213 8.34386 1.42363 8.13277L0.899996 1.80001H6.79094L6.26731 8.13277ZM5.96764 3.5182V6.79095C5.96764 6.92652 5.73068 7.03641 5.43838 7.03641C5.14607 7.03641 4.90912 6.92652 4.90912 6.79095V3.5182C4.90912 3.38264 5.14607 3.27274 5.43838 3.27274C5.73068 3.27274 5.96764 3.38264 5.96764 3.5182ZM4.65853 3.5182V6.79095C4.65853 6.92652 4.42158 7.03641 4.12927 7.03641C3.83697 7.03641 3.60001 6.92652 3.60001 6.79095V3.5182C3.60001 3.38264 3.83697 3.27274 4.12927 3.27274C4.42158 3.27274 4.65853 3.38264 4.65853 3.5182ZM3.34943 3.5182V6.79095C3.34943 6.92652 3.11247 7.03641 2.82017 7.03641C2.52787 7.03641 2.29091 6.92652 2.29091 6.79095V3.5182C2.29091 3.38264 2.52787 3.27274 2.82017 3.27274C3.11247 3.27274 3.34943 3.38264 3.34943 3.5182Z" />
                                              </svg>

                                            </Button>
                                          </Row>
                                        </td>

                                      </tr>}


                                    </React.Fragment>
                                  );
                                }
                              )}

                              <tr>
                                <td colSpan={8}>
                                  <NoContent
                                    title="No songs available."
                                    subtext={
                                      <div className="flex flex-col items-center">
                                        <div>All your eanings data will appear here.</div>
                                        {/* <Button variant="FillTealA400" className="mt-4" icon="plus" onClick={console.log}>
                                  Create
                                </Button> */}
                                      </div>
                                    }
                                    size="small"
                                    show={songsData.length === 0} />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <Row className="justify-between items-center mt-5">
                          {songsPagination && <Text className="font-normal text-[13px] text-gray_800 w-[auto]">
                            Showing {songsPagination.currentPage}-{songsPagination.perPage} of {songsPagination.itemCount} entries
                          </Text>}

                          <Pagination
                            page={songsPagination.currentPage}
                            totalPages={songsPagination.pageCount}
                            onPageChange={(page) => setSongPage(page)}
                            limit={songsPagination.perPage}
                            debounceRequest={100} />
                        </Row>
                      </Column>
                    </TabPanel>
                    {/* Albums Tab */}
                    <TabPanel
                      key="tab-content-albums"
                      className="w-[100%]">
                      <Column className="w-[100%]">
                        <FilterBar onReset={resetFilter} pageCount={albumPageCount} filterBy={filterAlbumBy} onPageCountChange={setAlbumPageCount} onTypeChange={setAlbumFilterBy} />
                        <div className="overflow-x-auto relative">
                          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 bg-[#DAF5F1]">
                              <tr>
                                <th scope="col" className="py-3 px-6">
                                  ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Cover Image
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Album Title
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  No of Songs
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  No of Views
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  No of Purchases
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Earnings
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Active
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {albumsData?.map(
                                (album, index) => {
                                  return (
                                    <React.Fragment
                                      key={`album${index}`}>
                                      {<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                          {index}
                                        </th>
                                        <td className="py-4 px-6">
                                          <Img
                                            src={album?.artwork != null ? `${URL}${album?.artwork}` : "images/noImage.svg"}
                                            className="w-[50px]"
                                            alt="avatar" />
                                        </td>
                                        <td className="py-4 px-6">
                                          {album["name"]}
                                        </td>
                                        <td className="py-4 px-6">
                                          {album["songCount"]}
                                        </td>
                                        <td className="py-4 px-6">
                                          N/A
                                        </td>
                                        <td className="py-4 px-6">
                                          N/A
                                        </td>
                                        <td className="py-4 px-6">
                                          0 KES
                                        </td>
                                        <td className="py-4 px-6">
                                          <Switch
                                            onColor="#E2FBF3"
                                            offColor="#E2FBF3"
                                            onHandleColor="#00c89c"
                                            offHandleColor="#00c89c"
                                            value={album["isActive"]}
                                            className="w-[auto]"
                                          />
                                        </td>

                                        <td className="py-4 px-6 w-[150]">
                                          <Row>
                                            <Button
                                              className="font-semibold  text-center mr-[10px]"
                                              shape="RoundedBorder5"
                                              variant="OutlineTealA400"
                                            >
                                              View{" "}
                                            </Button>
                                            <Button
                                              className="inline-block rounded-[50%] items-center justify-center mr-[10px]" size="mdIcn" onClick={() => editAlbumHandler(album)}>
                                              <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M14.9232 4.00533L19.8053 8.91132L7.44726 21.3299L2.56787 16.4239L14.9232 4.00533ZM23.5098 2.8221L21.3325 0.634175C20.4911 -0.211392 19.1248 -0.211392 18.2805 0.634175L16.1949 2.72998L21.0771 7.63604L23.5098 5.19142C24.1624 4.53554 24.1624 3.47793 23.5098 2.8221H23.5098ZM0.0135865 23.3196C-0.0752658 23.7215 0.285767 24.0815 0.685658 23.9838L6.12599 22.6583L1.2466 17.7523L0.0135865 23.3196Z" />
                                              </svg>
                                            </Button>
                                            <Button
                                              className="inline-block rounded-[50%] items-center justify-center mr-[10px]" size="mdIcn" onClick={() => deleteAlbumHandler(album?.id)}>
                                              <svg aria-hidden="true" width="12" height="12" focusable="false" viewBox="0 0 8 9" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M7.4455 1.3091H5.72731V0.900006C5.72731 0.402947 5.32436 0 4.8273 0H2.86366C2.3666 0 1.96365 0.402947 1.96365 0.900006V1.3091H0.24546C0.109895 1.3091 0 1.419 0 1.55456C0 1.69013 0.109895 1.80002 0.24546 1.80002H0.41892L0.932736 8.17207C0.973256 8.63809 1.3617 8.99677 1.82947 9.00007H5.8615C6.32927 8.99677 6.71771 8.63809 6.75823 8.17207L7.27206 1.80002H7.44552C7.58108 1.80002 7.69098 1.69013 7.69098 1.55456C7.69098 1.419 7.58108 1.3091 7.44552 1.3091H7.4455ZM2.45456 1.02017C2.45456 0.727863 2.63771 0.49091 2.86366 0.49091H4.8273C5.05325 0.49091 5.2364 0.727863 5.2364 1.02017V1.54943H2.45457L2.45456 1.02017ZM6.26731 8.13277C6.24871 8.3451 6.07136 8.50826 5.85822 8.50914H1.82946C1.61758 8.50659 1.44213 8.34386 1.42363 8.13277L0.899996 1.80001H6.79094L6.26731 8.13277ZM5.96764 3.5182V6.79095C5.96764 6.92652 5.73068 7.03641 5.43838 7.03641C5.14607 7.03641 4.90912 6.92652 4.90912 6.79095V3.5182C4.90912 3.38264 5.14607 3.27274 5.43838 3.27274C5.73068 3.27274 5.96764 3.38264 5.96764 3.5182ZM4.65853 3.5182V6.79095C4.65853 6.92652 4.42158 7.03641 4.12927 7.03641C3.83697 7.03641 3.60001 6.92652 3.60001 6.79095V3.5182C3.60001 3.38264 3.83697 3.27274 4.12927 3.27274C4.42158 3.27274 4.65853 3.38264 4.65853 3.5182ZM3.34943 3.5182V6.79095C3.34943 6.92652 3.11247 7.03641 2.82017 7.03641C2.52787 7.03641 2.29091 6.92652 2.29091 6.79095V3.5182C2.29091 3.38264 2.52787 3.27274 2.82017 3.27274C3.11247 3.27274 3.34943 3.38264 3.34943 3.5182Z" />
                                              </svg>

                                            </Button>
                                          </Row>
                                        </td>

                                      </tr>}
                                    </React.Fragment>
                                  );
                                }
                              )}

                              <tr>
                                <td colSpan={9}>
                                  <NoContent
                                    title="No albums available."
                                    subtext={
                                      <div className="flex flex-col items-center">
                                        <div>All your albums data will appear here.</div>
                                        {/* <Button variant="FillTealA400" className="mt-4" icon="plus" onClick={console.log}>
                                  Create
                                </Button> */}
                                      </div>
                                    }
                                    size="small"
                                    show={albumsData.length === 0} />
                                </td>
                              </tr>

                            </tbody>
                          </table>
                        </div>

                        <Row className="justify-between items-center mt-5">
                          {albumsPagination && <Text className="font-normal text-[13px] text-gray_800 w-[auto]">
                            Showing {albumsPagination.currentPage}-{albumsPagination.perPage} of {albumsPagination.itemCount} entries
                          </Text>}

                          <Pagination
                            page={albumsPagination.currentPage}
                            totalPages={albumsPagination.pageCount}
                            onPageChange={(page) => setAlbumPage(page)}
                            limit={albumsPagination.perPage}
                            debounceRequest={100} />
                        </Row>
                      </Column>
                    </TabPanel>
                  </div>
                </Tabs>
              </Column>
            </main>
          </div>
        </Row>
      </Column>

      <ToastContainer hideProgressBar autoClose={3000} />
      {isOpenAddSongModal ? (
        <AddSongModal
          isOpen={isOpenAddSongModal}
          onRequestClose={handleCloseAddSongModal}
        />
      ) : null}

      {isOpenAddAlbumModal ? (
        <AddAlbumModal
          isOpen={isOpenAddAlbumModal}
          onRequestClose={handleCloseAddAlbumModal}
          onRequestProceed={handleOpenAddSongsToAlbumModal}
        />
      ) : null}

      {isOpenEditSongModal ? (
        <EditSongModal
          isOpen={isOpenEditSongModal}
          song={editSong}
          onRequestClose={handleCloseEditSongModal}
        />
      ) : null}

      {isOpenEditAlbumModal ? (
        <EditAlbumModal
          isOpen={isOpenEditAlbumModal}
          album={editAlbum}
          onRequestClose={handleCloseEditAlbumModal}
        />
      ) : null}

      {isOpenAlbumSongsModal ? (
        <AddSongsToAlbumModal
          isOpen={isOpenAlbumSongsModal}

          onRequestClose={handleCloseAddSongsToAlbumModal}
        />
      ) : null}
    </>
  );
};

export default MusicPage;
