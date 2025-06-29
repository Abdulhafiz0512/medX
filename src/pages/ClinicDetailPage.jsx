import React from 'react';
import { useParams } from 'react-router-dom';
import { ClinicDetail } from '../components/clinics';

const ClinicDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-6">
      <ClinicDetail clinicId={id} />
    </div>
  );
};

export default ClinicDetailPage; 