import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
  fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';

const API_URL = 'http://127.0.0.1:3000';

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
  switch (type) {
    case GET_LIST: {
      console.log("GET_LIST");
      let currLocation = localStorage.getItem('currentLocation');
      console.log("currentLocation: " + currLocation);
      console.log("params: " + JSON.stringify(params));
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
      };
      let returnedURL = null;
      console.log("URL = " + `${API_URL}/${resource}`);
      if(params.filter.nazwaprojektu !== undefined || params.filter.konkursid !== undefined) {
        let filterQuery = {filter: JSON.stringify(params.filter)};
        returnedURL = `${API_URL}/${resource}?${stringify(filterQuery)}`;
      } else {
        returnedURL = `${API_URL}/${resource}`;
      }
      return {
        url: returnedURL,
        options: { method: 'GET', headers: new Headers({
            "orgId": localStorage.getItem('orgId'),
            "currentLocation": currLocation,
          }) },
      };
      //return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case GET_ONE:
      console.log("GET_ONE");
      console.log("URL: " + `${API_URL}/${resource}/${params.id}`);
      return { url: `${API_URL}/${resource}/${params.id}` };
    case GET_MANY: {
      console.log("GET_MANY");
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      console.log("url: " + `${API_URL}/${resource}?${stringify(query)}`);
      return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case GET_MANY_REFERENCE: {
      console.log("GET_MANY_REFERENCE");
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
        filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
      };
      return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case UPDATE:
      console.log("UPDATE");
      console.log("body: " + JSON.stringify(params.data));
      return {
        url: `${API_URL}/${resource}/${params.id}`,
        options: { method: 'PUT', body: JSON.stringify(params.data) },
      };
    case CREATE:
      console.log("CREATE");
      params.data.authorId = localStorage.getItem('userId');
      console.log("authorId =" + params.data.authorId);
      console.log("CREATE: " + JSON.stringify(params.data));
      return {
        url: `${API_URL}/${resource}`,
        options: { method: 'POST', body: JSON.stringify(params.data) },
      };
    case DELETE:
      console.log("DELETE");
      return {
        url: `${API_URL}/${resource}/${params.id}`,
        options: { method: 'DELETE' },
      };
    default:
      console.log("DEFAULT");
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
  let { headers, json } = response;
  switch (type) {
    case GET_LIST:
      console.log("GET LIST convert, json: " + JSON.stringify(json));
      let newjson = [];
      let json2;
      let i2 = 0;
      if(json[0] !== undefined && json[0].nazwaprojektu !== undefined) {
        console.log('GET LIST: ' + json[0].nazwaprojektu);
        for(let i = 0; i < json.length; i++) {
          console.log(json[i].organizacjaid);
          console.log(localStorage.getItem('orgId'));
          if(json[i].organizacjaid == localStorage.getItem('orgId')) {
            newjson[i2] = json[i];
            i2++;
          } else if(localStorage.getItem('orgId') == 3) {
            newjson[i2] = json[i];
            i2++;
          }
        }
        json = newjson;
      }
      return {
        data: json,
        total: parseInt(headers.get('content-range').split('/').pop(), 10),
      };
    case CREATE:
      return { data: { ...params.data, id: json.id } };
    default:
      console.log("DEFAULT convert, json: " + JSON.stringify(json));
      return { data: json };
  }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
  const { fetchJson } = fetchUtils;
  const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
  return fetchJson(url, options)
      .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};