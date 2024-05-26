import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zaions.oasis',
  appName: 'oasis',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
