import {fetchProfile} from "Service/api";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Column,
  Row,
  SideBar,
} from "Components";
import styles from './ProfileSettings/profileSettings.module.css';
import PageTitle from "App/components/PageTitle";
import Settings from "./ProfileSettings/Settings";
import ChangePassword from "./ProfileSettings/ChangePassword";
import withPageTitle from "App/hoc/withPageTitle";

class AccountPage extends React.Component {

  state = {
    account: {}
  }

  componentDidMount() {
    fetchProfile()
    .then(response => response.data)
      .then((account) => {
        this.setState({account: account}) ;

       
      })
      .catch((err) => {
        console.error(err);
        toast.error("try again later");
      });
  }


  render() {
    const {account} = this.state;
    return (
      <>
      <Column className="bg-white_A700 font-poppins min-h-screen">
          <Row className="flex-grow flex-row min-h-[50vh]">
            <SideBar />
            <div className="w-full max-w-screen px-12 md:px-12 my-6">
            <header className="w-full">
            <PageTitle title={<div>Account</div>} />
            </header>
            <main id="main" className="flex flex-col space-y-3 items-start flex-grow">
            <Column className="bg-gray_50 justify-center mt-[14px] p-[26px] rounded-radius12 w-full">
            <div className="p-5">
                
                <div className="flex items-center">
                    <div className={styles.left}>
                        <h4 className="text-lg mb-4">{'Profile'}</h4>
                        <div className={styles.info}>{'Your settings'}</div>
                    </div>
                    <div>
                        <Settings account={account} />
                    </div>
                </div>

                <div className="border-b my-10" />
                    <div className="flex items-center">
                        <div className={styles.left}>
                            <h4 className="text-lg mb-4">{'Change Password'}</h4>
                            <div className={styles.info}>{'Updating your password from time to time enhances your account’s security.'}</div>
                        </div>
                        <div>
                            <ChangePassword />
                        </div>
                    </div>

                    <div className="border-b my-10" />
            </div>
              </Column>
            </main>
            </div>
          </Row>
      </Column>
      <ToastContainer hideProgressBar autoClose={3000} />
    </>
    );
  }
}

export default withPageTitle("Solution - Settings")(AccountPage);