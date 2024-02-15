const TextViewer = ({textData}) =>{
    return (
        <div className="container mx-auto p-4">
            <div className="mt-4 p-4 w-[1000px] h-[1000px] overflow-x-scroll">
               {textData}
            </div>
        </div>
    )
}

export default TextViewer