import React, { useState } from 'react';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate();
 

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
        <Image src={imageUrl} mb="4" />
        <Heading as="h2" size="md" mb="2">
          {title}
        </Heading>
      </Flex>
    );
  };

  const handleCardClick = async (title) => {
    try {
    
      navigate(`/display/${title}`);

    } catch (error) {
      console.error(`Error fetching data for ${title}:`, error);
    }
  };

  return (
    <Box p="4">
      <Flex flexWrap="wrap" justifyContent="center">
        <FeatureCard
          title="Scholarships"
          onClick={() => handleCardClick('scholarship')}
          imageUrl="/images/scholarships.jpg"
        />
        <FeatureCard
          title="Learning Experiences"
          onClick={() => handleCardClick('learning')}
          imageUrl="/images/learning-experiences.jpg"
        />
        <FeatureCard
          title="Jobs"
          onClick={() => handleCardClick('jobs')}
          imageUrl="/images/jobs.jpg"
        />
        <FeatureCard
          title="Mentoring"
          onClick={() => handleCardClick('mentoring')}
          imageUrl="/images/mentoring.jpg"
        />
      </Flex>
    </Box>
  );
};

export default LandingPage;
