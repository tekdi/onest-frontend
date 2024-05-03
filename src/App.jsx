import { ChakraProvider, Container } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AutomatedForm from "./job/AutomatedForm";
import JobDetails from "./job/JobDetails";
import DisplayData from "./DisplayData";
import LandingPage from "./LandingPage";
import ScholarshipView from "./scholarship/View";
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
            <Route path="/:type" element={<DisplayData />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/scholarship/:jobId" element={<ScholarshipView />} />
            <Route
              path="/automatedForm/:jobId/:transactionId"
              element={<AutomatedForm />}
            />
            <Route path="/learning/:itemId" element={<Detials />} />
            <Route path="/confirm/:itemId" element={<MediaPage />} />
            <Route path="/form" element={<UserDetailsForm />} />
          </Routes>
        </Router>
      </Container>
    </ChakraProvider>
  );
};

export default App;
