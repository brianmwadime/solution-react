import React from 'react';
import { Button, Message, Form, Input } from 'Components';
import styles from './profileSettings.module.css';
import { updatePassword } from 'Service/api';

const ERROR_DOESNT_MATCH = "Passwords doesn't match";
const MIN_LENGTH = 8;
const PASSWORD_POLICY = `Password should contain at least ${MIN_LENGTH} symbols`;
const checkDoesntMatch = (newPassword, newPasswordRepeat) => newPasswordRepeat.length > 0 && newPasswordRepeat !== newPassword;

const defaultState = {
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
    passwordRequestError: false,
    passwordErrors: [],
    loading: false,
    success: false,
    show: false,
};

export default class ChangePassword extends React.PureComponent {
    state = defaultState;

    write = ({ target: { name, value } }) => {
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.isSubmitDisabled()) return;

        const { oldPassword, newPassword } = this.state;
        this.setState({
            success: false,
        });

        updatePassword({
            oldPassword,
            newPassword,
        })
            .then(() => {
                if (this.props.passwordErrors.size === 0) {
                    this.setState({
                        ...defaultState,
                        success: true,
                    });
                }
            });
    };

    isSubmitDisabled() {
        const { oldPassword, newPassword, newPasswordRepeat } = this.state;
        if (newPassword !== newPasswordRepeat || newPassword.length < MIN_LENGTH || oldPassword.length < MIN_LENGTH) return true;
        return false;
    }

    render() {
        const { loading, oldPassword, newPassword, newPasswordRepeat, passwordErrors, success, show } = this.state;

        const doesntMatch = checkDoesntMatch(newPassword, newPasswordRepeat);
        return show ? (
            <Form onSubmit={this.handleSubmit} className={styles.form}>
                <Form.Field>
                    <label htmlFor="oldPassword">{'Old Password: '}</label>
                    <Input
                        // label="Old Password: "
                        id="oldPassword"
                        name="oldPassword"
                        value={oldPassword}
                        type="password"
                        // error={ wrongPassword }
                        onChange={this.write}
                    />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="newPassword">{'New Password: '}</label>
                    <Input id="newPassword" name="newPassword" value={newPassword} type="password" onChange={this.write} />
                    <div className={styles.passwordPolicy}>{PASSWORD_POLICY}</div>
                </Form.Field>
                <Form.Field>
                    <label htmlFor="newPasswordRepeat">{'Repeat New Password: '}</label>
                    <Input id="newPasswordRepeat" name="newPasswordRepeat" value={newPasswordRepeat} type="password" onChange={this.write} />
                </Form.Field>
                {passwordErrors.map((err) => (
                    <Message error>{err}</Message>
                ))}
                <Message error hidden={!doesntMatch}>
                    {ERROR_DOESNT_MATCH}
                </Message>
                <div className="flex items-center">
                    <Button type="submit" variant="FillTealA400" disabled={this.isSubmitDisabled()} loading={loading}>
                        Change Password
                    </Button>

                    <Button className="ml-2" onClick={() => this.setState(defaultState)}>
                        Cancel
                    </Button>
                </div>
                <Message success hidden={!success}>
                    {'Successfully changed the password!'}
                </Message>
            </Form>
        ) : (
            <div onClick={() => this.setState({ show: true })}>
                <Button variant="FillTealA400">Change Password</Button>
            </div>
        );
    }
}
