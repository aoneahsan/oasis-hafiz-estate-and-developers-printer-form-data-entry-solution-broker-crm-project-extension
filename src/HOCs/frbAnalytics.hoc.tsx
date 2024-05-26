// #region ---- Core Imports ----
import React, { useEffect } from 'react';
import { _firebaseApp, frbLogPageViewAnalyticsEvent } from '@/config/firebase';
import { useLocation } from '@tanstack/react-router';
import { Device, DeviceId } from '@capacitor/device';
// #endregion

const FirebaseAnalyticsHOC: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const location = useLocation();

  useEffect(() => {
    (async () => {
      let deviceInfo = {};
      let deviceId: DeviceId | string = '';
      try {
        const getInfo = await Device.getInfo();
        const getBatteryInfo = await Device.getBatteryInfo();
        const getLanguageCode = await Device.getLanguageCode();
        deviceId = await Device.getId();
        const getLanguageTag = await Device.getLanguageTag();

        deviceInfo = {
          getInfo,
          getBatteryInfo,
          getLanguageCode,
          deviceId,
          getLanguageTag
        };
        deviceInfo = JSON.stringify(deviceInfo);
      } catch (error) {}

      try {
        frbLogPageViewAnalyticsEvent(location.pathname, {
          ...location,
          deviceInfo,
          deviceId
        });
      } catch (error) {}
    })();
  }, [location.pathname]);

  // #endregion

  return <>{children}</>;
};

export default FirebaseAnalyticsHOC;
