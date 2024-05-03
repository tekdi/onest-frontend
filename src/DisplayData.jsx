import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, Input, filter, Button,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  ModalFooter, } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { dataConfig } from "./card";
import axios from "axios";
import fetchLearningData from "./LearningApi";

const DisplayData = () => {
  const [cardData, setcardData] = useState();
  const [filterData, setfilterData] = useState();
  const { type } = useParams();
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        let response;

        if (type === "learning") {
          
          response = await fetchLearningData();
        } else {
          
          const apiUrl = dataConfig[type]?.link;
          response = await axios.post(apiUrl);
        }

        if (response) {

          console.log(response);
          setcardData(response.data);

          const filterData = dataConfig[type]?.filters;
          setfilterData(filterData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobsData();
  }, [type]);

    console.log(filterData);

  console.log(
    type,
    dataConfig[type],
    cardData?.data[dataConfig[type].responsekey]
  );

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenModal = () => {
    setShowFiltersModal(true);
  };

  const handleCloseModal = () => {
    setShowFiltersModal(false);
  };

  return (
    <Box p="4">
      <Flex justify="space-between" align="center" mb="4">
      <Input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearch}
        
      />
        <Button colorScheme="gray" onClick={handleOpenModal} ml={1}>
          Filters
        </Button>
        </Flex>
        <Modal isOpen={showFiltersModal} onClose={handleCloseModal} >
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader>Apply Filters</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {filterData &&
  Object.entries(filterData).map(([heading, options]) => {
    console.log("Heading:", heading);
    console.log("Options:", options);

    return (
      <Box key={heading} mb="4">
        <Heading size="sm" mb="2">
          {heading}
        </Heading>
        {Array.isArray(options) && (
          <Select placeholder={`Select ${heading}`}>
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
            <Button colorScheme="gray" onClick={handleCloseModal}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex flexWrap="wrap">
        {cardData?.data[dataConfig[type].responsekey].map((e) => (
          <RenderCards obj={{ ...e, render: dataConfig[type].render }} />
        ))}
      </Flex>
    </Box>
  );
};

const RenderCards = ({ obj }) => {
  

  const filteredElements = [];

  if (!obj) return filteredElements;

  return obj.render ? (
    obj.render(obj)
  ) : (
    <Box p="4" borderWidth="1px" borderRadius="md" m="2" width="300px">
      <Heading as="h2" size="md" mb="2">
        {obj?.title}
      </Heading>
      <Text fontSize="md">{obj?.description}</Text>
    </Box>
  );
};

export default DisplayData;
