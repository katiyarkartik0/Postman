import ENDPOINT from "../helpers/constants";

export const getHistory = async () =>
    await fetch(`${ENDPOINT}/api/history/get`, {
        method: "GET",
    });