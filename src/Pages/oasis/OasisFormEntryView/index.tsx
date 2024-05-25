import React, { useEffect, useState } from 'react';
import ZAuthNavigation from '@/Components/Auth/Navigation';
import Copyright from '@/Components/Inpage/Copyright';
import { productVector } from '@/assets';
import { IZOasisEntryForm } from '@/Types/oasis';
import NotFound404Page from '@/Pages/Common/404';
import { oasisDummyEntryData } from '@/Data/oasis/index.data';
import { camelToTitleCase } from '@/utils/Helpers';

const OasisFormEntryView: React.FC = () => {
  const [compState, setCompState] = useState<{
    processing: boolean;
    apiRequestFinished: boolean;
    oasisEntryData: IZOasisEntryForm;
  }>({
    processing: false,
    apiRequestFinished: false,
    oasisEntryData: {}
  });

  useEffect(() => {
    setCompState((prev) => ({ ...prev, processing: true }));

    // API request to get the oasis entry data

    setCompState((prev) => ({
      ...prev,
      oasisEntryData: { ...oasisDummyEntryData }
    }));

    setCompState((prev) => ({
      ...prev,
      processing: false,
      apiRequestFinished: true
    }));
  }, []);

  if (compState.processing || !compState.apiRequestFinished) {
    return <div>Loading...</div>;
  } else if (!compState.processing && compState.apiRequestFinished) {
    if (!compState.oasisEntryData) {
      return <NotFound404Page />;
    } else {
      return (
        <div className='relative flex flex-col items-center justify-between w-full min-h-screen pt-5 overflow-x-hidden bg-secondary h max-h-max lg:pe-8 maxLg:px-2'>
          <div className='max-w-[85.4rem] w-full mx-auto'>
            <ZAuthNavigation />

            <div className='w-[64.4375rem] max-w-full mx-auto maxMd:mt-[1.6rem] md:mt-[2.4rem]'>
              <h2 className='uppercase maxLg:text-center text-primary md:me-9 text-[1.5rem] md:text-[2.25rem] font-black font-mont-heavy text-center'>
                The Oasis - Plot File Details
              </h2>

              <div className='mt-10'>
                {[
                  'plotNumber',
                  'registrationNumber',
                  'serialNumber',
                  'plotType',
                  'plotSize',
                  'extraPercentageForLocationCategory',
                  'extraPercentageForLocationCategoryReason',
                  'applicantName',
                  'guardianName',
                  'relationWithGuardian',
                  'cnicNumber',
                  'passportNumber',
                  'mailAddress',
                  'permanentAddress',
                  'phoneNumber',
                  'mobileNumber',
                  'nomineeName',
                  'nomineeGuardianName',
                  'nomineeRelationWithGuardian',
                  'nomineeCnicNumber',
                  'nomineeRelationWithApplicant',
                  'nomineeAddress',
                  'nomineePhoneNumber',
                  'nomineeEmail',
                  'nomineeMobileNumber',
                  'paymentMethod'
                ].map((el) => {
                  if (!el) return null;

                  // eslint-disable-next-line
                  const _data = (
                    compState?.oasisEntryData as unknown as {
                      [key: string]: string;
                    }
                  )[el];

                  if (!_data) return null;

                  return (
                    <div className='flex justify-between px-10 py-4'>
                      <b>{camelToTitleCase(el)}:</b>
                      <span>{_data}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className='flex items-start flex-col w-full maxMd:mt-[2rem] md:mt-[7.15rem]'>
            <img
              src={productVector}
              alt='product vector'
              className='maxLg:hidden absolute bottom-0 left-0 z-1 maxMd:w-[16rem] maxXl:w-[17rem] w-[19.5rem]'
            />
            <div className='flex items-end w-full text-center'>
              <Copyright className='pb-[1.2rem] pt-[2.5rem] w-full' />
            </div>
          </div>
        </div>
      );
    }
  }
};

export default OasisFormEntryView;
