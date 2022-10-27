import React from 'react';
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from "react-toastify";
import { uploadFile, URL } from 'Service/api';
import { Avatar, Button, Form, Icon } from 'Components';
import { updateProfile } from 'Service/api';
import styles from './profileSettings.module.css';
import PhoneInput from 'react-phone-number-input';

export default class Settings extends React.Component {

  state = {
    ...this.props.account,
    loading: false
  }

  avatarRef = React.createRef();

  componentDidUpdate(oldProps) {
    // By duplicating the data, you have to then
    // keep the local copy in sync with the
    // updated props...
    if (oldProps.account !== this.props.account) {
      // This triggers an unnecessary re-render
      this.setState({
        ...this.props.account
      });
    }
  }

  handleAvatarUpload = (event) => {
    const fileToUpload = event.target.files[0];

    const req = {
      data: { files: fileToUpload },
    };

    uploadFile(req)
      .then((res) => {
        this.setState({ changed: true, avatar: res?.data?.uploadFileRes?.data?.uploadSuccess[0].path });

        toast.success(res?.data?.uploadFileRes?.message);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Try again later.");
      });
  };

  updateAvatar = () => {
    this.avatarRef.current.click();
  }

  onChange = ({ target: { value, name } }) => {
    this.setState({ changed: true, [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, nationalId, username, mobileNo, avatar } = this.state;

    const res = {
      data: {
        ...(name !== this.props.name && { name: name }),
        ...(email !== this.props.email && { name: email }),
        ...(nationalId !== this.props.nationalId && { nationalId: nationalId }),
        ...(username !== this.props.username && { username: username }),
        ...(mobileNo !== this.props.mobileNo && { mobileNo: mobileNo }),
        ...(avatar !== this.props.avatar && { avatar: avatar }),
      }
    }

    updateProfile(res).then(() => this.setState({ changed: false }));

  }

  render() {
    console.log(this.props, this.state);
    const { name, email, mobileNo, nationalId, avatar, username, copied, loading, changed } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <div className='flex flex-col space-y-3 items-center flex-grow'>
          <Avatar name={name} imageSrc={avatar == null ? "" : URL + avatar} size={100} onClick={this.updateAvatar}>
            <Icon name='camera-alt' className='flex items-center justify-center' size={18} style={{
              width: '32px',
              height: '32px',
              position: 'absolute',
              zIndex: 1,
              background: 'white',
              borderRadius: '50%',
              textAlign: 'center',
              right: '5px',
              bottom: '5px'
            }} />
            <input hidden={true} name="artwork" ref={this.avatarRef} onChange={this.handleAvatarUpload} accept="image/*" type="file" autoComplete="off" tabIndex="-1" />
          </Avatar>
        </div>
        <Form.Field>
          <label htmlFor="name">{'Name'}</label>
          <Form.Input
            name="name"
            id="name"
            type="text"
            onChange={this.onChange}
            value={name} />
        </Form.Field>

        <Form.Field>
          <label htmlFor="email">{'Email'}</label>
          <Form.Input
            name="email"
            id="email"
            type="text"
            onChange={this.onChange}
            value={email} />
        </Form.Field>

        <Form.Field>
          <label htmlFor="mobileNo">{'Mobile Number'}</label>

          <PhoneInput
            className="outline outline-[1px] rounded-radius5 outline-bluegray_100"
            placeholder="Enter phone number"
            readOnly={true}
            value={mobileNo} />

        </Form.Field>

        <Form.Field>
          <label htmlFor="nationalId">{'National ID'}</label>
          <Form.Input
            name="nationalId"
            id="nationalId"
            type="text"
            onChange={this.onChange}
            value={nationalId} />
        </Form.Field>

        <Form.Field>
          <label htmlFor="username">{'Username'}</label>
          <Form.Input
            name="username"
            id="username"
            type="text"
            onChange={this.onChange}
            value={username} />
        </Form.Field>

        <Button variant="FillTealA400" size="md" disabled={!changed} type="submit">{'Update'}</Button>
      </Form>
    );
  }
}
