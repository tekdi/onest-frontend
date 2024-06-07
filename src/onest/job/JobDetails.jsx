import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useTranslation } from "react-i18next";
// import { FaBriefcase, FaRupeeSign } from "react-icons/fa";
// import { MdLocationPin } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import Header from "./Header";
import { dataConfig } from "../card";
import Loader from "./Loader";
import OrderSuccessModal from "./OrderSuccessModal";
import "./Shared.css";

function JobDetails() {
  const { type } = useParams();

  const baseUrl = dataConfig[type].apiLink_API_BASE_URL;
  const db_cache = dataConfig[type].apiLink_DB_CACHE;
  const envConfig = dataConfig[type];

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const state = location?.state;
  const [showIframe, setShowIframe] = useState(true);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [jobInfo, setJobInfo] = useState(state?.product);
  const [jobsData, setJobsData] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const { jobId } = useParams();
  const [siteUrl, setSiteUrl] = useState(window.location.href);
  const [listData, setListData] = useState([]);
  const [status, setStatus] = useState("Applied");
  const [openModal, setOpenModal] = useState(false);

  let [transactionId, settransactionId] = useState(state?.transactionId);

  const toast = useToast();

  const closeModal = () => {
    setOpenModal(false);
    navigate("/");
  };

  const errorMessage = (message) => {
    toast({
      duration: 5000,
      isClosable: true,
      status: "error",
      position: "bottom-left",
      render: () => (
        <Alert w="100%" status="error" variant="solid">
          <HStack space={2} alignItems="left">
            <AlertIcon />
            <Text>{message}</Text>
          </HStack>
        </Alert>
      ),
    });
  };

  const fetchJobDetails = async (jobInfo) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/select`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: {
            domain: envConfig?.apiLink_DOMAIN,
            action: "select",
            version: "1.1.0",
            bap_id: envConfig.apiLink_BAP_ID,
            bap_uri: envConfig.apiLink_BAP_URI,
            bpp_id: jobInfo?.bpp_id,
            bpp_uri: jobInfo?.bpp_uri,
            transaction_id: transactionId,
            message_id: uuidv4(),
            timestamp: new Date().toISOString(),
          },
          message: {
            order: {
              provider: {
                id: jobInfo?.provider_id,
              },
              items: [
                {
                  id: jobId,
                },
              ],
            },
          },
        }),
      });

      const data = await response.json();
      data["context"]["message_id"] = transactionId;
      setJobDetails(data);
      setJobsData(data?.responses[0]?.message?.order?.items[0]);
      localStorage.setItem("selectRes", JSON.stringify(data));
      if (!data?.responses.length) {
        errorMessage(
          t("Delay_in_fetching_the_details") + "(" + transactionId + ")"
        );
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(window.location.href);
    const url = window.location.href;

    const getUrlParams = (url) => {
      const params = {};
      const parser = document.createElement("a");
      parser.href = url;
      const query = parser.search.substring(1);
      const vars = query.split("&");
      for (const pair of vars) {
        const [key, value] = pair.split("=");
        params[key] = decodeURIComponent(value);
      }
      return params;
    };

    const params = getUrlParams(url);

    if (params["agent-id"]) {
      localStorage.setItem("agent-id", params["agent-id"]);
    }

    if (params["distributor-name"]) {
      localStorage.setItem("distributor-name", params["distributor-name"]);
    }

    if (params["utm_source"]) {
      localStorage.setItem("utm_source", params["utm_source"]);
    }

    const jsonData = {
      name: "Alice Joy",
      gender: "Female",
      phone: "9877665544",
      email: "alice@gmail.com",
      "Education Qualification": "BE",
      "Work Experience": "4",
      "Are you really interested in applying for the job and working for this job": true,
    };

    const jsonString = JSON.stringify(jsonData);
    const jsonQueryParam = btoa(jsonString);

    const urlTmp = `${window.location.origin}?jsonData=${jsonQueryParam}`;
    console.log({ urlTmp });

    const urlParams = new URLSearchParams(window.location.search);
    const jsonDataParam = urlParams.get("jsonData");

    if (jsonDataParam) {
      let jsonData = atob(jsonDataParam);
      // let jsonData = decodeURIComponent(jsonDataParam);
      console.log("Parsed JSON data:", jsonData);
      localStorage.setItem("userData", jsonData);
    }
  }, []);

  function encodeJsonToQueryParam(jsonData) {
    return encodeURIComponent(JSON.stringify(jsonData));
  }

  useEffect(() => {
    if (transactionId === undefined) {
      settransactionId(uuidv4()); // Update state only when necessary
    } else {
      //registerTelementry(siteUrl, transactionId);

      // ReactGA.pageview(window.location.pathname + window.location.search);
      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: jobId }),
      };

      fetch(`${baseUrl}/jobs/search`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          result = JSON.parse(result);
          setJobInfo(result?.data[db_cache][0]);
          fetchJobDetails(result?.data[db_cache][0]);
        })
        .catch((error) => console.log("error", error));
    }
  }, [transactionId]); // Runs only once when the component mounts

  return (
    <div>
      {/* <Header /> */}

      <Box
        fontFamily={"Alice"}
        marginTop={100}
        padding={4}
        borderRadius={15}
        backgroundColor={"white"}
        marginLeft={4}
        marginRight={4}
      >
        <Box>
          <Text marginLeft={1} fontSize={["xl", "2xl", "3xl"]}>
            {jobInfo?.provider_name}
          </Text>
          {jobInfo?.title && (
            <Text
              color="gray.700"
              marginTop={"3"}
              fontWeight={600}
              marginLeft={1}
              fontSize={["sm", "md"]}
            >
              {jobInfo?.title}
            </Text>
          )}
          {jobInfo?.company && (
            <Text
              color="gray.700"
              marginTop={"2"}
              marginLeft={1}
              fontSize={["sm", "md"]}
            >
              {jobInfo?.company}
            </Text>
          )}
          <HStack marginTop={"1"} marginLeft={1}>
            {(jobInfo?.city || jobInfo?.state) && (
              <div style={{ display: "flex" }}>
                {/* <Icon
                  as={MdLocationPin}
                  boxSize={4}
                  marginTop={1}
                  marginRight={1}
                />{" "} */}
                <Text fontSize={["xs", "sm"]}>{jobInfo?.city}</Text>
                {jobInfo?.city && jobInfo?.state ? (
                  <Text fontSize={["xs", "sm"]}>, {jobInfo?.state}</Text>
                ) : (
                  <Text fontSize={["xs", "sm"]}>{jobInfo?.state}</Text>
                )}
              </div>
            )}
          </HStack>
          <HStack marginTop={"1"} marginLeft={1}>
            <div style={{ display: "flex" }}>
              {/* <Icon
                as={FaBriefcase}
                boxSize={4}
                marginRight={1}
                marginTop={1}
              /> */}
              {jobInfo?.work_mode ? (
                <Text color="gray.700" fontSize={["xs", "sm"]}>
                  {jobInfo?.work_mode}
                </Text>
              ) : (
                <Text color="gray.700" fontSize={["xs", "sm"]} marginLeft={0.5}>
                  {t("Full_Time")}
                </Text>
              )}
              <Text color="gray.700" fontSize={["xs", "sm"]} marginLeft={0.5}>
                | {t("Immediate_Joiner")}
              </Text>
            </div>
          </HStack>
          <HStack
            marginLeft={1}
            marginRight={1}
            marginTop={"1"}
            color={"blue"}
            style={{ display: "flex" }}
          >
            {/* <Icon as={FaRupeeSign} boxSize={4} marginTop={1} /> */}
            {jobInfo?.salary ? (
              <Text fontSize={["xs", "sm"]}>{jobInfo?.salary}</Text>
            ) : (
              <Text fontSize={["xs", "sm"]}>{t("As_Industry_Standard")}</Text>
            )}
          </HStack>
        </Box>
        <Box
          marginTop={[2, 4]}
          display="flex"
          justifyContent={["center", "flex-start"]}
        >
          {listData.length ? (
            <OrderSuccessModal
              isOpen={openModal}
              onClose={closeModal}
              orderId={status}
              applied={true}
            />
          ) : (
            <Button
              marginTop={2}
              marginRight={[0, 5]}
              width={["100%", 200]}
              colorScheme="blue"
              variant="solid"
              backgroundColor="blue.500"
              color="white"
              onClick={() => {
                navigate(
                  `/${envConfig?.listLink}/automatedForm/${jobId}/${transactionId}`,
                  {
                    state: {
                      jobDetails: jobDetails,
                    },
                  }
                );
              }}
            >
              {t("Apply")}
            </Button>
          )}
        </Box>
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <Box
          fontFamily={"Alice"}
          marginLeft={4}
          marginRight={4}
          padding={4}
          marginTop={5}
          borderRadius={15}
          backgroundColor={"white"}
        >
          <Text fontSize={16} fontWeight={700}>
            {t("Job_Description")}
          </Text>

          {jobInfo?.description ? (
            <Text marginTop={2} fontSize={["xs", "sm"]} color={"gray.700"}>
              {" "}
              {jobInfo?.description}{" "}
            </Text>
          ) : (
            <Text marginTop={2} fontSize={["xs", "sm"]} color={"gray.700"}>
              {" "}
              {t("Job_description_is_not_available")}{" "}
            </Text>
          )}
          <Box marginTop={4}>
            {jobsData?.tags?.map((tag, index) => (
              <Box key={index} marginBottom={3}>
                <Text fontSize={["sm"]} color={"black"} fontWeight={700}>
                  {tag.descriptor.name}
                </Text>
                {tag.list.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <ul style={{ marginLeft: "3rem", listStyleType: "disc" }}>
                      <li>
                        {!item?.descriptor?.name &&
                          item?.descriptor?.code &&
                          item?.value !== "" && (
                            <Text fontSize={["xs", "sm"]} color="gray.700">
                              {item?.descriptor?.code}
                            </Text>
                          )}

                        {item?.descriptor?.name &&
                        item?.value &&
                        item?.value !== "null" &&
                        item?.value !== null ? (
                          <Box display="flex">
                            {item?.descriptor?.name && (
                              <Text
                                fontSize={["xs", "sm"]}
                                color="gray.900"
                                marginRight={2}
                              >
                                {item?.descriptor?.name}:
                              </Text>
                            )}
                            {item?.value && (
                              <Text fontSize={["xs", "sm"]} color="gray.700">
                                {item?.value}
                              </Text>
                            )}
                          </Box>
                        ) : (
                          <div>
                            <Text fontSize={["xs", "sm"]} color="gray.700">
                              {t("Not_Provided")}
                            </Text>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                ))}
                <Divider my={2} borderWidth="0.5px" />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </div>
  );
}

export default JobDetails;
