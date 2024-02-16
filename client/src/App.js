import React, { useEffect, useState } from 'react';
import { deleteRoute, getRoute, postRoute, putRoute } from './api/request';
import JsonViewer from './Components/JsonViewer';
import TextViewer from './Components/TextViewer';
import { getHistory } from './api/history';
import History from './Components/History';

function sanitizeRequestBody(input) {
  if (!input) {
    return { body: {}, error: false }
  }
  const cleanedInput = input.replace(/\s/g, "");

  try {
    return { body: JSON.parse(cleanedInput), error: false }
  }
  catch (err) {
    return { error: true, msg: err }
  }
}

function sanitizeRequestHeaders(input) {
  const headers = {};
  input.forEach(({ key, value }) => { if (key) { headers[key] = value } });
  return headers;
}

const App = () => {
  const [apiRoute, setApiRoute] = useState('');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [responseData, setresponseData] = useState({ responseType: "JSON", response: {} });
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const fetchistory = async () => {
      const resp = await getHistory();
      const { history } = await resp.json();
      setHistory(history);
    }

    fetchistory()

  }, [responseData])


  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index, key, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = { key, value };
    setHeaders(updatedHeaders);
  };

  const handleRemoveHeader = (index) => {
    const updatedHeaders = headers.filter((_, i) => i !== index);
    setHeaders(updatedHeaders);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const { body, error, msg } = sanitizeRequestBody(requestBody)
    if (error) {
      alert(msg);
      console.log(msg)
      return;
    }
    const headersObject = sanitizeRequestHeaders(headers);
    const requestData = {
      route: apiRoute,
      method,
      body,
      headers: headersObject,
    };
    try {
      let response;
      setIsLoading(true)
      if (method === "DELETE") {
        response = await deleteRoute({ requestData });
      }
      else if (method === "GET") {
        response = await getRoute({ requestData });
      }
      else if (method === "POST") {
        response = await postRoute({ requestData });
      }
      else if (method === "PUT") {
        response = await putRoute({ requestData });
      }

      const { response: resp, isResponseText, status } = await response.json();
      if (!isResponseText) {
        setresponseData(() => ({ responseType: "JSON", response: resp, status }))
      }
      else {
        setresponseData(() => ({ responseType: "TEXT", response: resp, status }))
      }
      setIsLoading(false)
    }
    catch (error) {
      console.log(error)
      alert(error)
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className='flex'>
          <select
            className="block m-2 p-2 border rounded"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input
            type="text"
            placeholder="API Route"
            className="m-2 p-2 w-full border rounded"
            value={apiRoute}
            onChange={(e) => setApiRoute(e.target.value)}
          />
        </div>

        <div className='flex flex-wrap'>
          <textarea
            placeholder="Request Body (JSON)"
            className="w-1/2 m-2 p-2 border rounded"
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
          />
          <div className="m-2">
            {headers.map((header, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  placeholder="Key"
                  className="mr-2 p-2 border rounded"
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, e.target.value, header.value)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  className="mr-2 p-2 border rounded"
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, header.key, e.target.value)}
                />
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => handleRemoveHeader(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded"
              onClick={handleAddHeader}
            >
              Add Header
            </button>
          </div></div>

        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Send Request
        </button>
      </form>
      <p>{isLoading ? "Loading..." : <></>}</p>
      <p>{responseData.responseType}</p>
      {responseData.responseType === "JSON" ? <JsonViewer jsonData={responseData.response} status={responseData.status} /> : <TextViewer textData={responseData.response} status={responseData.status} />}
      <History history={history} />
    </div>
  );
};

export default App;
