import axios from "axios";
import instances from "../../resources/instances.json";

class HttpRequestManager {
    static makeRequest(verb, uri, data = "", isAuthValid = true) {
        let instance = null;

        switch (isAuthValid) {
            case false:
                instance = axios.create(instances.InvalidCredentials);
                break;
            default:
                instance = axios.create(instances.ValidCredentials);
                break;
        }

        switch (verb) {
            case "GET":
                return instance.get(
                    `${instance.defaults.baseURL}/wp-json/wp/v2/${uri}`,
                    instance.defaults.auth
                );
            case "POST":
                return instance.post(
                    `${instance.defaults.baseURL}/wp-json/wp/v2/${uri}`,
                    data,
                    instance.defaults.auth
                );
            case "PUT":
                return instance.put(
                    `${instance.defaults.baseURL}/wp-json/wp/v2/${uri}`,
                    data,
                    instance.defaults.auth
                );
            case "DELETE":
                return instance.delete(
                    `${instance.defaults.baseURL}/wp-json/wp/v2/${uri}`,
                    instance.defaults.auth
                );
            case "DELETE_USER":
                return instance.delete(`${instance.defaults.baseURL}/wp-json/wp/v2/${uri}`, data, instance.defaults.auth)
            case "DELETE_CATEGORY":
                return instance.delete(`${instance.defaults.baseURL}/wp-json/wp/v2/${uri}`, data, instance.defaults.auth)
        }
    }
}

export default HttpRequestManager
