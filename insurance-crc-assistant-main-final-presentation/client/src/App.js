import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* ================= CONTEXT ================= */
import { ProfileProvider } from "./context/ProfileContext";
import { CompareProvider } from "./context/CompareContext";

/* ================= AUTH ================= */
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Otp from "./pages/Otp";
import ResetPassword from "./pages/ResetPassword";

/* ================= ROUTE GUARD ================= */
import ProtectedRoute from "./components/ProtectedRoute";

/* ================= LAYOUTS ================= */
import PageContainer from "./layout/PageContainer";
import AdminLayout from "./layout/AdminLayout";

/* ================= USER PAGES ================= */
import Home from "./pages/Home";
import PolicyCatalog from "./pages/PolicyCatalog";
import ProfilePage from "./pages/ProfilePage";
import SavedQuotes from "./pages/SavedQuotes";
import Recommendations from "./pages/Recommendations";
import RecommendedPolicies from "./pages/RecommendedPolicies";

/* ================= RECOMMENDATION FORMS ================= */
import HealthRecommendation from "./pages/HealthRecommendation";
import MotorRecommendation from "./pages/MotorRecommendation";
import LifeRecommendation from "./pages/LifeRecommendation";
import TravelRecommendation from "./pages/TravelRecommendation";
import HomeRecommendation from "./pages/HomeRecommendation";
import BusinessRecommendation from "./pages/BusinessRecommendation";
import FireRecommendation from "./pages/FireRecommendation";

/* ================= RECOMMENDATION RESULTS ================= */
import HealthRecResults from "./pages/HealthRecResults";
import LifeRecResults from "./pages/LifeRecResults";
import MotorRecResults from "./pages/MotorRecResults";
import HomeRecResults from "./pages/HomeRecResults";
import TravelRecResults from "./pages/TravelRecResults";
import FireRecResults from "./pages/FireRecResults";
import BusinessRecResults from "./pages/BusinessRecResults";

/* ================= POLICY DETAILS ================= */
import HealthPolicyDetails from "./pages/HealthPolicyDetails";
import MotorPolicyDetails from "./pages/MotorPolicyDetails";
import LifePolicyDetails from "./pages/LifePolicyDetails";
import HomePolicyDetails from "./pages/HomePolicyDetails";
import TravelPolicyDetails from "./pages/TravelPolicyDetails";
import BusinessPolicyDetails from "./pages/BusinessPolicyDetails";
import FirePolicyDetails from "./pages/FirePolicyDetails";
import PremiumCalculator from "./pages/PremiumCalculator";

/* ================= COMPARE & QUOTES ================= */
import ComparePolicies from "./pages/ComparePolicies";
import QuoteSummary from "./pages/QuoteSummary";

/* ================= CLAIMS ================= */
import ClaimsDashboard from "./pages/ClaimsDashboard";
import StartNewClaim from "./pages/StartNewClaim";
import FileNewClaimStep1 from "./pages/FileNewClaimStep1";
import FileNewClaimStep2 from "./pages/FileNewClaimStep2";
import ReviewClaimStep3 from "./pages/ReviewClaimStep3";
import ClaimSubmission from "./pages/ClaimSubmission";
import ClaimStatus from "./pages/ClaimStatus";
import TrackClaim from "./pages/TrackClaim";

/* ================= ADMIN CORE ================= */
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import AdminPolicies from "./pages/AdminPolicies";
import FlaggedClaims from "./pages/FlaggedClaims";
import FraudRulesEngine from "./pages/FraudRulesEngine";
import CreateFraudRule from "./pages/CreateFraudRule";
import EditFraudRule from "./pages/EditFraudRule";
import InvestigateClaim from "./pages/InvestigateClaim";
import Investigations from "./pages/Investigations";

/* ================= ADMIN POLICY CATALOG (YOUR FEATURE) ================= */
import AdminPolicyCatalog from "./pages/AdminPolicyCatalog";
import AddPolicy from "./pages/AddPolicy";
import EditPolicy from "./pages/EditPolicy";
import PolicyDetails from "./pages/PolicyDetails";
import SavedPolicies from "./pages/SavedPolicies";

/* ================= TEST ================= */
import TestFetch from "./pages/TestFetch";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <ProfileProvider>
        <CompareProvider>
          <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
            <BrowserRouter>
              <Routes>

                {/* ================= PUBLIC AUTH ================= */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/otp" element={<Otp />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* ================= ADMIN (PROTECTED) ================= */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="policies" element={<AdminPolicies />} />

                  {/* 🔥 ADMIN POLICY CATALOG */}
                  <Route path="policies/catalog" element={<AdminPolicyCatalog />} />
                  <Route path="policies/add" element={<AddPolicy />} />
                  <Route path="policies/view/:id" element={<PolicyDetails />} />
                  <Route path="policies/edit/:id" element={<EditPolicy />} />
                  <Route path="policies/saved" element={<SavedPolicies />} />

                  <Route path="flagged-claims" element={<FlaggedClaims />} />
                  <Route
                    path="flagged-claims/:claimId/investigate"
                    element={<InvestigateClaim />}
                  />

                  <Route path="fraud-rules" element={<FraudRulesEngine />} />
                  <Route path="fraud-rules/new" element={<CreateFraudRule />} />
                  <Route path="fraud-rules/:id/edit" element={<EditFraudRule />} />
                  <Route path="investigations" element={<Investigations />} />
                </Route>

                {/* ================= USER APP (PROTECTED) ================= */}
                <Route
                  element={
                    <ProtectedRoute>
                      <PageContainer />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<PolicyCatalog />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/saved-quotes" element={<SavedQuotes />} />

                  <Route path="/recommendations" element={<Recommendations />} />
                  <Route path="/recommendedPolicies" element={<RecommendedPolicies />} />

                  {/* Recommendation Forms */}
                  <Route path="/health_insurance_rec" element={<HealthRecommendation />} />
                  <Route path="/motor_insurance_rec" element={<MotorRecommendation />} />
                  <Route path="/life_insurance_rec" element={<LifeRecommendation />} />
                  <Route path="/travel_insurance_rec" element={<TravelRecommendation />} />
                  <Route path="/home_insurance_rec" element={<HomeRecommendation />} />
                  <Route path="/business_insurance_rec" element={<BusinessRecommendation />} />
                  <Route path="/fire_property_insurance_rec" element={<FireRecommendation />} />

                  {/* Recommendation Results */}
                  <Route path="/healthrecresults" element={<HealthRecResults />} />
                  <Route path="/liferecresults" element={<LifeRecResults />} />
                  <Route path="/motorrecresults" element={<MotorRecResults />} />
                  <Route path="/homerecresults" element={<HomeRecResults />} />
                  <Route path="/travelrecresults" element={<TravelRecResults />} />
                  <Route path="/firerecresults" element={<FireRecResults />} />
                  <Route path="/businessrecresults" element={<BusinessRecResults />} />

                  {/* Policy Details */}
                  <Route path="/policies/health/:id" element={<HealthPolicyDetails />} />
                  <Route path="/policies/motor/:id" element={<MotorPolicyDetails />} />
                  <Route path="/policies/life/:id" element={<LifePolicyDetails />} />
                  <Route path="/policies/home/:id" element={<HomePolicyDetails />} />
                  <Route path="/policies/travel/:id" element={<TravelPolicyDetails />} />
                  <Route path="/policies/business/:id" element={<BusinessPolicyDetails />} />
                  <Route path="/policies/fire/:id" element={<FirePolicyDetails />} />

                  <Route path="/premium-calculator" element={<PremiumCalculator />} />

                  {/* Compare & Quotes */}
                  <Route path="/compare" element={<ComparePolicies />} />
                  <Route path="/quote-summary" element={<QuoteSummary />} />

                  {/* Claims */}
                  <Route path="/claims" element={<ClaimsDashboard />} />
                  <Route path="/claims/start" element={<StartNewClaim />} />
                  <Route path="/claims/file/step1" element={<FileNewClaimStep1 />} />
                  <Route path="/claims/file/step2" element={<FileNewClaimStep2 />} />
                  <Route path="/claims/file/step3" element={<ReviewClaimStep3 />} />
                  <Route path="/claims/submitted" element={<ClaimSubmission />} />
                  <Route path="/claims/status" element={<ClaimStatus />} />
                  <Route path="/claims/track/:id" element={<TrackClaim />} />

                  {/* Test */}
                  <Route path="/test" element={<TestFetch />} />
                </Route>

                {/* ================= FALLBACK ================= */}
                <Route path="*" element={<h1>Page Not Found</h1>} />

              </Routes>
            </BrowserRouter>
          </div>
        </CompareProvider>
      </ProfileProvider>
    </div>
  );
}
