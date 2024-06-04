import { createTrackData, getTrackData } from "../Services/APIcalls/apicalls";

export const dataConfig = {
  scholarship: {
    title: "Scholarship",
    searchByKey: "title",
    listLink: "scholarship",
    filters: ["provider_name"],

    apiLink_DB_CACHE: "scholarship_cache",
    apiLink_RESPONSE_DB: "response_cache_dev",
    apiLink_DOMAIN: "onest:financial-support",
    apiLink_BAP_ID: process.env.REACT_APP_SCHOLARSHIPS_BAP_ID,
    apiLink_BAP_URI: process.env.REACT_APP_SCHOLARSHIPS_BAP_URI,
    apiLink_API_BASE_URL: process.env.REACT_APP_SCHOLARSHIPS_BASE_URL,
    imageUrl: "",
    apiResponse: (e) => e.data.data.scholarship_cache,
    getTelemetry: (type, data) => {
      console.log(data);
    },
    getSartTelemetry: (data) => {
      // start(data);
      console.log(data);
    },
    getIntractTelemetry: (data) => {
      // interact(data);
      console.log(data);
    },
    onOrderIdGenerate: async (val) => {
      console.log("val", val);
      const data = {
        user_id: `${val.userData.user_id}`,
        context: val.type,
        context_item_id: val.jobId,
        status: "created",
        order_id:
          val.response.data.data.insert_scholarship_order_dev.returning[0]
            .order_id,
      };
      await createTrackData(data);
    },
  },
  // commented for now
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

    apiLink_DB_CACHE: "jobs_cache_dev",
    apiLink_RESPONSE_DB: "response_cache_dev",
    apiLink_DOMAIN: "onest:work-opportunities",
    apiLink_BAP_ID: "jobs-bap-dev.tekdinext.com",
    apiLink_BAP_URI: "https://jobs-bap-dev.tekdinext.com/",
    apiLink_API_BASE_URL: "https://jobs-api-dev.tekdinext.com",
    apiLink_API_LIST_URL: "https://jobs-api-dev.tekdinext.com/jobs/search",
    apiLink_SUNBIRD_API: "https://sunbirdsaas.com/api/content/v1/read",
    apiLink_DIKSHA_API: "https://diksha.gov.in/api/content/v1/read",
    apiLink_IMAGE_URL: "https://kvk-nashik.tekdinext.com",

    imageUrl: "",
    apiResponse: (e) => e.data.data.jobs_cache_dev,
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
    title: "Learning",
    searchByKey: "title",
    listLink: "learning",
    filters: ["competency", "goal", "language", "domain"],
    imageUrl: "",

    apiLink_DB_CACHE: "kahani_cache_dev",
    apiLink_API_ROUTE: "content",
    apiLink_DOMAIN: "onest:learning-experiences",
    apiLink_BAP_ID: process.env.REACT_APP_LEARNINGS_BAP_ID,
    apiLink_BAP_URI: process.env.REACT_APP_LEARNINGS_BAP_URI,
    apiLink_API_BASE_URL: process.env.REACT_APP_LEARNINGS_BASE_URL,
    apiResponse: (e) => e.data.data.kahani_cache_dev,
    getVisitTelemetry: (data) => {
      console.log(data);
    },
    getSartTelemetry: (data) => {
      // start(data);
      console.log(data);
    },
    getIntractTelemetry: (data) => {
      // interact(data);
      console.log(data);
    },
    getTrackData: async (e) => {
      const data = {
        context: e?.type || "",
        context_item_id: e?.itemId,
        user_id: e?.user_id,
      };
      let result = await getTrackData({ filters: data });
      return {
        ...result?.data?.[0],
        params: result?.data?.[0]?.params
          ? JSON.parse(result?.data?.[0]?.params)
          : {},
      };
    },
    onOrderIdGenerate: async (val) => {
      const paramData = { url: "", type: "" };
      paramData.url =
        val.response.responses[0].message.order.items[0][
          "add-ons"
        ][0].descriptor.media[0].url;
      const list =
        val.response.responses[0].message.order.items[0].tags[0].descriptor
          .list;
      list.forEach((item) => {
        // Check if the descriptor code is "urlType"
        if (item.descriptor.code === "urlType") {
          // If found, extract the value associated with it
          paramData.type = item.value;
        }
      });
      const data = {
        user_id: `${val.userData.user_id}`,
        context: val.type,
        context_item_id: val.itemId,
        status: "created",
        order_id: val.response.responses[0].message.order.id,
        provider_name: val?.item?.provider_name || "",
        item_name: val?.item?.title || "",
        params: JSON.stringify(paramData),
      };
      await createTrackData(data);
    },

    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "en-US,en;q=0.9",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive",
      "Content-Length": "0",
      Origin: "https://lexp-dev.tekdinext.com",
      Referer: "https://lexp-dev.tekdinext.com/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "sec-ch-ua":
        '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
    },
  },
};
