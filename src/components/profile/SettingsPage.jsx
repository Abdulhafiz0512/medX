import React, { useContext } from 'react';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, Button } from '../ui';
import { AppContext } from '../../context/AppContext';

const SettingsPage = () => {
  const { logout } = useContext(AppContext);
  
  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
              <span className="text-gray-900">Notifications</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
              <span className="text-gray-900">Privacy</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
            
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between">
              <span className="text-gray-900">Help & Support</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <Button variant="destructive" className="w-full" onClick={logout}>
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export  {SettingsPage}