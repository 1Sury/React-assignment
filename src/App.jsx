import React, { useState, useEffect } from "react";
import { Layout, Button, Form, Input, Space, notification } from "antd";
import { useSpring, animated } from "react-spring";
import RichTextEditor from "./RichTextEditor";
import "antd/dist/reset.css";
import "./App.css"; // Import the CSS file we created

const { Header, Content, Footer } = Layout;

const App = () => {
  const [count, setCount] = useState(0);
  const [form] = Form.useForm();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [userData, setUserData] = useState("");

  // Animation for the background bars
  const barAnimation = useSpring({
    from: { height: "0px" },
    to: { height: "4px" },
    config: {
      tension: 120,
      friction: 14,
    },
  });

  // Save counter to localStorage
  useEffect(() => {
    localStorage.setItem("counterValue", count);
  }, [count]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const backgroundAnimation = useSpring({
    height: `${Math.min(100, count * 5)}%`, // Increases linearly
    background: "linear-gradient(to top, #1890ff, #722ed1)",
    config: { tension: 120, friction: 14 },
  });

  const darkCardStyle = {
    background: "#1f1f1f",
    border: "1px solid #333",
    borderRadius: "8px",
    marginBottom: "20px",
    overflow: "hidden",
    padding: "16px",
    textAlign: "center",
  };

  const darkButtonStyle = {
    background: "#333",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    flex: 1, // Makes buttons equally wide
    padding: "12px",
  };
  const darkInputStyle = {
    background: "#2f2f2f",
    border: "1px solid #666",
    color: "#fff",
  };

  return (
    <Layout
      className="custom-layout"
      style={{
        background: "#141414",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Header
        style={{
          background: "#141414",
          padding: "10px",
          textAlign: "center",
          color: "#fff",
          fontSize: "24px",
          fontWeight: "bold",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000, // Ensures it stays on top
        }}
      >
        React Assignment{" "}
      </Header>{" "}
      <Content style={{ marginTop: "60px" }}>
        <div
          className="grid-container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Counter Section */}{" "}
          <div style={darkCardStyle}>
            <animated.div
              style={{
                ...backgroundAnimation,
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 0,
              }}
            />{" "}
            <div className="card-header" style={{ fontSize: "20px" }}>
              COUNTER{" "}
            </div>{" "}
            <div
              className="card-content"
              style={{ position: "relative", zIndex: 1 }}
            >
              <h2
                style={{ margin: "10px 0", fontSize: "36px", color: "white" }}
              >
                {" "}
                {count}{" "}
              </h2>{" "}
              <Space
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "8px",
                }}
              >
                <Button
                  style={darkButtonStyle}
                  onClick={() => setCount((c) => Math.max(0, c - 1))}
                >
                  -
                </Button>{" "}
                <Button style={darkButtonStyle} onClick={() => setCount(0)}>
                  Reset{" "}
                </Button>{" "}
                <Button
                  style={darkButtonStyle}
                  onClick={() => setCount((c) => c + 1)}
                >
                  +
                </Button>{" "}
              </Space>{" "}
            </div>{" "}
          </div>{" "}
          {/* Rich Text Editor Section */}{" "}
          <div style={darkCardStyle}>
            <div className="card-header"> RICH TEXT EDITOR </div>{" "}
            <div className="card-content">
              <RichTextEditor
                userData={userData}
                onSave={(content) => {
                  console.log("Content saved:", content);
                }}
              />{" "}
            </div>{" "}
          </div>{" "}
          {/* User Data Form Section */}{" "}
          <div style={darkCardStyle}>
            <div className="card-header"> USER DATA FORM </div>{" "}
            <div className="card-content">
              <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                  const newUserData = {
                    id: `USER_${Math.random().toString(36).substr(2, 9)}`,
                    ...values,
                  };
                  localStorage.setItem("userData", JSON.stringify(newUserData));
                  setUserData(JSON.stringify(newUserData, null, 2));
                  setHasUnsavedChanges(false);
                  notification.success({
                    message: "Saved",
                    description: "User data saved successfully!",
                    theme: "dark",
                  });
                }}
                onValuesChange={() => setHasUnsavedChanges(true)}
              >
                <Form.Item
                  name="name"
                  label={<span style={{ color: "#fff" }}> Name </span>}
                >
                  <Input style={darkInputStyle} />{" "}
                </Form.Item>{" "}
                <Form.Item
                  name="id"
                  label={
                    <span style={{ color: "#fff" }}> ID(autogenerated) </span>
                  }
                >
                  <Input style={darkInputStyle} disabled />
                </Form.Item>{" "}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: "#1890ff" }}
                  >
                    Save{" "}
                  </Button>{" "}
                </Form.Item>{" "}
              </Form>{" "}
            </div>{" "}
          </div>{" "}
          {/* Address Form Section */}{" "}
          <div style={darkCardStyle}>
            <div className="card-header"> CONTACT INFORMATION </div>{" "}
            <div className="card-content">
              <Form
                layout="vertical"
                onFinish={(values) => {
                  notification.success({
                    message: "Saved",
                    description: "Contact information saved!",
                    theme: "dark",
                  });
                }}
              >
                <Form.Item
                  name="address"
                  label={<span style={{ color: "#fff" }}> Address </span>}
                >
                  <Input style={darkInputStyle} />{" "}
                </Form.Item>{" "}
                <Form.Item
                  name="email"
                  label={<span style={{ color: "#fff" }}> Email </span>}
                >
                  <Input style={darkInputStyle} />{" "}
                </Form.Item>{" "}
                <Form.Item
                  name="phone"
                  label={<span style={{ color: "#fff" }}> Phone </span>}
                >
                  <Input style={darkInputStyle} />{" "}
                </Form.Item>{" "}
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: "#1890ff" }}
                  >
                    Save{" "}
                  </Button>{" "}
                </Form.Item>{" "}
              </Form>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Animated bars at bottom */}{" "}
        <animated.div
          className="animated-bar"
          style={{
            ...barAnimation,
            background: "linear-gradient(90deg, #1890ff 0%, #722ed1 100%)",
            marginTop: "20px",
          }}
        />{" "}
        <animated.div
          className="animated-bar"
          style={{
            ...barAnimation,
            background: "linear-gradient(90deg, #722ed1 0%, #1890ff 100%)",
            marginTop: "4px",
          }}
        />{" "}
      </Content>{" "}
      {/* New Footer Component */}{" "}
      <Footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4> About Us </h4>{" "}
            <p>
              {" "}
              Modern React dashboard with dark theme and interactive components{" "}
            </p>{" "}
          </div>{" "}
          <div className="footer-section">
            <h4> Contact </h4> <p> shubhanshiexample123@gmail.cpm</p>{" "}
            <p> +91 000 0000 0000 </p>{" "}
          </div>{" "}
          <div className="footer-section">
            <h4> Links </h4>{" "}
            <ul className="footer-links">
              <li>
                {" "}
                <a href="#"> Documentation </a>{" "}
              </li>{" "}
              <li>
                {" "}
                <a href="#"> Privacy Policy </a>{" "}
              </li>{" "}
              <li>
                {" "}
                <a href="#"> Terms of Service </a>{" "}
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
        <div className="footer-bottom">
          <p>
            {" "}
            © {new Date().getFullYear()}
            Shubhanshi 's Assignment. All rights reserved.{" "}
          </p>{" "}
        </div>{" "}
      </Footer>{" "}
    </Layout>
  );
};

export default App;
