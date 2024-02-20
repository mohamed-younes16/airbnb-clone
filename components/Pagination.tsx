"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Button } from "./ui/button";
const PaginationComponent = ({ count }: { count: number }) => {
  const router = useRouter();
  const params = useSearchParams();
  const currentPage = params?.get("page");

  const handleclick = (index) => {
    const query = qs.parse(params.toString());
    const newquery: any = {
      ...query,
      page: index,
    };
    currentPage == index && delete newquery.category;
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: newquery,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  const handleIndex = (direction: "next" | "prev") => {
    const query = qs.parse(params.toString());

    const newquery: any = {
      ...query,
      page: Math.max(+(currentPage || 0) + (direction == "next" ? 1 : -1), 0),
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: newquery,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <Pagination>
      <PaginationContent>
        {+(currentPage || 0) >= 1 && (
          <PaginationItem
            className=" cursor-pointer"
            onClick={() => handleIndex("prev")}
          >
            <PaginationPrevious />
          </PaginationItem>
        )}

        {Array.from({ length: count }).map((_, i) => (
          <PaginationItem
            onClick={() => handleclick(i + +(currentPage || 0))}
            key={i}
          >
            <Button
              variant={
                i + +(currentPage || 0) == +(currentPage || 0)
                  ? "default"
                  : "ghost"
              }
            >
              {i + +(currentPage || 0)}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem
          className=" cursor-pointer"
          onClick={() => handleIndex("next")}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
