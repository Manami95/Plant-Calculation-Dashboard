"use client";

import { User, Mail, Phone, Building } from "lucide-react";

interface UserInfoProps {
  userData: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  onDataChange: (data: Partial<UserInfoProps["userData"]>) => void;
}

const UserInfo = ({ userData, onDataChange }: UserInfoProps) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-blue-500" />
            </div>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={(e) => onDataChange({ name: e.target.value })}
              className="block w-full pl-11 pr-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-blue-500" />
            </div>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) => onDataChange({ email: e.target.value })}
              className="block w-full pl-11 pr-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-blue-500" />
            </div>
            <input
              type="tel"
              id="phone"
              value={userData.phone}
              onChange={(e) => onDataChange({ phone: e.target.value })}
              className="block w-full pl-11 pr-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Building className="h-5 w-5 text-blue-500" />
            </div>
            <input
              type="text"
              id="company"
              value={userData.company}
              onChange={(e) => onDataChange({ company: e.target.value })}
              className="block w-full pl-11 pr-4 py-3 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Company Name"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;