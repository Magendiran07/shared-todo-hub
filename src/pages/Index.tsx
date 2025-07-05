
import React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Filter, Search, Bell } from 'lucide-react';
import AuthModal from '@/components/auth/AuthModal';
import TaskDashboard from '@/components/dashboard/TaskDashboard';
import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const { toast } = useToast();

  // Mock authentication state - will be replaced with Supabase auth
  const handleLogin = (userData: any) => {
    setUser(userData);
    setShowAuthModal(false);
    toast({
      title: "Welcome back!",
      description: "You've successfully signed in.",
    });
  };

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
              TaskFlow
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Collaborate, organize, and achieve more together. The modern task management platform 
              that brings teams together and keeps everyone in sync.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy Task Creation</h3>
                <p className="text-gray-600 text-sm">Create and organize tasks with intuitive forms and smart categorization.</p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Bell className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                <p className="text-gray-600 text-sm">Stay synchronized with your team through instant notifications and updates.</p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Filter className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Filtering</h3>
                <p className="text-gray-600 text-sm">Find what you need quickly with powerful filtering and search capabilities.</p>
              </Card>
            </div>
            
            <Button 
              onClick={() => setShowAuthModal(true)}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Started - Sign In
            </Button>
          </div>
        </div>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TaskDashboard 
        user={user} 
        onLogout={handleLogout}
        onCreateTask={() => setShowCreateTask(true)}
      />
      
      <CreateTaskModal 
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        user={user}
      />
    </div>
  );
};

export default Index;
