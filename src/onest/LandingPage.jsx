import React from "react";
import { useNavigate } from "react-router-dom";
import { dataConfig, landingTelemetry } from "./card";
import "../App.css";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let telemetry = {
      eid: "IMPRESSION",
      ets: 0,
      ver: 1,
      mid: "Landing page visit",
      actor: {
        id: "user",
        type: "user",
      },
      context: {
        channel: "ONEST-" + type,
        pdata: {
          id: "landing_page",
        },
        env: "ONEST",
      },
      edata: {
        type: "landing_page",
        pageid: "landing_page_visit",
      },
    };

    landingTelemetry.getActivitiesAndEvents(telemetry);
  }, []);
  const FeatureCard = ({ key, title, onClick, imageUrl }) => {
    return (
      <div
        className="card-container pointer"
        onClick={onClick}
        key={key}
        style={{ width: "300px" }}
      >
        {imageUrl && <img src={imageUrl} alt="" className="" />}
        <h2 className="card-title">{title || "Untitled"}</h2>
      </div>
    );
  };

  const handleCardClick = async (title) => {
    let type = title.toString().toLowerCase();
    const configData = dataConfig[type] || {};

    if (configData?.getActivitiesAndEvents) {
      let telemetry = {
        eid: "INTRACT",
        ets: 0,
        ver: 1,
        mid: "Landing page_" + type + "_button_click",
        actor: {
          id: "user",
          type: "user",
        },
        context: {
          channel: "ONEST-" + type,
          pdata: {
            id: type + "_button",
          },
          env: "ONEST",
        },
        edata: {
          type: "click",
          pageid: type + "button",
        },
      };

      configData.getActivitiesAndEvents(telemetry);
    }
    try {
      navigate(`/${title}`);
    } catch (error) {
      console.error(`Error fetching data for ${title}:`, error);
    }
  };

  return (
    <div className="container">
      <div className="center-div">
        {dataConfig.constructor.name === "Object" &&
          Object.values(dataConfig).map((item, i) => {
            return (
              <FeatureCard
                key={i + 1}
                title={item?.title}
                onClick={() => handleCardClick(item?.listLink)}
                imageUrl={item?.imageUrl}
              />
            );
          })}
      </div>
    </div>
  );
};

export default LandingPage;
