const BottomCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Key Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg bg-green-50 border-green-200">
          <h3 className="font-medium text-green-800 mb-1">
            Vegetation Improvement
          </h3>
          <p className="text-2xl font-bold text-green-600">+12.3%</p>
          <p className="text-sm text-green-700 mt-1">Year over year increase</p>
        </div>

        <div className="p-4 border rounded-lg bg-red-50 border-red-200">
          <h3 className="font-medium text-red-800 mb-1">Carbon Emissions</h3>
          <p className="text-2xl font-bold text-red-600">-8.7%</p>
          <p className="text-sm text-red-700 mt-1">Year over year decrease</p>
        </div>

        <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
          <h3 className="font-medium text-blue-800 mb-1">
            Projected Reduction
          </h3>
          <p className="text-2xl font-bold text-blue-600">15.2%</p>
          <p className="text-sm text-blue-700 mt-1">By end of year</p>
        </div>
      </div>
    </div>
  );
};

export default BottomCard;
