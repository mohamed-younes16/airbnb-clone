import { useEffect, useState } from "react";
import countries from "world-countries";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const formattedCountries = countries.map((e) => ({
  value: e.cca2,
  label: e.name.common,
  flag: e.flag,
  latlang: e.latlng,
  region: e.region,
}));

type Store = {
  isRentModalOpen: boolean;
  setisRentModalOpen: (v: boolean) => void;
  requests: number;
  setRequests: (v: number) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      isRentModalOpen: false,
      setisRentModalOpen: (v: boolean) => set(() => ({ isRentModalOpen: v })),
      requests: 0,
      setRequests: (v: number) => set(() => ({ requests: v })),
    }),
    { name: "data", storage: createJSONStorage(() => sessionStorage) }
  )
);

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const origin: string =
    typeof window !== "undefined" && window?.location?.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return;
  return origin;
};

export const useCounries = () => {
  const getAll = () => formattedCountries;
  const getByValue = (value: string) => {
    return formattedCountries.find((e) => e.value === value);
  };
  return {getAll,getByValue}
};
