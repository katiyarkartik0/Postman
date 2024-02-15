import React, { useState } from 'react';

const JsonViewer = ({ jsonData }) => {
    const [openNodes, setOpenNodes] = useState({});
    const handleToggle = (key) => {
        setOpenNodes({
            ...openNodes,
            [key]: !isOpen(key),
        });
    };

    const isOpen = (key) => {
        return openNodes[key];
    };

    const renderJSON = (data) => {
        return (
            <ul className="ml-4">
                {Object.entries(data).map(([key, value]) => (
                    <li key={key}>
                        <span
                            className="cursor-pointer"
                            onClick={() => handleToggle(key)}
                        >
                            {typeof value === 'object' ? (
                                (() => isOpen(key) ? (<span className="font-bold">&darr; {key}</span>) : (<span className="font-bold">&rarr; {key}</span>))()
                            ) : (
                                <span>{`${key}: ${value}`}</span>
                            )}
                        </span>
                        {typeof value === 'object' && isOpen(key) && renderJSON(value)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mt-4">
                {jsonData && (
                    <div className="border border-gray-300 rounded p-4">
                        {renderJSON(jsonData)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JsonViewer;
