import React from 'react';
import { useParams } from 'react-router-dom';
import DoctorDetail from './DoctorDetail';

const DoctorDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-6">
      <DoctorDetail doctorId={id} />
    </div>
  );
};

export default DoctorDetailPage; 