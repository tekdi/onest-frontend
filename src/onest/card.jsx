const env = import.meta.env;

export const dataConfig = {
  scholarship: {
    title: "Scholarship",
    searchByKey: "title",
    listLink: "scholarship",
    apiLink: `${env.VITE_SCHOLASHIPS_API_BASE_URL}/content/search`,
    filters: ["provider_name"], //"fulfillments"
    apiLink_DB_CACHE: env.VITE_SCHOLASHIPS_DB_CACHE,
    apiLink_RESPONSE_DB: "response_cache_dev",
    apiLink_DOMAIN: env.VITE_SCHOLASHIPS_DOMAIN,
    apiLink_BAP_ID: env.VITE_SCHOLASHIPS_BAP_ID,
    apiLink_BAP_URI: env.VITE_SCHOLASHIPS_BAP_URI,
    apiLink_API_BASE_URL: env.VITE_SCHOLASHIPS_API_BASE_URL,
    apiLink_BASE_URL: "https://scholarship-client-dev.tekdinext.com",
    imageUrl: "",

    apiResponse: (e) => e.data?.data?.[env.VITE_SCHOLASHIPS_DB_CACHE],
  },

  jobs: {
    title: "Jobs",
    searchByKey: "title",
    listLink: "jobs",
    apiLink: `${env.VITE_JOBS_API_BASE_URL}/jobs/search`,
    filters: [
      "city",
      "state",
      "qualification",
      "experience",
      "gender",
      "company",
    ],
    apiLink_DB_CACHE: env.VITE_JOBS_DB_CACHE,
    apiLink_RESPONSE_DB: "response_cache_dev",
    apiLink_DOMAIN: env.VITE_JOBS_DOMAIN,
    apiLink_BAP_ID: env.VITE_JOBS_BAP_ID,
    apiLink_BAP_URI: env.VITE_JOBS_BAP_URI,
    apiLink_API_BASE_URL: env.VITE_JOBS_API_BASE_URL,
    apiLink_BASE_URL: env.VITE_BASE_URL,
    apiLink_SUNBIRD_API: env.VITE_SUNBIRD_API,
    apiLink_DIKSHA_API: env.VITE_DIKSHA_API,
    apiLink_IMAGE_URL: env.VITE_IMAGE_URL,
    imageUrl: "",

    apiResponse: (e) => e.data?.data?.[env.VITE_JOBS_DB_CACHE],
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
    title: "Learning Experiences",
    searchByKey: "title",
    listLink: "learning",
    detailLink: "/learning/:id",
    apiLink: `${env.VITE_LEARNINGS_API_BASE_URL}/content/search`,
    imageUrl: "",
    apiLink_DB_CACHE: env.VITE_LEARNINGS_DB_CACHE,
    apiLink_API_ROUTE: "content",
    apiLink_DOMAIN: env.VITE_LEARNINGS_DOMAIN,
    apiLink_BAP_ID: env.VITE_LEARNINGS_BAP_ID,
    apiLink_BAP_URI: env.VITE_LEARNINGS_BAP_URI,
    apiLink_API_BASE_URL: env.VITE_LEARNINGS_API_BASE_URL,
    apiLink_BASE_URL: env.VITE_BASE_URL,

    apiResponse: (e) => e.data?.data?.[env.VITE_LEARNINGS_DB_CACHE],
    // apiResponse: ({ data }) => {
    //   let response = [];
    //   //   response = data?.message?.catalog?.providers?.flatMap((e) => e.items);
    //   return data.data;
    // },
    // render: (e) => {},
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
