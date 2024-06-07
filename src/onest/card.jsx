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
    onOrderIdGenerate: async (val) => {
      const data = {
        user_id: `${val.userData.user_id}`,
        context: val.type,
        context_item_id: val.jobId,
        status: "created",
        order_id:
          val.response?.data?.data[process.env.VITE_SCHOLARSHIPS_INSERT_ORDER]
            ?.returning?.[0]?.order_id,
      };
      // You can track this data by API call
      console.log("data", data);
    },
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
    onOrderIdGenerate: async (val) => {
      const data = {
        user_id: val?.userData.user_id,
        context: val?.type,
        context_item_id: val?.jobId,
        status: "created",
        order_id:
          val?.response?.data?.data[process.env.VITE_JOBS_INSERT_ORDER]
            ?.returning?.[0]?.order_id,
        provider_name: val?.item?.provider_name || "",
        item_name: val?.item?.title || "",
      };
      // You can track this data by API call
      console.log("data", data);
    },
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
    onOrderIdGenerate: async (val) => {
      const paramData = { url: "", type: "" };
      paramData.url =
        val.response.responses?.[0]?.message.order?.fulfillments?.[0]?.stops?.[0]?.instructions?.media?.[0]?.url;
      paramData.type =
        val.response.responses?.[0]?.message.order?.fulfillments?.[0]?.stops?.[0]?.type;
      const data = {
        user_id: `${val.userData.user_id}`,
        context: val.type,
        context_item_id: val.itemId,
        status: "created",
        order_id: val.response.responses?.[0]?.message.order.id,
        provider_name: val?.item?.provider_name || "",
        item_name: val?.item?.title || "",
        params: JSON.stringify(paramData),
      };
      // You can track this data by API call
      console.log("data", data);
    },
  },
};
