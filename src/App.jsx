import { ChakraProvider, Container } from "@chakra-ui/react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// import ProductDetailsPage from "./ProductDetails";

import AutomatedForm from "./job/AutomatedForm";
import JobDetails from "./job/JobDetails";
// import ProductDetailsPage from "./ProductDetails";
import React from "react";
import LandingPage from './LandingPage';
import DisplayData from './DisplayData';
import ScholarshipView from "./scholarship/View";
// import ProductDetailsPage from "./ProductDetails";
import Detials from "./content/Detials";
import MediaPage from "./content/MediaPage";
import UserDetailsForm from "./content/UserDetailsForm";


const App = () => {
  return (
    <ChakraProvider>
      <Container maxW="container.lg" mt={8}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/display/:type" element={<DisplayData />} />
            {/* Route to display ProductDetailsPage component for specific product */}
            {/* <Route
              path="/product/:productId"
              element={<ProductDetailsPage products={products} />}
            /> */}
            <Route path="display/jobs/:type/:jobId" element={<JobDetails />} />
            <Route path="display/scholarship/:type/:jobId" element={<ScholarshipView />} />
            <Route
              path="/automatedForm/:jobId/:transactionId"
              element={<AutomatedForm />}
            />
            <Route path="/details" element={<Detials />} />
            <Route path="/confirm/:itemId" element={<MediaPage />} />
            <Route path="/form" element={<UserDetailsForm />} />
          </Routes>
        </Router>
      </Container>
    </ChakraProvider>
  );
};

export default App;
