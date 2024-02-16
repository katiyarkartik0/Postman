const History = ({ history = [] }) => {
    console.log(history)
    return (
        <>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">Requests List</h1>
                <div className="grid grid-cols-1 gap-4">
                    {history.map((request, index) => (
                        <div key={index} className="border rounded p-4">
                            <h2 className="text-xl font-semibold mb-2">{request.request}</h2>
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Route:</span> {request.route}</p>
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Body:</span> {JSON.stringify(request.body)}</p>
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Headers:</span> {JSON.stringify(request.headers)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default History