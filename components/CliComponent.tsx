"use client";

import { ReactNode, useEffect, useState } from "react";

const CliComponent = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : null;
};

export default CliComponent;
