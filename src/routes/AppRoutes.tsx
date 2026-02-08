import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "../components/Loading";
import LoginPage from "../pages/LoginPage";
import PredictionsPage from "../pages/PredictionsPage";
import RealTimePage from "../pages/RealTimePage";
import UploadFilePage from "../pages/UploadFilePage";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/predictions"
          element={
            <ProtectedRoute>
              <PredictionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/in-real-time"
          element={
            <ProtectedRoute>
              <RealTimePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-file"
          element={
            <ProtectedRoute>
              <UploadFilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/predictions" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
