import React from 'react';
import copy from 'copy-to-clipboard';
import { Button, Form } from 'Components';
import { updateProfile } from 'Service/api';
import styles from './profileSettings.module.css';

export default class Settings extends React.Component {

  state = {
    ...this.props.account,
    loading: false
  }

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

  onChange = ({ target: { value, name } }) => {
    this.setState({ changed: true, [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, nationalId, username } = this.state;
    // const promises = [];

    const res = {
      data: {
        ...(name !== this.props.name && { name: name }),
        ...(email !== this.props.email && { name: email }),
        ...(nationalId !== this.props.nationalId && { nationalId: nationalId }),
        ...(username !== this.props.username && { username: username }),
      }
    }

    updateProfile(res).then(() => this.setState({ changed: false }));

    // if (name !== this.props.name) {
    //   promises.push();
    // }

    // Promise.all(promises)
    //   .then(() => this.setState({ changed: false }));
  }

  render() {
    console.log(this.props, this.state);
    const { name, email, mobileNo, nationalId, username, copied, loading, changed } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
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
          <Form.Input
            name="mobileNo"
            id="mobileNo"
            type="text"
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
