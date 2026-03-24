
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  CreditCard, 
  ShieldCheck, 
  Settings, 
  Bell, 
  ChevronRight,
  Menu,
  X,
  FileText,
  AlertCircle
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import OnboardingFlow from './components/OnboardingFlow';
import LoanManagement from './components/LoanManagement';
import ComplianceCenter from './components/ComplianceCenter';
import SettingsPanel from './components/SettingsPanel';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
    { name: 'Onboarding', icon: UserPlus, id: 'onboarding' },
    { name: 'Lending', icon: CreditCard, id: 'lending' },
    { name: 'Compliance', icon: ShieldCheck, id: 'compliance' },
    { name: 'Settings', icon: Settings, id: 'settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 px-6 py-8 border-b border-slate-800">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">MFI Compliance</h1>
              <p className="text-xs text-slate-400">RBI SBR Dashboard</p>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 bg-slate-800/50 m-4 rounded-xl border border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-blue-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Compliance Status</span>
            </div>
            <p className="text-sm font-medium">SBR Layer: Middle</p>
            <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
              <div className="bg-green-500 h-1.5 rounded-full w-[92%]"></div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-right">92% Regulatory Health</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <h2 className="text-xl font-semibold capitalize text-slate-800">{activeTab}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800">Compliance Officer</p>
                <p className="text-xs text-slate-500">ID: NBFC-4902</p>
              </div>
              <img 
                src="https://picsum.photos/seed/compliance/40/40" 
                className="w-10 h-10 rounded-full ring-2 ring-slate-100" 
                alt="Profile" 
              />
            </div>
          </div>
        </header>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'onboarding' && <OnboardingFlow />}
            {activeTab === 'lending' && <LoanManagement />}
            {activeTab === 'compliance' && <ComplianceCenter />}
            {activeTab === 'settings' && <SettingsPanel />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
