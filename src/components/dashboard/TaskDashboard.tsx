
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, Filter, Bell, User, LogOut, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import TaskList from '@/components/tasks/TaskList';
import { useToast } from '@/hooks/use-toast';

interface TaskDashboardProps {
  user: any;
  onLogout: () => void;
  onCreateTask: () => void;
}

const TaskDashboard = ({ user, onLogout, onCreateTask }: TaskDashboardProps) => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive docs for the new feature',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-07-10',
      assignedTo: [user],
      createdBy: user.id,
      createdAt: '2024-07-05',
      sharedWith: []
    },
    {
      id: '2',
      title: 'Review pull requests',
      description: 'Code review for team members',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-07-08',
      assignedTo: [user],
      createdBy: user.id,
      createdAt: '2024-07-05',
      sharedWith: []
    },
    {
      id: '3',
      title: 'Setup deployment pipeline',
      description: 'Configure CI/CD for the new application',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-07-06',
      assignedTo: [user],
      createdBy: user.id,
      createdAt: '2024-07-04',
      sharedWith: []
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const { toast } = useToast();

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || task.status === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length
  };

  const handleTaskUpdate = (taskId: string, updates: any) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    
    toast({
      title: "Task updated",
      description: "Task has been successfully updated.",
    });
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    
    toast({
      title: "Task deleted",
      description: "Task has been permanently deleted.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Dashboard
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              onClick={onCreateTask}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
            
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex-col items-start">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">📋</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taskStats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{taskStats.pending}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={activeFilter === 'pending' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('pending')}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={activeFilter === 'in-progress' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('in-progress')}
              size="sm"
            >
              In Progress
            </Button>
            <Button
              variant={activeFilter === 'completed' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('completed')}
              size="sm"
            >
              Completed
            </Button>
          </div>
        </div>

        {/* Task List */}
        <TaskList 
          tasks={filteredTasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
          currentUser={user}
        />
      </div>
    </div>
  );
};

export default TaskDashboard;
