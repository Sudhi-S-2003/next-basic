// src/NavigatorCookieApp.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const NavigatorCookieApp = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    userAgent: '',
    platform: '',
    language: '',
    cookieStatus: '',
  });

  // Helper functions for managing navigator-related cookie data
  const saveNavigatorData = () => {
    const navigatorData = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
    };
    Cookies.set('navigator_data', JSON.stringify(navigatorData), { expires: 7 }); // Cookie expires in 7 days
    setDeviceInfo(navigatorData);
  };

  const fetchNavigatorData = () => {
    const cookieData = Cookies.get('navigator_data');
    if (cookieData) {
      setDeviceInfo(JSON.parse(cookieData));
    } else {
      setDeviceInfo({
        userAgent: 'Not available',
        platform: 'Not available',
        language: 'Not available',
        cookieStatus: 'No saved navigator data found in cookies',
      });
    }
  };

  const deleteNavigatorData = () => {
    Cookies.remove('navigator_data');
    setDeviceInfo({
      userAgent: 'Not available',
      platform: 'Not available',
      language: 'Not available',
      cookieStatus: 'Navigator data has been deleted',
    });
  };

  useEffect(() => {
    fetchNavigatorData(); // Fetch navigator data from cookies on initial render
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Navigator Cookie Management
        </h1>

        <div className="space-y-4">
          <button
            onClick={saveNavigatorData}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save Navigator Data to Cookies
          </button>

          <button
            onClick={fetchNavigatorData}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Fetch Navigator Data from Cookies
          </button>

          <button
            onClick={deleteNavigatorData}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete Navigator Data from Cookies
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Device Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
              <span className="font-medium text-gray-700">User Agent:</span>
              <span className="text-gray-600">{deviceInfo.userAgent}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
              <span className="font-medium text-gray-700">Platform:</span>
              <span className="text-gray-600">{deviceInfo.platform}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
              <span className="font-medium text-gray-700">Language:</span>
              <span className="text-gray-600">{deviceInfo.language}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
              <span className="font-medium text-gray-700">Status:</span>
              <span className="text-gray-600">{deviceInfo.cookieStatus || 'No data available'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigatorCookieApp;
