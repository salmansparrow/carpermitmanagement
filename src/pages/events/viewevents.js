import React from "react";
import ViewAllEvenetsComponent from "../components/Events/ViewAllEvenetsComponent";
import Layout from "../components/layout/Layout";

function ViewEvents() {
  return (
    <>
      <Layout>
        <ViewAllEvenetsComponent />
      </Layout>
    </>
  );
}

export default ViewEvents;
