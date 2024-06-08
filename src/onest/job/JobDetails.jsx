import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { registerTelementry } from "../api/Apicall";
// import Header from "./Header";
import Loader from "./Loader";
import "./Shared.css";
import { dataConfig } from "../card";

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

  let [transactionId, settransactionId] = useState(state?.transactionId);

  const errorMessage = (message) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
    }, 5000); // Hide after 5 seconds
  };

  const trackReactGA = () => {
    console.log("User clicked the Apply job details button");
    ReactGA.event({
      category: "Button Click",
      action: "apply_Button",
      label: "Apply Button",
      value: 2,
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

      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="contianer">
            <div className="" style={{ textAlign: "left" }}>
              <h2 className="page-title">{jobInfo?.provider_name}</h2>
              {jobInfo?.title && (
                <h4 className="page-sub-title">{jobInfo?.title}</h4>
              )}
              {jobInfo?.company && (
                <h4 className="page-sub-title">{jobInfo?.company}</h4>
              )}
              <div className="" style={{ marginTop: "4px" }}>
                {(jobInfo?.city || jobInfo?.state) && (
                  <div className="" style={{ display: "flex" }}>
                    <i className="icon" style={{ marginRight: "10px" }}>
                      📍
                    </i>{" "}
                    <p className="page-text">{jobInfo?.city}</p>
                    {jobInfo?.city && jobInfo?.state ? (
                      <p className="page-text">, {jobInfo?.state}</p>
                    ) : (
                      <p className="page-text">{jobInfo?.state}</p>
                    )}
                  </div>
                )}
              </div>
              <div className="" style={{ marginTop: "4px" }}>
                <div style={{ display: "flex" }}>
                  <i className="icon" style={{ marginRight: "10px" }}>
                    💼
                  </i>
                  {jobInfo?.work_mode ? (
                    <p className="page-text">{jobInfo?.work_mode}</p>
                  ) : (
                    <p className="page-text">{t("Full_Time")}</p>
                  )}
                  {/* <p className="page-text">| {t("Immediate_Joiner")}</p> */}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="price-symbol" style={{ marginRight: "10px" }}>
                  ₹
                </div>
                {jobInfo?.salary ? (
                  <p className="page-text">{jobInfo?.salary}</p>
                ) : (
                  <p className="page-text">{t("As_Industry_Standard")}</p>
                )}
              </div>
            </div>
            <div
              className=""
              style={{
                marginTop: "8px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <button
                className="autosubmit"
                type="button"
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
              </button>
            </div>
          </div>

          <div style={{ marginTop: "16px", textAlign: "left" }}>
            <h4 className="page-sub-title">{t("Job_Description")}</h4>

            {jobInfo?.description ? (
              <p className="page-text"> {jobInfo?.description} </p>
            ) : (
              <p className="page-text">
                {" "}
                {t("Job_description_is_not_available")}{" "}
              </p>
            )}
            {jobsData?.tags?.map((tag, index) => (
              <div key={index} style={{ marginTop: "9px" }}>
                <h6 className="page-sub-title">{tag.descriptor.name}</h6>
                {tag.list.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <ul style={{ marginLeft: "3rem", listStyleType: "disc" }}>
                      <li>
                        {!item?.descriptor?.name &&
                          item?.descriptor?.code &&
                          item?.value !== "" && (
                            <p className="page-text">
                              {item?.descriptor?.code}
                            </p>
                          )}

                        {item?.descriptor?.name &&
                        item?.value &&
                        item?.value !== "null" &&
                        item?.value !== null ? (
                          <div style={{ display: "flex" }}>
                            {item?.descriptor?.name && (
                              <p className="page-text">
                                {item?.descriptor?.name}:
                              </p>
                            )}
                            {item?.value && (
                              <p className="page-text">{item?.value}</p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="page-text">{t("Not_Provided")}</p>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                ))}
                <hr className="" style={{ border: "1px solid lightGrey" }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetails;
