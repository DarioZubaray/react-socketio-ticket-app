import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { EnterPage } from "./EnterPage";
import { QueuePage } from "./QueuePage";
import { CreateTicketPage } from "./CreateTicketPage";
import { DesktopPage } from "./DesktopPage";
import { UiContext } from "../context/UiContext";

const { Content, Sider } = Layout;

export const RouterPage = () => {
  const { menu } = useContext(UiContext);
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider hidden={menu} collapsedWidth={0} breakpoint="md">
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>

            <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/enter">Enter</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/queue">Queue</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
                <Link to="/create-ticket">Create Ticket</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >

            <Switch>
                <Route path="/enter" component={EnterPage} />
                <Route path="/queue" component={QueuePage} />
                <Route path="/create-ticket" component={CreateTicketPage} />
                <Route path="/desktop" component={DesktopPage} />

                <Redirect to="/enter" />
            </Switch>

          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
