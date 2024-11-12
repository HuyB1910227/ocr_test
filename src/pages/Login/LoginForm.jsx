import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './LoginStyle.css';
import 'antd/dist/reset.css';
import accountsData from '../../../database/accountAPI/accounts.json';

const LoginForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onLogin = async (values) => {
        try {
            const user = accountsData.find(
                (account) =>
                    (account.email === values.username ||
                        account.username === values.username) &&
                    account.password === values.password
            );

            if (user) {
                message.success('Login successful!');
                navigate('/');
            } else {
                message.error('Invalid username or password');
            }
        } catch (error) {
            message.error('Login failed. Please try again.');
        }
    };

    const handleLoginGoogle = () => {
        // Implement your Google login logic here
        message.success('Login with Google successful!');
    };

    const handleLoginMicrosoft = () => {
        // Implement your Microsoft login logic here
        message.success('Login with Microsoft successful!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card style={{ width: '600px' }} className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-left mb-8">Login</h2>

                <Form
                    form={form}
                    name="login"
                    onFinish={onLogin}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <div>
                            <span className="text-gray-700 font-semibold mb-1 block">
                                Email
                            </span>
                            <Input
                                prefix={
                                    <UserOutlined className="text-gray-400" />
                                }
                                placeholder="bestarion@gmail.com"
                                size="large"
                            />
                        </div>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <div>
                            <span className="text-gray-700 font-semibold mb-1 block">
                                Password
                            </span>
                            <Input.Password
                                prefix={
                                    <LockOutlined className="text-gray-400" />
                                }
                                placeholder="**********"
                                size="large"
                            />
                        </div>
                    </Form.Item>

                    <div className="text-right mb-4">
                        <span className="text-gray-600">
                            Forgot your password?{' '}
                        </span>
                        <a
                            href="/login/reset"
                            className="text-orange-400 hover:text-orange-500"
                        >
                            Reset Password
                        </a>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full custom-button-orange"
                            size="large"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default LoginForm;
