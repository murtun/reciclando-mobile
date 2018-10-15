import axios from 'axios';

const URL = 'http://34.213.11.120/organizations/{organization}/users';

export default (token, organization) =>
  axios.get(URL.replace('{organization}', organization), {
    headers: {
      ApiKey: `${token}`,
    },
  });
