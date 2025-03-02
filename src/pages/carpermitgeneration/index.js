import React from "react";
import CarPermitGenerationComponent from "../components/CarPermitGeneration/CarPermitGenerationComponent";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";

function CarPermitGeneration() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Layout>{id && <CarPermitGenerationComponent permitId={id} />}</Layout>
    </>
  );
}

export default CarPermitGeneration;
