import React from "react";
import { useParams } from "react-router-dom";
import ProviderBooking from "../booking/ProviderBooking";

const VetBook = () => {
  const { id } = useParams();
  return <ProviderBooking forcedType="vet" forcedId={id} />;
};

export default VetBook;
