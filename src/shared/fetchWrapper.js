import router from "@/router";

function prepareUrl(url) {
  if (url.startsWith("http")) return url;
  return `http://45.84.227.122:8080/api/${url}`;
}

function handleRequest(method, url, headers, attempts, body, type) {
  return new Promise((resolve, reject) => {
    (function internalRequest() {
      return request(method, url, headers, body, type)
        .then(resolve)
        .catch((err) => (--attempts > 0 ? internalRequest() : reject(err)));
    })();
  })
    .then((res) => {
      if (res.status === 401) {
        localStorage.removeItem("tokenAccess");
        return router.push("/login");
      } else if (res) return res.json();
    })
    .catch((err) => {
      return err;
    });
}

/**
 * Request
 * @param {string} method - method name
 * @param {string} url - endpoint url.
 * @param {object} body - request body.
 * @param {object} headers - request headers
 * @param {string} type - request type
 */
function request(method, url, headers = {}, body, type = "") {
  let token = localStorage.getItem("tokenAccess");
  let requestOptions = {};
  if (method === "GET" || method === "DELETE") {
    requestOptions = {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    };
  }
  if (method === "POST" || method === "PUT") {
    if (type && type === "formData") {
      requestOptions = {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          ...headers,
        },
        body: body,
      };
    } else
      requestOptions = {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      };
  }

  return fetch(prepareUrl(url), requestOptions);
}

function get(url, headers, attempts = 3) {
  return handleRequest("GET", url, headers, attempts, null);
}

function del(url, headers, attempts = 3) {
  return handleRequest("DELETE", url, headers, attempts, null);
}

function post(url, body, type, headers, attempts = 3) {
  return handleRequest("POST", url, headers, attempts, body, type);
}

function put(url, headers, body, attempts = 3) {
  return handleRequest("PUT", url, headers, attempts, null, body);
}

export const fetchWrapper = {
  get,
  del,
  post,
  put,
};
