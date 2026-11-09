import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppShell from './layouts/AppShell';
import WelcomePage from './pages/WelcomePage';
import DashboardPage from './pages/DashboardPage';
import TranslationHubPage from './pages/TranslationHubPage';
import SignLearningPage from './pages/SignLearningPage';
import PracticeModePage from './pages/PracticeModePage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';

export default function App() {
  return (
    <Routes>
      {/* Public Auth / Onboarding Screen */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<WelcomePage />} />

      {/* Authenticated / Protected Workspace Shell */}
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/translation" element={<TranslationHubPage />} />
        <Route path="/learn" element={<SignLearningPage />} />
        <Route path="/practice" element={<PracticeModePage />} />
        <Route path="/profile" element={<ProfileSettingsPage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
