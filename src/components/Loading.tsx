const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center justify-center"></div>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
    </div>
  );
};

export default Loading;
