import axios from 'axios';

export default class Query {
  static get = (key) => {
    axios.get('http://31.36.123.215:1337/'+key)
    .then((response) => {
      return response.data
    })
    .catch(function (error) {
      return error
    });
  }

  static getUser = (key) => {
    axios.get('http://31.36.123.215:1337/user/'+key)
    .then((response) => {
      return response.data.user
    })
    .catch(function (error) {
      return error
    });
  }
}
