import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  ModalFooter,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { dataConfig } from "./card";
import axios from "axios";

const List = () => {
  const [cardData, setCardData] = useState();
  const [filterCardData, setFilterCardData] = useState();
  const [filterData, setfilterData] = useState();
  const [config, setConfig] = useState();
  const { type } = useParams();
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filter, setFilter] = useState();
  //remove telemetry
  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        let response;
        const configData = dataConfig[type] || {};
        setConfig(configData);
        const apiUrl = configData?.apiLink;
        response = await axios.post(apiUrl, configData?.payload || {});
        if (configData.apiResponce) {
          response = configData.apiResponce(response);
        }
        if (response) {
          setCardData(response);
          setFilterCardData(response);
          setfilterData(filterToData(configData?.filters, response));
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobsData();
  }, []);

  useEffect(() => {
    const fethcData = () => {
      let filterData = cardData;
      if (filter) {
        filterData = cardData.filter((item) => {
          let resp = [];
          const filKeys = Object.keys(filter || {});
          filKeys.forEach((key) => {
            resp = [
              ...resp,
              filter[key] === ""
                ? true
                : item?.[key]
                    ?.toLowerCase()
                    .includes(filter[key]?.toLowerCase()),
            ];
          });
          return resp.filter((e) => e).length === filKeys?.length;
        });
      }
      setFilterCardData(filterData);
    };
    fethcData();
  }, [filter]);

  const handleFilter = (key, value) => {
    setFilter((e) => ({
      ...e,
      [key]: value,
    }));
  };

  const handleOpenModal = () => {
    setShowFiltersModal(true);
  };

  return (
    <Box p="4">
      <Flex justify="space-between" align="center" mb="4">
        <Input
          type="text"
          placeholder="Search by name..."
          onChange={(e) =>
            handleFilter(config?.searchByKey || "title", e.target.value)
          }
        />
        <Button colorScheme="gray" onClick={handleOpenModal} ml={1}>
          Filters
        </Button>
      </Flex>
      <Modal
        isOpen={showFiltersModal}
        onClose={(e) => setShowFiltersModal(false)}
      >
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader>Apply Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {filterData &&
              Object.entries(filterData).map(([heading, options]) => {
                return (
                  <Box key={heading} mb="4">
                    <Heading size="sm" mb="2">
                      {heading}
                    </Heading>
                    {Array.isArray(options) && (
                      <Select
                        placeholder={`Select ${heading}`}
                        onChange={(e) => handleFilter(heading, e.target.value)}
                        value={filter?.[heading] || ""}
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Box>
                );
              })}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              onClick={(e) => setShowFiltersModal(false)}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex flexWrap="wrap">
        {filterCardData?.map((e) => (
          <RenderCards key={e} obj={e} config={config} />
        ))}
      </Flex>
    </Box>
  );
};

const RenderCards = ({ obj, config }) => {
  const navigate = useNavigate();
  const { type } = useParams();
  return (
    <button
      onClick={(e) => {
        if (obj?.detailLink) {
          navigate(replaceUrlParam(config?.detailLink.replase, obj));
        } else {
          if (obj?.id) {
            navigate(`/${config?.listLink}/${obj?.id}`);
          }
        }
      }}
    >
      {config?.render ? (
        config.render(obj)
      ) : (
        <Box p="4" borderWidth="1px" borderRadius="md" m="2" width="300px">
          <Heading as="h2" size="md" mb="2">
            {obj?.title}
          </Heading>
          <Text fontSize="md">{obj?.description}</Text>
        </Box>
      )}
    </button>
  );
};

const replaceUrlParam = (url, object) => {
  const param = url.match(/:(\w+)/)[1]; // Extract the parameter name
  return url.replace(`:${param}`, object[param]);
};

const filterToData = (data, arr) => {
  let result = {};
  arr.forEach((item) => {
    data.forEach((key) => {
      if (item?.[key]) {
        const countData = result?.[key]?.indexOf(item?.[key]);
        if (!countData || countData < 1) {
          result = { ...result, [key]: [...(result[key] || []), item?.[key]] };
        }
      }
    });
  });
  return result;
};

export default List;
