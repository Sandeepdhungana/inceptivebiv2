import React from "react";
import { Layout, Typography } from "antd";
import "./WelcomeBar.css";
import { LuClock2 } from "react-icons/lu";
import { useAuthenticator } from "@aws-amplify/ui-react";

const { Header } = Layout;
const { Title, Text } = Typography;

const WelcomeBar = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <Header className="welcome-bar">
      <>
        <Title level={1} className="welcome-title">
          <p className="wlcm">Welcome</p>&nbsp; <p> {user.username}!</p>
        </Title>

        <Text className="last-logged">
          <span className="log-icon">
            <LuClock2 />
          </span>
          <span className="last-logged-text">Last Logged in:</span>
          <span className="logged-in-details">
            September 1st 2024, 8:18:11 pm
          </span>
        </Text>
      </>
    </Header>
  );
};

export default WelcomeBar;
