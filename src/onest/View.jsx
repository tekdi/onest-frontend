import React from "react";
import { useParams } from "react-router-dom";
import ScholarshipView from "./scholarship/View";
import JobDetails from "./job/JobDetails";
import Details from "./content/Detials";

function View() {
  const { type } = useParams();

  if (type == "jobs") {
    return <JobDetails />;
  } else if (type == "scholarship") {
    return <ScholarshipView />;
  } else if (type == "learning") {
    return <Details />;
  }

  return <div>Not Found</div>;
}

export default View;
