import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { getConfiguration, resetPassword } from "../api/Apicall";
import config from "../api/config.json";
// import image from "../assets/logo.png";
import uiConfig from "../assets/ui-config/homeConfig.json";
import themeConfig from "../assets/ui-config/themeConfig.json";
import styles from "./header.module.css";

function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [resetModal, setresetModal] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [configData, setConfigData] = useState({});
  const isHomeRoute = location.pathname === "/";
  const isCollectionsRoute = location.pathname.includes("/collections");
  const isMyBookmarksRoute = location.pathname.includes("/myBookmarks");
  const profile = location.pathname.includes("/config");
  const myLocalBookMarks = location.pathname.includes("/bookmarks");
  let token = localStorage.getItem("token");
  let userName = localStorage.getItem("userName");
  let configDatas = localStorage.getItem("config");
  let localData = JSON.parse(configDatas);
  let configuredData = config;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const result = await resetPassword(data);

    if (result?.data?.update_User_by_pk) {
      setresetModal(false);
      reset();
    } else {
      alert(result?.error);
    }
  };

  useEffect(() => {
    const getCongif = async () => {
      let response = await getConfiguration();
      setConfigData(response);
      localStorage.setItem("config", JSON.stringify(response));
    };
    getCongif();
  }, []);

  const myHome = () => {
    navigate("/");
  };

  const myCollections = () => {
    navigate("/collections");
  };
  const myBookmarks = () => {
    navigate("/myBookMarks");
  };

  const handleNavigation = (page) => {
    navigate(page); // Adjust the route accordingly
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const myLocalBookmark = () => {
    navigate("/bookMarks");
  };
  return (
    <div
      className={styles.headerDiv}
      style={{
        backgroundColor: configuredData?.headerColor
          ? configuredData?.headerColor
          : themeConfig?.primaryColor,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
            fontFamily: "auto",
            fontSize: "20px",
          }}
        >
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <img
              style={{ height: "50px", width: "300px" }}
              onClick={() => navigate("/")}
              // src={image}
              alt="Logo"
            />
          </div>

          {/* <Box  marginLeft={2} style={{ width: "80%", textAlign: "left", color: "#3182ce" }}>
            <strong
              style={{ fontSize: configuredData?.headerFontSize || "15px" }}
            >
              {configuredData?.siteName
                ? configuredData?.siteName
                : t("welcome")}{" "}
              <br />
            </strong>
          </Box> */}
        </div>

        <div
          style={{
            marginTop: "15px",
            paddingRight: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "flex-end",
              gap: "8px",
              margin: "0 15px",
              marginBottom: "50px",
            }}
          >
            <button
              style={{ color: themeConfig?.primaryColor }}
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
            </button>{" "}
            <Select
              style={{
                color: themeConfig?.primaryColor,
                backgroundColor: "white",
                fontSize: "14px",
              }}
              defaultValue={i18n.language}
              onChange={(event) => i18n.changeLanguage(event.target.value)}
              placeholder=""
            >
              {uiConfig?.headers?.languages.map((langOption) => {
                const code = Object.keys(langOption)[0];
                const name = langOption[code];
                return (
                  <option key={code} value={code}>
                    {name}
                  </option>
                );
              })}
            </Select>
            {/* Menu Button */}
            <Menu>
              <MenuButton
                as={Box}
                cursor="pointer"
                color={themeConfig?.primaryColor}
                background={"#edf2f7"}
                fontSize={25}
                borderRadius="md"
                paddingX={2}
                paddingY={2}
              >
                <HiOutlineMenu />
              </MenuButton>
              <MenuList>
                {uiConfig?.headers?.menus.map((menuItem, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleNavigation(menuItem.navigateTo)}
                  >
                    {t(menuItem.label)}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
