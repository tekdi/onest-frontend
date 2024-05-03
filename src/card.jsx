export const dataConfig = {
  scholarship: {
    title: "Scholarship",
    searchByKey: "title",
    listLink: "scholarship",
    apiLink: "https://scholarship-api-dev.tekdinext.com/content/search",
    filters: ["provider_name", "fulfillments"],
    imageUrl: "",
    apiResponce: (e) => e.data.data.scholarship_cache,
  },

  jobs: {
    title: "Jobs",
    searchByKey: "title",
    listLink: "jobs",
    apiLink: "https://jobs-api.tekdinext.com/jobs/search",
    filters: [
      "city",
      "state",
      "qualification",
      "experience",
      "gender",
      "company",
    ],
    imageUrl: "",
    apiResponce: (e) => e.data.data.jobs_cache,
    // render: (e) => {
    //   console.log(e);
    //   return (
    //     <div>
    //       <h1>{e.title} </h1>
    //       <h2>{e.company}</h2>
    //     </div>
    //   );
    // },
  },
  learning: {
    title: "Learning experiences",
    searchByKey: "title",
    listLink: "learning",
    detailLink: "/learning/:id",
    apiLink: "https://kahani-api.tekdinext.com/content/search",
    imageUrl: "",
    apiResponce: (e) => e.data.data.kahani_cache,
    // apiResponce: ({ data }) => {
    //   let response = [];
    //   //   response = data?.message?.catalog?.providers?.flatMap((e) => e.items);
    //   return data.data;
    // },
    render: (e) => {
      return "";
    },
    payload: {
      context: {
        domain: "onest:learning-experiences",
        action: "search",
        version: "1.1.0",
        bap_id: "13.201.4.186:6002",
        bap_uri: "http://13.201.4.186:6002/",
        location: {
          country: {
            name: "India",
            code: "IND",
          },
          city: {
            name: "Bangalore",
            code: "std:080",
          },
        },
        transaction_id: "a9aaecca-10b7-4d19-b640-b047a7c60008",
        message_id: "a9aaecca-10b7-4d19-b640-b047a7c60009",
        timestamp: "2023-02-06T09:55:41.161Z",
      },
      message: {
        intent: {
          item: {
            descriptor: {
              name: "",
            },
          },
        },
      },
    },
  },
};
