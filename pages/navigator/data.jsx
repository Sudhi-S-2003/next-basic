"use client"
import { useEffect, useState } from 'react';

function Data() {
  const [deviceInfo, setDeviceInfo] = useState({
    userAgent: '',
    platform: '',
    language: '',
    deviceMemory: '',
    hardwareConcurrency: '',
    screenResolution: '',
    connectionType: '',
    ipAddress: '',
    uniqueId: ''
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const language = navigator.language;
      const deviceMemory = navigator.deviceMemory || 'N/A';
      const hardwareConcurrency = navigator.hardwareConcurrency || 'N/A';
      const screenResolution = `${window.screen.width}x${window.screen.height}`;
      const connectionType = navigator.connection ? navigator.connection.effectiveType : 'N/A';

      // Generate a unique device/browser ID if not already available in localStorage
      let uniqueId = localStorage.getItem('deviceUniqueId');
      
      if (!uniqueId) {
        // Generate a new unique ID if it doesn't exist
        uniqueId = `${userAgent}-${platform}-${Date.now()}`;
        localStorage.setItem('deviceUniqueId', uniqueId);
      }

      // Fetch IP address from an external service
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
          setDeviceInfo({
            userAgent,
            platform,
            language,
            deviceMemory,
            hardwareConcurrency,
            screenResolution,
            connectionType,
            ipAddress: data.ip,
            uniqueId // Store unique device/browser ID
          });
        })
        .catch(error => console.error('Error fetching IP address:', error));

      setDeviceInfo(prevInfo => ({
        ...prevInfo,
        userAgent,
        platform,
        language,
        deviceMemory,
        hardwareConcurrency,
        screenResolution,
        connectionType,
        uniqueId
      }));
    }
  }, []);

  return (
    <div>
      <h3>Device Information</h3>
      <ul>
        <li>User Agent: {deviceInfo.userAgent}</li>
        <li>Platform: {deviceInfo.platform}</li>
        <li>Language: {deviceInfo.language}</li>
        <li>Device Memory: {deviceInfo.deviceMemory} GB</li>
        <li>CPU Cores: {deviceInfo.hardwareConcurrency}</li>
        <li>Screen Resolution: {deviceInfo.screenResolution}</li>
        <li>Connection Type: {deviceInfo.connectionType}</li>
        <li>IP Address: {deviceInfo.ipAddress}</li>
        <li>Unique Device ID: {deviceInfo.uniqueId}</li>
      </ul>
    </div>
  );
}

export default Data;
