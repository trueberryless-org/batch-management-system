"use client";

import { ReactNode, createContext, useContext, useState } from "react";

export type BreadcrumbItem =
  | { name: string; isLast: true }
  | { name: string; href?: string; isLast: false };

type BreadcrumbContextType = {
  breadcrumbItems: BreadcrumbItem[];
  setBreadcrumbItems: (items: BreadcrumbItem[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbItems, setBreadcrumbItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};
