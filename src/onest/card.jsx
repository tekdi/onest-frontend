import "./styles.css";
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
    render: (obj) => {
      const getDates = (range) => {
        const formatDate = (date) => {
          const options = { day: "2-digit", month: "short", year: "numeric" };
          return new Date(date).toLocaleDateString("en-GB", options);
        };
        return `${formatDate(range.start)} to ${formatDate(range.end)}`;
      };

      const getMinEligibilityValue = (data) => {
        const academicEligibility = data.find(
          (item) => item.descriptor.code === "academic-eligibility"
        );
        if (academicEligibility && academicEligibility.list.length > 0) {
          const minEligibility = academicEligibility?.list
            ?.map((item) => item.value)
            .join(", ");
          return minEligibility;
        }
        return "-";
      };
      return (
        <div className="container">
          {obj?.image_url && (
            <img className="image" src={obj.image_url} alt="no IMAGE" />
          )}
          <div className="title">{obj?.title}</div>
          <div className="row">
            <i className="icon">🏢</i> {/* Replace with appropriate icon */}
            <div className="text">
              {obj?.descriptor?.name
                ? obj?.descriptor?.name
                : "Provider name not mentioned"}
            </div>
          </div>
          <div className="row">
            <i className="icon">💼</i> {/* Replace with appropriate icon */}
            <div className="text">{getMinEligibilityValue(obj.item.tags)}</div>
          </div>
          <div className="row">
            <i className="icon">📅</i> {/* Replace with appropriate icon */}
            <div className="text">{getDates(obj.item.time.range)}</div>
          </div>
          <div className="row">
            <div className="price-symbol">₹</div>
            <div className="price">
              {obj.item?.price?.value ? obj.item.price.value : "-"}
            </div>
          </div>
        </div>
      );
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
    render: (obj) => {
      console.log("obj", obj);
      const getSalaryInfo = (data) => {
        // Find the object with descriptor.code === "salary-info"
        const salaryInfo = data.find(
          (item) => item.descriptor.code === "salary-info"
        );
        // If the object is found, proceed to return the values of list[0] and list[1]
        if (salaryInfo && salaryInfo.list.length >= 2) {
          const minSalary = salaryInfo.list[0].value;
          const maxSalary = salaryInfo.list[1].value;
          return `Rs. ${minSalary} - Rs. ${maxSalary}`;
        }
        // Return null if the object or required list items are not found
        return "As per Industry Standards";
      };
      return (
        <div className="container">
          {obj?.image_url && (
            <img className="image" src={obj.image_url} alt="no IMAGE" />
          )}
          <div className="title">{obj?.title}</div>
          <div className="row">
            <i className="icon">🏢</i> {/* Replace with appropriate icon */}
            <div className="text">
              {obj?.item?.creator?.descriptor?.name
                ? obj?.item?.creator?.descriptor?.name
                : "Company name not mentioned"}
            </div>
          </div>
          <div className="row">
            <i className="icon">📍</i> {/* Replace with appropriate icon */}
            <div className="text">{`${obj.city}, ${obj.state}`}</div>
          </div>
          <div className="row">
            <i className="icon">💼</i> {/* Replace with appropriate icon */}
            <div className="text">
              {obj.fulfillments ? obj.fulfillments : "-"}
            </div>
          </div>
          <div className="row">
            <div className="price-symbol">₹</div>
            <div className="price">{getSalaryInfo(obj.item.tags)}</div>
          </div>
        </div>
      );
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
    render: (obj) => {
      return (
        <div
          className="container"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div>
            {obj?.image_url && (
              <img className="image" src={obj.image_url} alt="no IMAGE" />
            )}
          </div>
          <div>
            <div className="title">{obj?.title}</div>
            <div className="row">
              <strong>Published By:</strong>
              <div className="text">
                {obj?.provider_name
                  ? obj?.provider_name
                  : "Provider name not mentioned"}
              </div>
            </div>
            <div className="row">
              <strong>Description:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: obj.shortDescription
                    ? obj.shortDescription
                    : obj.description
                    ? obj.description.substring(0, 100) + "..."
                    : "",
                }}
              />
            </div>
          </div>
        </div>
      );
    },
  },
};
