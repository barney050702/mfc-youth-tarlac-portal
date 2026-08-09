import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Import Views
import DashboardView from './components/views/DashboardView';
import MembersView from './components/views/MembersView';
import AttendanceView from './components/views/AttendanceView';
import ResourcesView from './components/views/ResourcesView';
import FundsView from './components/views/FundsView';
import AnalyticsView from './components/views/AnalyticsView';
import ActivitiesView from './components/views/ActivitiesView';
import AccountView from './components/views/AccountView';
import AgendaView from './components/views/AgendaView';
import MemberDashboardView from './components/views/MemberDashboardView';
import OrgChartView from './components/views/OrgChartView';
import Login from './components/views/Login';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Route */}
                <Route path="/login" element={<Login />} />

                {/* Main App Layout */}
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<DashboardView />} />
                    <Route path="dashboard" element={<DashboardView />} />
                    <Route path="member-dashboard" element={<MemberDashboardView />} />
                    <Route path="activities" element={<ActivitiesView />} />
                    <Route path="agenda" element={<AgendaView />} />
                    <Route path="attendance" element={<AttendanceView />} />
                    <Route path="members" element={<MembersView />} />
                    <Route path="analytics" element={<AnalyticsView />} />
                    <Route path="funds" element={<FundsView />} />
                    <Route path="resources" element={<ResourcesView />} />
                    <Route path="orgchart" element={<OrgChartView />} />
                    <Route path="account" element={<AccountView />} />
                    
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
