import axios from 'axios';

const fetchLearningData = async () => {
  try {
    const response = await axios.post(
      'https://onest-bap.tekdinext.com/dsep/search',
      {
        'context': {
          'domain': 'onest:learning-experiences',
          'action': 'search',
          'version': '1.1.0',
          'bap_id': '13.201.4.186:6002',
          'bap_uri': 'http://13.201.4.186:6002/',
          'location': {
            'country': {
              'name': 'India',
              'code': 'IND'
            },
            'city': {
              'name': 'Bangalore',
              'code': 'std:080'
            }
          },
          'transaction_id': 'a9aaecca-10b7-4d19-b640-b047a7c60008',
          'message_id': 'a9aaecca-10b7-4d19-b640-b047a7c60009',
          'timestamp': '2023-02-06T09:55:41.161Z'
        },
        'message': {
          'intent': {
            'item': {
              'descriptor': {
                'name': ''
              }
            }
          }
        }
      },
      {
        headers: {
          'Accept-Language': 'en-US,en;q=0.9,mr;q=0.8,hi;q=0.7',
          'Access-Control-Allow-Origin': '*',
          'Connection': 'keep-alive',
          'Origin': 'https://kahanipitara.tekdinext.com',
          'Referer': 'https://kahanipitara.tekdinext.com/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching learning data:', error);
    throw error; // Optionally rethrow the error to handle it elsewhere
  }
};

export default fetchLearningData;
