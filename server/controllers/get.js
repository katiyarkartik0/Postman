const History = require("../models/history");

const getRequest = async (req, res) => {
    const { route, headers } = req.body
    try {
        const newHistory = new History({
            request:"GET",
            route,
            headers
          });
        
        await newHistory.save();

        const response = await fetch(`${route}`, {
            method: "GET",
            headers: headers,
        });

        const status = response.status;
        const responseHeaders = response.headers;
        const isResponseText = response.headers.get('Content-Type').includes("text/html");
        let result;
        if (isResponseText) {
            result = await response.text();
        }
        else {
            result = await response.json();
        }
        return res.status(200).json({ response: result, status, responseHeaders,isResponseText });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "please provide valid request body" });
    }
}

module.exports = { getRequest }