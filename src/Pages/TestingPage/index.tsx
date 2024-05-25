// #region ---- Core Imports ----
import { ZDropzone } from '@/Packages/ReactDropzone';
import { zAxiosApiRequestContentType } from '@/Types/Global/zapi-hooks.type';
import { useZRQCreateRequest } from '@/ZHooks/zreactquery.hooks';
import { ApiUrlEnum } from '@/utils/Enums/apis.enum';
import { isZNonEmptyString, reportCustomError } from '@/utils/Helpers';
import React, { useState } from 'react';

// #endregion

// #region ---- Packages Imports ----

// #endregion

// #region ---- Custom Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

// #region ---- Store Imports ----

// #endregion

// #region ---- Images Imports ----

// #endregion

// #region ---- Types Imports ----

// #endregion

const TestingPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const { mutateAsync: uploadFileMutateAsync, isPending: isUploadFilePending } =
    useZRQCreateRequest({
      _url: ApiUrlEnum.uploadSingleFile,
      _contentType: zAxiosApiRequestContentType.FormData
    });

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file!);

      const _response = await uploadFileMutateAsync(formData as FormData);
    } catch (error) {
      reportCustomError(error);
    }
  };

  return (
    <>
      <p>this is a testing page </p>
      {isUploadFilePending && <p>uploading file</p>}

      <img src={fileUrl} className='w-10 h-10' />

      <ZDropzone
        onDrop={(acceptedFiles) => {
          void (async () => {
            if (acceptedFiles !== undefined && acceptedFiles !== null) {
              setFile(acceptedFiles[0]);
            }

            //
            const url = URL.createObjectURL(acceptedFiles[0]);

            if (isZNonEmptyString(url)) {
              setFileUrl(url);
            }
          })();
        }}
      >
        {({ getRootProps, getInputProps }) => {
          return (
            <div
              className='w-[12.5rem] h-[12.5rem] cursor-pointer'
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <span>Add image</span>
            </div>
          );
        }}
      </ZDropzone>

      <button
        onClick={() => {
          void uploadFile();
        }}
      >
        send
      </button>
    </>
  );
};

export default TestingPage;
