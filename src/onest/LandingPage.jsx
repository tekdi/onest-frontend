import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dataConfig } from "./card.jsx";
import "./LandingPage.css"; // Import custom CSS styles

const LandingPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  useEffect(() => {}, []);
  const FeatureCard = ({ title, onClick, imageUrl }) => {
    return (
      <div className="feature-card" onClick={onClick}>
        {imageUrl && <img src={imageUrl} className="card-image" alt="Card" />}
        <h2 className="card-title">{title || "Untitled"}</h2>
      </div>
    );
  };

  const handleCardClick = async (title) => {
    let type = title.toString().toLowerCase();
    const configData = dataConfig[title] || {};
    let telemetry = {
      eid: "Interact",
      ets: 0,
      ver: 1,
      mid: "Select option",

      actor: {
        id: "user",
        type: "",
      },

      context: {
        channel: "",
        pdata: {
          id: "",
          pid: "",
          ver: "",
          platform: "",
        },
        env: "",
        sid: "",
        did: "",
        cdata: [
          {
            type: "",
            id: "",
          },
        ],
      },

      edata: {
        type: type,

        subtype: "scroll",

        pageid: String, //Required.  Unique page id

        itype: "AUTO",

        stageto: "",
      },
    };
    if (configData?.getTelemetry) {
      configData.getTelemetry("select type", telemetry);
    }

    try {
      navigate(`/${title}`);
    } catch (error) {
      console.error(`Error fetching data for ${title}:`, error);
    }
  };

  return (
    <div className="landing-page-container">
      <div className="cards-container">
        {dataConfig.constructor.name === "Object" &&
          Object.values(dataConfig).map((item, index) => {
            return (
              <FeatureCard
                key={index} // Use index as key for the list
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
