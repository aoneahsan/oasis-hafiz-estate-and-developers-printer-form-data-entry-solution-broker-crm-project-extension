// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Custom Imports ----
import ZButton from '@/Components/Elements/Button';
import {
  useZLoader,
  useZModal,
  useZSideBar
} from '@/ZHooks/ZGlobalComponents.hook';
import { AppRoutes } from '@/Routes/AppRoutes';
import { messages } from '@/utils/Messages';
import { reportCustomError } from '@/utils/Helpers';

// #endregion

// #region ---- Types Imports ----
import { ZColorEnum, ZFill } from '@/utils/Enums/Elements.enum';

// #region ---- Images Imports ----
import { CloseSvg, ExitSvg, MenuSvg, productLogo } from '@/assets';
import { type ZGenericObject } from '@/Types/Global/index.type';
import { frbSignOut } from '@/config/firebase';

// #endregion

// #region ---- Types Imports ----

// #endregion

const LogoutModal: React.FC<{
  hideModal: <A>(props?: ZGenericObject<A>) => void;
}> = ({ hideModal }) => {
  // #region Custom Hooks
  const { showLoader, hideLoader } = useZLoader();
  // #endregion

  // #region Functions
  const logoutHandler = async (): Promise<void> => {
    try {
      // showing loader.
      showLoader(messages.auth.logoutLoader);

      // api
      await frbSignOut();

      // hiding loader.
      hideLoader();

      // Redirect to login.
      window.location.href = AppRoutes.home;
    } catch (error) {
      // hiding loader.
      hideLoader();
      reportCustomError(error);
    }
  };
  // #endregion

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between w-full'>
        <h2 className='uppercase text-primary me-9 text-[1.5rem] lg:text-[2.25rem] font-black font-mont-heavy'>
          Logout
        </h2>
        <CloseSvg
          className='text-primary w-[1.2rem!important] h-[1.2rem!important] cursor-pointer'
          onClick={() => {
            hideModal();
          }}
        />
      </div>

      <div className='flex flex-col items-center justify-center w-full mt-5'>
        <p className='text-center text-tertiary mt-6 text-[1.2rem] font-black font-mont-heavy'>
          Are you sure you want to logout?
        </p>

        <div className='flex w-full gap-2 mt-10 maxSm:flex-col'>
          <ZButton
            className='sm:w-1/2'
            onClick={() => {
              void logoutHandler();
            }}
          >
            Logout
          </ZButton>
          <ZButton
            className='sm:w-1/2'
            fill={ZFill.outline}
            onClick={() => {
              hideModal();
            }}
          >
            Cancel
          </ZButton>
        </div>
      </div>
    </div>
  );
};

const ZAuthNavigation: React.FC = () => {
  // #region Custom Hooks
  const { openSidebar } = useZSideBar(ZNavSidebarContent);

  // #region Modals
  const { showModal: showLogoutModal } = useZModal({
    component: LogoutModal,
    bgColor: ZColorEnum.tertiary,
    containerClassName:
      'w-[31.25rem!important] h-[max-content!important] max-h-[23rem!important] maxSm:h-[23rem!important] overflow-y-auto min-h-[20rem!important]'
  });
  // #endregion

  return (
    <div className='flex items-center w-full maxLg:justify-between maxSm:px-2 lg:pe-12 md:ps-14'>
      <div className='xl:w-1/2 lg:w-4/12'>
        <img
          className='md:w-[4.8rem] md:h-[4.8rem] w-[3.8rem] h-[3.8rem] maxSm:mx-auto relative'
          alt='Logo'
          src={productLogo}
        />
      </div>

      {/*  */}
      <div className='flex items-center justify-end xl:w-1/2 lg:w-8/12 xl:gap-[3.5rem] gap-[1.5rem]'>
        <div className='flex items-center maxMd:hidden justify-start gap-[.85rem]'>
          {/* <span
            className={ZClassNames({
              'z-profile-item': true
            })}
            onClick={() => {
              if (!isSettingsRoute) {
                void navigate({
                  to: AppRoutes.oasis.entryForm
                });
              }
            }}
          >
            Settings
          </span> */}
        </div>

        <span className='maxMd:hidden'>
          <ExitSvg
            className='w-[3rem] h-[3rem] cursor-pointer text-primary'
            onClick={() => {
              showLogoutModal();
            }}
          />
        </span>

        <div className='md:hidden'>
          <MenuSvg
            className='cursor-pointer w-7 h-7 text-primary'
            onClick={openSidebar}
          />
        </div>
      </div>
    </div>
  );
};

const ZNavSidebarContent: React.FC<{ closeSidebar: () => void }> = ({
  closeSidebar
}) => {
  // #region Modals
  const { showModal: showLogoutModal } = useZModal({
    component: LogoutModal,
    bgColor: ZColorEnum.tertiary,
    containerClassName:
      'w-[31.25rem!important] h-[max-content!important] max-h-[23rem!important] maxSm:h-[23rem!important] overflow-y-auto min-h-[20rem!important]'
  });
  // #endregion
  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <div className=''>
        <div className='flex items-center justify-end'>
          <CloseSvg
            className='cursor-pointer w-7 h-7 text-primary'
            onClick={closeSidebar}
          />
        </div>

        <div className='w-full mt-10'>
          {/* <ZButton
            className='w-full mt-3 uppercase text-[.8rem]'
            fill={ZFill.outline}
          >
            Settings
          </ZButton> */}
        </div>
      </div>

      <div className='w-full py-3'>
        <ZButton
          className='w-full uppercase flex items-center justify-center text-[.8rem]'
          fill={ZFill.outline}
          color={ZColorEnum.tertiary}
          onClick={() => {
            showLogoutModal();
          }}
        >
          <ExitSvg className='me-2 text-tertiary mb-[2px]' /> Logout
        </ZButton>
      </div>
    </div>
  );
};

export default ZAuthNavigation;
