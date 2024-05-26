import React, { Suspense } from 'react';
import ZGlobalComponents from '@/HOCs/ZGlobalComponents';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NotFound404Page from '@/Pages/Common/404';
import ZFullPageFallbackLoader from '@/Components/Elements/FallbackLoader';
import FirebaseAnalyticsHOC from '@/HOCs/frbAnalytics.hoc';

// eslint-disable-next-line react-refresh/only-export-components
const ZaionsTSRAppRoot: React.FC = () => {
  //
  return (
    <FirebaseAnalyticsHOC>
      <Outlet />
      <ZGlobalComponents />
      <ToastContainer />

      {/* React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </FirebaseAnalyticsHOC>
  );
};

const tanstackRootRoute = createRootRoute({
  component: ZaionsTSRAppRoot,
  notFoundComponent: () => {
    return (
      <Suspense fallback={<ZFullPageFallbackLoader />}>
        <NotFound404Page />
      </Suspense>
    );
  }
});

export default tanstackRootRoute;
