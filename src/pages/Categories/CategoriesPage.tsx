import React from 'react';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import CategoriesTable from "../../components/tables/CategoriesTable";

export default function CategoriesPage() {
  return (
    <>
      <PageMeta
        title="Categories Management"
        description="Manage product categories"
      />
      <PageBreadcrumb pageTitle="Categories" />
      <div className="space-y-6">
        <ComponentCard title="Categories List">
          <CategoriesTable />
        </ComponentCard>
      </div>
    </>
  );
}