<div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Stack Visualizer</h1>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handlePush}>Push</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handlePop} disabled={stack.isEmpty()}>Pop</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleClear} disabled={stack.isEmpty()}>Clear</button>
      </div>

      {/* Stack Visualization with Animation */}
      <div className="mt-6 flex flex-col-reverse items-center border border-gray-400 p-4 rounded-md">
  
      </div>
    </div>