import React from 'react';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import OrdersTable from "../../components/tables/OrdersTable";

export default function OrdersPage() {
  return (
    <>
      <PageMeta
        title="Orders Management"
        description="Manage customer orders"
      />
      <PageBreadcrumb pageTitle="Orders" />
      <div className="space-y-6">
        <ComponentCard title="Orders List">
          <OrdersTable />
        </ComponentCard>
      </div>
    </>
  );
}