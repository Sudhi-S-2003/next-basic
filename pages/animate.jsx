import React from 'react'
import CodePreviewWithCopy from '../components/CodeSpace/CodePreviewWithCopy'
import buttondata from "../components/CodeSpace/data"

function animate() {
    const toFirstCapital = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-center text-3xl mb-6">React Animate Components</h1>
            <div className='grid sm:grid-col-2 md:grid-cols-3 gap-6'>
                {buttondata.map((dataobj, index) => {
                    const formattedName = dataobj.name.split(" ").map(toFirstCapital).join("");
                    return (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-center font-semibold text-xl mb-4">{dataobj.name}</h2>
                            <CodePreviewWithCopy 
                                key={index}
                                code={dataobj.code}
                                name={formattedName}
                                externalComponents={[
                                    { variable: "React", library: "react" },
                                ]}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default animate;
