import {
  AlertCircle,
  Calendar,
  CheckCircle,
  MapPin,
  Upload,
} from "lucide-react";
import React, { useState } from "react";

const zones = [
  {
    id: 1,
    name: "Incheon Songdo-dong",
    lat: 37.3944,
    lng: 126.6328,
  },
  { id: 2, name: "Jeju-do", lat: 33.4996, lng: 126.5312 },
  { id: 3, name: "Busan", lat: 35.1796, lng: 129.0756 },
  { id: 4, name: "Sokcho", lat: 38.2056, lng: 128.5914 },
  { id: 5, name: "Chuncheon", lat: 37.8813, lng: 127.7298 },
  {
    id: 6,
    name: "Gwangju",
    lat: 35.1595,
    lng: 126.8526,
  },
  {
    id: 7,
    name: "Daejeon",
    lat: 36.3504,
    lng: 127.3845,
  },
  {
    id: 8,
    name: "Ulsan",
    lat: 35.5384,
    lng: 129.3114,
  },
];

const UploadFilePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState<(typeof zones)[0] | null>(
    null
  );
  const [customCoordinates, setCustomCoordinates] = useState({
    lat: "",
    lng: "",
  });
  const [uploadDate, setUploadDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Filter zones based on search term
  const filteredZones = zones.filter((zone) =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create preview URL for image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleZoneSelect = (zone: (typeof zones)[0]) => {
    setSelectedZone(zone);
    setSearchTerm(zone.name);
    setCustomCoordinates({
      lat: zone.lat.toString(),
      lng: zone.lng.toString(),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !selectedZone) {
      return;
    }

    setUploadStatus("uploading");

    // Simulate upload with timeout
    setTimeout(() => {
      // In a real app, this would be an API call to upload the file
      setUploadStatus("success");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">
          Upload Satellite Image
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Satellite Image
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 ${
                    selectedFile
                      ? "border-green-300 bg-green-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  {!selectedFile ? (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          Drag and drop your file here, or
                        </p>
                        <label className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                          Browse Files
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, TIFF up to 10MB
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-16 rounded overflow-hidden bg-gray-100">
                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {selectedFile.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-4 text-sm font-medium text-red-600 hover:text-red-800"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Zone Selection */}
              <div>
                <label
                  htmlFor="zone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Zone
                </label>
                <div className="relative">
                  <div className="flex items-center">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={16} className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="zone"
                        className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search for a zone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="ml-3">
                      <label htmlFor="date" className="sr-only">
                        Date
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={16} className="text-gray-500" />
                        </div>
                        <input
                          type="date"
                          id="date"
                          className="block w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          value={uploadDate}
                          onChange={(e) => setUploadDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {searchTerm && filteredZones.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base max-h-60 overflow-auto focus:outline-none sm:text-sm">
                      {filteredZones.map((zone) => (
                        <div
                          key={zone.id}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                          onClick={() => handleZoneSelect(zone)}
                        >
                          <div className="flex items-center">
                            <span className="font-medium block truncate">
                              {zone.name}
                            </span>
                          </div>
                          <span className="text-gray-500 block text-xs">
                            {zone.lat.toFixed(4)}°, {zone.lng.toFixed(4)}°
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="latitude"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Latitude
                  </label>
                  <input
                    type="text"
                    id="latitude"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. -3.4653"
                    value={customCoordinates.lat}
                    onChange={(e) =>
                      setCustomCoordinates({
                        ...customCoordinates,
                        lat: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="longitude"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Longitude
                  </label>
                  <input
                    type="text"
                    id="longitude"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. -62.2159"
                    value={customCoordinates.lng}
                    onChange={(e) =>
                      setCustomCoordinates({
                        ...customCoordinates,
                        lng: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={
                    !selectedFile ||
                    !selectedZone ||
                    uploadStatus === "uploading"
                  }
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    !selectedFile ||
                    !selectedZone ||
                    uploadStatus === "uploading"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  }`}
                >
                  {uploadStatus === "uploading" ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\"
                        xmlns="http://www.w3.org/2000/svg\"
                        fill="none\"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25\"
                          cx="12\"
                          cy="12\"
                          r="10\"
                          stroke="currentColor\"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    "Upload Image"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Upload Status & Info */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Upload Status
            </h2>

            <div className="space-y-4">
              {uploadStatus === "idle" && (
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <Upload size={24} className="text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">
                      Ready to Upload
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Select a file and complete the form to upload.
                    </p>
                  </div>
                </div>
              )}

              {uploadStatus === "uploading" && (
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <svg
                      className="animate-spin h-6 w-6 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Uploading...
                    </h3>
                    <p className="text-xs text-blue-700 mt-1">
                      Your file is being uploaded. Please wait.
                    </p>
                  </div>
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <CheckCircle size={24} className="text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Upload Successful
                    </h3>
                    <p className="text-xs text-green-700 mt-1">
                      Your image has been uploaded and will be processed.
                    </p>
                  </div>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="flex items-center p-4 bg-red-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <AlertCircle size={24} className="text-red-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Upload Failed
                    </h3>
                    <p className="text-xs text-red-700 mt-1">
                      There was an error uploading your file. Please try again.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-800 mb-2">Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Images should be in PNG, JPG, or TIFF format</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Maximum file size: 10MB</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Satellite images should be georeferenced</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>For best results, use cloud-free images</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Processing may take up to 15 minutes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFilePage;
