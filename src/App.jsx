import React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
// import ProductDetailsPage from "./ProductDetails";
import ScholarshipView from "./scholarship/View";
import AutomatedForm from "./scholarship/AutomatedForm";

const products = [
  {
    id: 1,
    name: "Mobile",
    description: "This is product A description.",
    imageUrl: "https://example.com/productA.jpg",
    rating: 4.5,
    url: "https://example.com/productA",
    category: "electronics",
    brand: "Brand A",
    featured: true,
    price: 199.99,
  },
  {
    id: 2,
    name: "Shirt",
    description: "This is product B description.",
    imageUrl: "https://example.com/productB.jpg",
    rating: 3.8,
    url: "https://example.com/productB",
    category: "clothing",
    brand: "Brand B",
    featured: false,
    price: 49.99,
  },
  {
    id: 3,
    name: "Television",
    description: "This is product C description.",
    imageUrl: "https://example.com/productC.jpg",
    rating: 4.2,
    url: "https://example.com/productC",
    category: "electronics",
    brand: "Brand C",
    featured: true,
    price: 149.99,
  },
  {
    id: 4,
    name: "Chair",
    description: "This is product D description.",
    imageUrl: "https://example.com/productD.jpg",
    rating: 4.0,
    url: "https://example.com/productD",
    category: "home",
    brand: "Brand D",
    featured: false,
    price: 299.99,
  },
  // Add more products as needed
];

const App = () => {
  return (
    <ChakraProvider>
      <Container maxW="container.lg" mt={8}>
        <Router>
          <Routes>
            {/* Route to display ProductList component with products data */}
            <Route path="/" element={<ProductList data={products} />} />
            {/* Route to display ProductDetailsPage component for specific product */}
            {/* <Route
              path="/product/:productId"
              element={<ProductDetailsPage products={products} />}
            /> */}
            <Route path="/scholarship/:jobId" element={<ScholarshipView />} />
            <Route
              path="/automatedForm/:jobId/:transactionId"
              element={<AutomatedForm />}
            />
          </Routes>
        </Router>
      </Container>
    </ChakraProvider>
  );
};

export default App;
