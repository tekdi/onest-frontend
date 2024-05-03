export const dataConfig = {

"scholarship" : {

    "title": "",
    "link":"https://scholarship-api-dev.tekdinext.com/content/search",
    "responsekey" : "scholarship_cache",
    "filters": {
        "provider_name": ["Option 1", "Option 2", "Option 3"],
        "fulfillments": ["Option A", "Option B", "Option C"]
      },
    "apiLink_DB_CACHE" : "scholarship_cache",
    "apiLink_RESPONSE_DB" : "response_cache_dev",
    "apiLink_DOMAIN" : "onest:financial-support",
    "apiLink_BAP_ID" : "scholarship-bap-dev.tekdinext.com",
    "apiLink_BAP_URI" : "https://scholarship-bap-dev.tekdinext.com/",
    "apiLink_API_BASE_URL" : "https://scholarship-api-dev.tekdinext.com",
    "apiLink_BASE_URL" : "https://scholarship-client-dev.tekdinext.com"

},

"jobs" : {

    "title": "",
    "link":"https://jobs-api.tekdinext.com/jobs/search",
    "responsekey" : "jobs_cache",
    "filters": {
        "city": ["Option 1", "Option 2", "Option 3"],
        "state" : ["Option 1", "Option 2", "Option 3"],
        "qualification": ["Option 1", "Option 2", "Option 3"],
        "experience": ["Option 1", "Option 2", "Option 3"],
        "gender" : ["Option 1", "Option 2", "Option 3"],
        "age_criteria" : ["Option 1", "Option 2", "Option 3"]

    },

    "apiLink_DB_CACHE" : "jobs_cache_dev",
    "apiLink_RESPONSE_DB" : "response_cache_dev",
    "apiLink_DOMAIN" : "onest:work-opportunities",
    "apiLink_BAP_ID" : "jobs-bap-dev.tekdinext.com",
    "apiLink_BAP_URI" : "https://jobs-bap-dev.tekdinext.com/",
    "apiLink_API_BASE_URL" : "https://jobs-api-dev.tekdinext.com",
    "apiLink_BASE_URL" : "https://onest-fs-bap-client.tekdinext.com",
    "apiLink_SUNBIRD_API" : "https://sunbirdsaas.com/api/content/v1/read",
    "apiLink_DIKSHA_API" : "https://diksha.gov.in/api/content/v1/read",
    "apiLink_IMAGE_URL" : "https://kvk-nashik.tekdinext.com"
},
"learning" : {

    "title": "",
    "link":"https://onest-bap.tekdinext.com/dsep/search",
    "responsekey" : "learning",


    "apiLink_DB_CACHE" : "kahani_cache",
    "apiLink_API_ROUTE" : "content",
    "apiLink_DOMAIN" : "onest:learning-experiences",
    "apiLink_BAP_ID" : "13.201.4.186:6002",
    "apiLink_BAP_URI" : "http://13.201.4.186:6002/",
    "apiLink_API_BASE_URL" : "https://kahani-api.tekdinext.com",
    "apiLink_BASE_URL" : "https://onest-fs-bap-client.tekdinext.com"
}
}