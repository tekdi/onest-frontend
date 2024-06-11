import React from "react";
import { useNavigate } from "react-router-dom";
import { dataConfig } from "./card";
import "../App.css";

const LandingPage = () => {
  const navigate = useNavigate();

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
