import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Page imports
import { LandingPage } from './pages/landing/LandingPage';
import { AboutPage } from './pages/landing/PlatformPage';
import { TeamPage } from './pages/landing/TeamPage';
import { AuthPage } from './pages/auth/AuthPage';

import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentAssessment } from './pages/student/StudentAssessment';
import { StudentSkills } from './pages/student/StudentSkills';
import { StudentCareer } from './pages/student/StudentCareer';
import { StudentOpportunities } from './pages/student/StudentOpportunities';
import { StudentApplications } from './pages/student/StudentApplications';
import { StudentPortfolio } from './pages/student/StudentPortfolio';
import { StudentOnboarding } from './pages/student/StudentOnboarding';

// Industry pages
import { IndustryDashboard } from './pages/industry/IndustryDashboard';
import { IndustryOpportunityCreate } from './pages/industry/IndustryOpportunityCreate';
import { IndustryCandidates } from './pages/industry/IndustryCandidates';
import { IndustryPrograms } from './pages/industry/IndustryPrograms';

// Institution pages
import { InstitutionDashboard } from './pages/institution/InstitutionDashboard';
import { InstitutionStudentRoster } from './pages/institution/InstitutionStudentRoster';

// Academician pages
import { AcademicianDashboard } from './pages/academician/AcademicianDashboard';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, search]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Landing & Public Auth Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />

            {/* Student Role Pages */}
            <Route 
              path="/student/onboarding" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentOnboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentPortfolio />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/assessment" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentAssessment />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/skills" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentSkills />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/career" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentCareer />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/opportunities" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentOpportunities />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/applications" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentApplications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/portfolio" 
              element={
                <ProtectedRoute allowedRole="student">
                  <StudentPortfolio />
                </ProtectedRoute>
              } 
            />

            {/* Industry Role Pages */}
            <Route 
              path="/industry/dashboard" 
              element={
                <ProtectedRoute allowedRole="industry">
                  <IndustryDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/industry/opportunities/create" 
              element={
                <ProtectedRoute allowedRole="industry">
                  <IndustryOpportunityCreate />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/industry/candidates" 
              element={
                <ProtectedRoute allowedRole="industry">
                  <IndustryCandidates />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/industry/programs" 
              element={
                <ProtectedRoute allowedRole="industry">
                  <IndustryPrograms />
                </ProtectedRoute>
              } 
            />

            {/* Institution Role Pages */}
            <Route 
              path="/institution/dashboard" 
              element={
                <ProtectedRoute allowedRole="institution">
                  <InstitutionDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/institution/students" 
              element={
                <ProtectedRoute allowedRole="institution">
                  <InstitutionStudentRoster />
                </ProtectedRoute>
              } 
            />

            {/* Academician Role Pages */}
            <Route 
              path="/academician/dashboard" 
              element={
                <ProtectedRoute allowedRole="academician">
                  <AcademicianDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Fallback Route redirects back to Landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
