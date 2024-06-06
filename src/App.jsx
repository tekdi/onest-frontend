import { ChakraProvider, Container } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./onest/LandingPage";
import MediaPage from "./onest/content/MediaPage";
import UserDetailsForm from "./onest/content/UserDetailsForm";
import AutomatedForm from "./onest/AutomatedForm";
import List from "./onest/List";
import View from "./onest/View";
import NotFound from "./onest/NotFound";

const App = () => {
  return (
    <ChakraProvider>
      <Container maxW="container.lg" mt={8}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/:type" element={<List />} />
            <Route path="/:type/:jobId" element={<View />} />
            <Route
              path="/:type/automatedForm/:jobId/:transactionId"
              element={<AutomatedForm />}
            />
            <Route
              path="/:type/confirm/:itemId/:transactionId"
              element={<MediaPage />}
            />
            <Route path="/:type/form" element={<UserDetailsForm />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Container>
    </ChakraProvider>
  );
};

export default App;
