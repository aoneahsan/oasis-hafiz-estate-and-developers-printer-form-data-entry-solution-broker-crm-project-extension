import { useParams } from '@tanstack/react-router';
import React from 'react';

const OasisFormEntryView: React.FC = () => {
  const { oasisEntryQrCode } = useParams({
    strict: false
  }) as { oasisEntryQrCode?: string };

  console.log({ oasisEntryQrCode });
  return <div>Oasis Form Entry View</div>;
};

export default OasisFormEntryView;
