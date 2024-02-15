import ENDPOINT from "../helpers/constants";

export const deleteRoute = async ({ requestData }) =>
    await fetch(`${ENDPOINT}/api/request/delete`, {
        headers: {
            "Content-Type": "application/json",
          },
        method: "POST",
        body: JSON.stringify(requestData)
    });

export const getRoute = async ({ requestData }) =>
    await fetch(`${ENDPOINT}/api/request/get`, {
        headers: {
            "Content-Type": "application/json",
          },
        method: "POST",
        body: JSON.stringify(requestData)
    });