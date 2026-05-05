import React from 'react';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import PendingTradersTable from "../../components/tables/PendingTradersTable";

export default function PendingTradersPage() {
  return (
    <>
      <PageMeta
        title="Pending Traders"
        description="Review and approve pending trader registrations"
      />
      <PageBreadcrumb pageTitle="Pending Traders" />
      <div className="space-y-6">
        <ComponentCard title="Traders Awaiting Approval">
          <PendingTradersTable />
        </ComponentCard>
      </div>
    </>
  );
} 