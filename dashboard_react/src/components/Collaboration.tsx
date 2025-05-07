import React from 'react';
import { Users, MessageSquare, FileText, Calendar } from 'lucide-react';

const Collaboration: React.FC = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Security Analyst',
      status: 'Online',
      avatar: 'JD',
    },
    {
      name: 'Jane Smith',
      role: 'Network Engineer',
      status: 'Away',
      avatar: 'JS',
    },
    {
      name: 'Mike Johnson',
      role: 'Security Engineer',
      status: 'Offline',
      avatar: 'MJ',
    },
  ];

  const recentActivities = [
    {
      type: 'message',
      user: 'John Doe',
      content: 'Updated firewall rules for production environment',
      timestamp: '10 minutes ago',
      icon: MessageSquare,
    },
    {
      type: 'document',
      user: 'Jane Smith',
      content: 'Added new security policy document',
      timestamp: '1 hour ago',
      icon: FileText,
    },
    {
      type: 'meeting',
      user: 'Mike Johnson',
      content: 'Scheduled security review meeting',
      timestamp: '2 hours ago',
      icon: Calendar,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Team Collaboration</h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {teamMembers.map((member, index) => (
                <li key={index} className="px-4 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-medium">{member.avatar}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`h-2 w-2 rounded-full ${getStatusColor(
                          member.status
                        )}`}
                      />
                      <span className="ml-2 text-sm text-gray-500">
                        {member.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <li key={index} className="px-4 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-500">{activity.content}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <MessageSquare className="h-5 w-5 mr-2" />
              New Message
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <FileText className="h-5 w-5 mr-2" />
              New Document
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule Meeting
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Users className="h-5 w-5 mr-2" />
              Invite Team Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration; 