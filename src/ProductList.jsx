import { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Stack,
  Text,
  SimpleGrid,
  Image,
  Center,
  Heading,
  Badge,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]); // State for selected filters
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // State for filter modal
  const navigate = useNavigate();

  // Get unique categories from data for dynamic filter options
  const categories = Array.from(new Set(data.map((item) => item.category)));

  // Function to handle checkbox change
  const handleCheckboxChange = (category) => {
    if (selectedFilters.includes(category)) {
      // Remove filter if already selected
      setSelectedFilters(selectedFilters.filter((filter) => filter !== category));
    } else {
      // Add filter if not already selected
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  // Function to check if a category filter is selected
  const isCategorySelected = (category) => selectedFilters.includes(category);

  // Function to apply filters and return filtered data
  const applyFilters = (product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = selectedFilters.length === 0 || selectedFilters.includes(product.category);
    return matchesSearchTerm && matchesFilters;
  };

  // Filtered data based on search term and selected filters
  const filteredData = data.filter(applyFilters);


  return (
    <Box>
      {/* Search input and Open Filters button */}
      <Flex alignItems="center" mb={4}>
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mr={2} // Add right margin for spacing
        />
        <Button
  colorScheme="gray"
  onClick={() => setIsFilterModalOpen(true)}
  borderWidth="1px" // Set border width
  borderColor="gray.200" // Set border color
  borderRadius="md" // Set border radius
  px={4} // Set horizontal padding
  py={2} // Set vertical padding
>
  Filters
</Button>
      </Flex>

      {/* Filtered tags */}
      {selectedFilters.length > 0 && (
        <Stack direction="row" spacing={2} mb={4}>
          <Text fontSize="sm">Selected Filters:</Text>
          {selectedFilters.map((filter) => (
            <Tag key={filter} size="md" variant="subtle" colorScheme="green">
              <TagLabel>{filter}</TagLabel>
              <TagCloseButton onClick={() => handleCheckboxChange(filter)} />
            </Tag>
          ))}
        </Stack>
      )}

      {/* Display filtered products */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {filteredData.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            cursor="pointer"
            
          >
            <Center mb={4}>
              <Image src={product.imageUrl} alt={product.name} boxSize="100px" />
            </Center>
            <Stack spacing={2}>
              <Heading as="h3" size="md">
                {product.name}
              </Heading>
              <Text>{product.description}</Text>
              <Badge colorScheme="green">Rating: {product.rating}</Badge>
             
            </Stack>
          </Box>
        ))}
      </SimpleGrid>

      {/* Filter modal */}
      <Modal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply Filters</ModalHeader>
          <ModalBody>
            {/* Dropdown for structured filters */}
            <Select
              placeholder="Select a filter..."
              onChange={(e) => {
                const selectedFilter = e.target.value;
                handleCheckboxChange(selectedFilter);
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsFilterModalOpen(false)}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductList;
