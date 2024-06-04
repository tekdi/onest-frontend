import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dataConfig, landingTelemetry } from "./card";

const LandingPage = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  useEffect(() => {
    let telemetry = {
      eid: "IMPRESSION",
      ets: 0,
      ver: 1,
      mid: "Card list",

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
    landingTelemetry.getTelemetry("show types", telemetry);
  }, []);
  const FeatureCard = ({ title, onClick, imageUrl }) => {
    return (
      <Flex
        p="6"
        bg="white"
        borderWidth="1px"
        borderRadius="lg"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        boxShadow="md"
        width="300px"
        onClick={onClick}
        cursor="pointer"
        mb="8"
        mr="4"
        ml="4"
      >
        {imageUrl && <Image src={imageUrl} mb="4" />}
        <Heading as="h2" size="md" mb="2">
          {title || "Untitled"}
        </Heading>
      </Flex>
    );
  };

  const handleCardClick = async (title) => {
    let type = title.toString().toLowerCase();
    const configData = dataConfig[title] || {};
    let telemetry = {
      eid: "Interact",
      ets: 0,
      ver: 1,
      mid: "Select option" + " " + title,

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
    <Box p="4">
      <Flex flexWrap="wrap" justifyContent="center">
        {dataConfig.constructor.name === "Object" &&
          Object.values(dataConfig).map((item) => {
            return (
              <FeatureCard
                key={item}
                title={item?.title}
                onClick={() => handleCardClick(item?.listLink)}
                imageUrl={item?.imageUrl}
              />
            );
          })}
      </Flex>
    </Box>
  );
};

export default LandingPage;
