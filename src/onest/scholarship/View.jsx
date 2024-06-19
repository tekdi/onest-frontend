import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { dataConfig } from "../card";
import Loader from "./Loader";
import "./Shared.css";

function JobDetails() {
  const { type } = useParams();

  const baseUrl = dataConfig[type].apiLink_API_BASE_URL;

  const db_cache = dataConfig[type].apiLink_DB_CACHE;
  const envConfig = dataConfig[type];

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [jobInfo, setJobInfo] = useState(state?.product);
  const [jobsData, setJobsData] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const { jobId } = useParams();
  const [siteUrl] = useState(window.location.href);
  const [transactionId] = useState(uuidv4());
  useEffect(() => {
    const configData = dataConfig[type] || {};
    if (configData?.getActivitiesAndEvents) {
      let telemetry = {
        eid: "IMPRESSION",
        ets: 0,
        ver: 1,
        mid: "scholarship_detail",
        actor: {
          id: "user",
          type: "user",
        },
        context: {
          channel: "ONEST-" + type,
          pdata: {
            id: jobId,
          },
          env: "ONEST",
        },
        edata: {
          type: "scholarship_detail",
          pageid: "scholarship_detail_visit",
        },
      };
      configData.getActivitiesAndEvents(telemetry);
    }
  }, []);
  const errorMessage = (message) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
    }, 5000); // Hide after 5 seconds
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

    const urlParams = new URLSearchParams(window.location.search);
    const jsonDataParam = urlParams.get("jsonData");

    if (jsonDataParam) {
      let jsonData = atob(jsonDataParam);
      localStorage.setItem("userData", jsonData);
    }
  }, []);

  useEffect(() => {
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_id: jobId }),
    };

    fetch(`${baseUrl}/content/search`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        setJobInfo(result?.data[db_cache][0]);
        if (transactionId !== undefined) {
          fetchJobDetails(result?.data[db_cache][0]);
        }
      })
      .catch((error) => console.log("error", error));
  }, [transactionId]); // Runs only once when the component mounts

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="contianer">
            <div className="" style={{ textAlign: "left" }}>
              <h2 className="page-title">{jobInfo?.title}</h2>
              {jobInfo?.provider_name && (
                <h4 className="page-sub-title">{jobInfo?.provider_name}</h4>
              )}
              {jobInfo?.company && (
                <h4 className="page-sub-title">{jobInfo?.company}</h4>
              )}
              <div className="" style={{ marginTop: "4px" }}>
                {(jobInfo?.city || jobInfo?.state) && (
                  <div className="" style={{ display: "flex" }}>
                    <i className="icon">📍</i>{" "}
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
                  <p className="page-text">
                    {jobInfo?.item?.descriptor?.long_desc}
                  </p>
                </div>
              </div>
              <div>
                <p className="page-text">
                  <b>Scholarship Amount :</b>{" "}
                  {jobInfo?.item?.price
                    ? `${jobInfo.item?.price.currency} ${jobInfo.item?.price.minimum_value}-${jobInfo.item?.price.maximum_value}`
                    : "Not mentioned"}
                </p>
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
