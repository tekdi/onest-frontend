import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { dataConfig } from "../card";
import Loader from "../components/Loader";
import "./Shared.css";
const env = import.meta.env;

export async function post(url, body, headers = {}, onUploadProgress = {}) {
  return await axios.post(url, body, {
    ...headers,
    headers: {
      ...headers?.headers,
    },
    onUploadProgress,
  });
}

const Details = () => {
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { jobId, type } = useParams();
  const baseUrl = dataConfig[type].apiLink_API_BASE_URL;
  const db_cache = dataConfig[type].apiLink_DB_CACHE;
  const envConfig = dataConfig[type];

  const [product, setProduct] = useState(state?.product);
  const [details, setDetails] = useState({});
  const fieldsToSkip = ["lastupdatedon", "createdon"];

  const [story, setStory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactionId, setTransactionId] = useState(uuidv4());
  // const messageId = uuidv4();
  // const [info, setInfo] = useState(state?.product);
  const dataShow = ["title", "name"];

  const errorMessage = (message) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
      toast.style.display = "none";
    }, 5000); // Hide after 5 seconds
  };

  const fetchSelectedCourseData = async () => {
    try {
      setIsLoading(true);
      let productInfo;

      if (!product) {
        productInfo = JSON.parse(localStorage.getItem("searchProduct"));
      } else {
        productInfo = product;
      }

      let bodyData = {
        context: {
          domain: envConfig?.apiLink_DOMAIN,
          action: "select",
          version: "1.1.0",
          bap_id: envConfig?.apiLink_BAP_ID,
          bap_uri: envConfig?.apiLink_BAP_URI,
          bpp_id: productInfo?.bpp_id,
          bpp_uri: productInfo?.bpp_uri,
          transaction_id: transactionId,
          message_id: uuidv4(),
          // message_id: "06974a96-e996-4e22-9265-230f69f22f57",
          timestamp: new Date().toISOString(),
        },
        message: {
          order: {
            provider: {
              id: productInfo?.provider_id,
            },
            items: [
              {
                id: productInfo?.item_id,
              },
            ],
          },
        },
      };

      const result = await post(`${baseUrl}/select`, bodyData);
      let response = result?.data;
      localStorage.setItem("details", JSON.stringify(response));
      if (response.responses?.[0]?.message?.order?.items?.[0]) {
        setDetails(response.responses?.[0].message?.order?.items?.[0] || {});
      } else {
        errorMessage(
          t("Delay_in_fetching_the_details") + "(" + transactionId + ")"
        );
      }
      // console.log("resp", response);
      if (response && response.responses && response.responses.length > 0) {
        // console.log("Entered 1");
        let arrayOfObjects = [];
        let uniqueItemIds = new Set();

        for (const responses of response.responses) {
          const provider = responses.message.order;
          for (const item of provider.items) {
            if (!uniqueItemIds.has(item.id)) {
              let obj = {
                item_id: item.id,
                title: productInfo.title,
                description: productInfo.description
                  ? productInfo.description
                  : "",
                long_desc: item.descriptor.long_desc,
                provider_id: productInfo.provider_id,
                provider_name: productInfo.provider_name,
                bpp_id: productInfo.bpp_id,
                bpp_uri: productInfo.bpp_uri,
                icon: productInfo.icon ? productInfo.icon : "",
                descriptionshort: productInfo.shortDescription
                  ? productInfo.shortDescription
                  : "",
              };
              arrayOfObjects.push(obj);
              uniqueItemIds.add(item.id);
            }
          }
        }
        setStory(arrayOfObjects[0]);
        // console.log("arrayOfObjects", arrayOfObjects);
      } else {
        errorMessage(
          t("Delay_in_fetching_the_details") + "(" + transactionId + ")"
        );
      }
    } catch (error) {
      console.error("Error fetching details:", error);
      errorMessage(
        t("Delay_in_fetching_the_details") + "(" + transactionId + ")"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // registerTelementry(siteUrl, transactionId);
      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: jobId }),
      };

      fetch(`${baseUrl}/content/search`, requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
          result = JSON.parse(result);
          setProduct(result?.data[db_cache]?.[0]);
          localStorage.setItem(
            "searchProduct",
            JSON.stringify(result?.data[db_cache]?.[0])
          );

          const userDataString = localStorage.getItem("userData");
          const userData = JSON.parse(userDataString);
          let trackData;
          if (envConfig?.getTrackData) {
            trackData = await envConfig.getTrackData({
              type,
              itemId: jobId,
              transactionId,
              user_id: userData?.user_id,
            });
          }
          if (trackData?.params?.type) {
            handleSubscribe(result?.data[db_cache]?.[0]);
          } else if (transactionId !== undefined) {
            fetchSelectedCourseData(result?.data[db_cache]?.[0]);
          }
        });
    };
    fetchData();
    // .catch((error) => console.log("error", error));
  }, [transactionId]); // Runs only once when the component mounts

  const handleSubscribe = (productData) => {
    navigate(
      `/${envConfig?.listLink}/confirm/${productData?.item_id}/${transactionId}`,
      {
        state: {
          product: productData,
          transactionId: transactionId,
        },
      }
    );
  };

  const handleBack = () => {
    navigate("/");
  };

  function convertNameToLearningOutcomes(name) {
    let transformedName = name.replace(/([A-Z])/g, " $1");
    transformedName =
      transformedName.charAt(0).toUpperCase() + transformedName.slice(1);
    return transformedName;
  }

  // transaction id
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <div className="text-center"></div>
        </div>
      ) : error ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <div className="text-center">
            <p className="page-text">{error}</p>
            <button
              style={{
                marginTop: "16px",
                background: "#3182ce",
                color: "white",
              }}
              onClick={handleBack}
            >
              {t("GO_BACK")}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={{
              padding: "16px",
              borderRadius: "15px",
              backgroundColor: "white",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {product.image_url && (
                  <div style={{ width: "80px", height: "auto" }}>
                    <img src={product.image_url} alt="Product" />
                  </div>
                )}
              </div>
            </div>

            <h1 className="page-title" style={{ marginTop: "20px" }}>
              {product?.title}
            </h1>
            <p className="page-text" style={{ marginBottom: "15px" }}>
              Published By: {product?.provider_name}
            </p>

            <button
              className="autosubmit"
              onClick={(e) => handleSubscribe(product)}
            >
              {t("SUBSCRIBE")}
            </button>
          </div>
          {details !== undefined && (
            <div
              className=""
              style={{
                padding: "16px",
                borderRadius: "15px",
                backgroundColor: "white",
              }}
            >
              {details?.tags?.[0]?.list?.map((item, itemIndex) => (
                <>
                  {!fieldsToSkip.includes(item.descriptor.name) && (
                    <>
                      <div key={itemIndex} style={{ marginLeft: "16px" }}>
                        <ul style={{ listStyleType: "disc" }}>
                          <li>
                            {!item?.descriptor?.name &&
                              item?.descriptor?.code &&
                              item?.value !== "" && (
                                <p
                                  className="page-text"
                                  style={{
                                    fontWeight: "800",
                                    marginTop: "12px",
                                  }}
                                >
                                  {convertNameToLearningOutcomes(
                                    item?.descriptor?.code
                                  )}
                                </p>
                              )}

                            {item?.descriptor?.name &&
                            item?.value &&
                            item?.value !== "null" &&
                            item?.value !== null &&
                            !fieldsToSkip.includes(item.descriptor.name) ? (
                              <div
                                className=""
                                style={{ display: "flex", marginTop: "12px" }}
                              >
                                {item?.descriptor?.name && (
                                  <p
                                    className="page-text"
                                    style={{
                                      fontWeight: "800",
                                      marginTop: "12px",
                                    }}
                                  >
                                    {convertNameToLearningOutcomes(
                                      item?.descriptor?.name
                                    )}
                                    :
                                  </p>
                                )}
                                {item?.value && (
                                  <p
                                    className="page-text"
                                    style={{ marginTop: "12px" }}
                                  >
                                    {item?.value}
                                  </p>
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Details;
