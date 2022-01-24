import http from "./httpService";

const apiEndpoint = "/products";

export function getProducts() {
  return http.get(apiEndpoint);
}

export function getImage(imgEndPoint) {
  return http.get(imgEndPoint, {
    responseType: "blob",
  });
}
