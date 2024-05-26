// #region ---- Core Imports ----
import React from 'react';

// #endregion

// #region ---- Custom Imports ----
import { reportCustomError } from '@/utils/Helpers';
import Copyright from '@/Components/Inpage/Copyright';
import ZButton from '@/Components/Elements/Button';

// #endregion

// #region ---- Images Imports ----
import { productVector, productLogo } from '@/assets';

// #endregion

const HomePage: React.FC = () => {
  const openContactUsUrl = (): void => {
    try {
      window.open(
        'https://zaions.com',
        '_blank' // <- This is what makes it open in a new window.
      );
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <div className='w-full lg:pt-[4rem] maxLg:pt-[2rem] pb-[2rem] bg-secondary'>
      <div className='max-w-[85.4rem] mx-auto'>
        {/* Header */}
        <div className='xl:w-[90.5%] maxXl:px-[2rem] maxXs:px-[.5rem!important] maxLg:flex-col maxLg:gap-y-10 relative flex justify-center mx-auto'>
          {/* Left-side logo, text, & buttons */}
          <div className='flex flex-col items-center w-full text-center'>
            {/* Logo */}
            <div className='text-center maxLg:w-full'>
              <img
                className='w-[20rem] maxSm:mx-auto relative'
                alt='Logo'
                src={productLogo}
              />
            </div>

            {/* Content and Buttons */}
            <div className='h-auto maxLg:pt-[2rem] relative z-10'>
              <h1 className='font-black lg:mt-5 relative z-10 font-mont-heavy text-[2.25rem] w-full text-center leading-[2.7rem] uppercase text-primary'>
                The Oasis - A Project of "Hafiz Estate & Developers"
              </h1>

              <p className='mt-4 pt-[1px] relative z-10 tracking-wide pb-[2px] font-semibold font-roboto-regular leading-[120%] text-[1rem] text-primary'>
                Welcome to The Oasis by Hafiz Estate & Developers – Experience
                the finest living in DHA. Contact us today to secure your dream
                home!
              </p>

              <div className='relative z-10 mb-20'>
                <div className='flex justify-center w-full gap-5 pt-10 maxSm:flex-col lg:mt-11'>
                  <ZButton
                    className='bg-primary rounded-[4px] py-[.5rem] text-[1rem] tracking-[1.2px] hidden font-mont-heavy px-[1.5rem] font-black text-secondary'
                    onClick={openContactUsUrl}
                  >
                    Software Developed by "Ahsan Mahmood" Manager at Zaions
                    (https://zaions.com) - Contact Today to get your Web &
                    Mobile App/Game Developed
                  </ZButton>
                </div>
              </div>
            </div>

            <div className='absolute hidden md:block lg:bottom-[-12rem] z-0 xl:left-[-9.4rem] left-[-5rem] maxLg:bottom-[-10rem]'>
              <img
                alt='home page vector'
                src={productVector}
                className='maxMd:w-[16rem] maxLg:w-[17rem]'
              />
            </div>
          </div>
        </div>

        {/*  */}
        <div className='w-full text-center mt-[3rem]'>
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
