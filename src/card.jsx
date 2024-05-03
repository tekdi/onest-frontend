export const dataConfig = {

"scholarship" : {

    "title": "",
    "link":"https://scholarship-api-dev.tekdinext.com/content/search",
    "responsekey" : "scholarship_cache",
    "filters": {
        "provider_name": ["Option 1", "Option 2", "Option 3"],
        "fulfillments": ["Option A", "Option B", "Option C"]
      }

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

    }
},
"learning" : {

    "title": "",
    "link":"https://onest-bap.tekdinext.com/dsep/search",
    "responsekey" : "learning"
}
}