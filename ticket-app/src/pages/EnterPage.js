import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Typography, Divider } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { Redirect, useHistory } from "react-router";
import { useMenu } from "../hooks/useMenu";
import { getUserStorage } from "../helpers/getUserStorage";

const { Title, Text } = Typography;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

export const EnterPage = () => {
  useMenu(true);

  const history = useHistory();
  const [ user ] = useState( getUserStorage() );

  if (user.agent && user.desktop) {
    return <Redirect to="/desktop" />
  }

  const onFinish = ({ agent, desktop}) => {
    localStorage.setItem('agent', agent);
    localStorage.setItem('desktop', desktop);
    history.push("/desktop");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Title level={2}>Login</Title>
      <Text>Enter your name and desktop number</Text>
      <Divider />
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Agent"
          name="agent"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desktop"
          name="desktop"
          rules={[
            { required: true, message: "Please input your desktop number!" },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Enter
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
