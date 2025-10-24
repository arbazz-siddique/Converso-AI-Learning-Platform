"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const querySubject = searchParams.get("subject") || "";
  const [subject, setSubject] = useState(querySubject);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (subject && subject !== "all") {
        // Add or update subject param
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "subject",
          value: subject,
        });
      } else {
        // Remove the subject param if 'all'
        if (pathname === "/companions") {
          newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["subject"],
          });
        }
      }

      if (newUrl) {
        router.push(newUrl, { scroll: false });
      }
    }, 500); // same debounce as SearchInput

    // cleanup
    return () => clearTimeout(delayDebounceFn);
  }, [subject, router, searchParams, pathname]);

  return (
    <Select onValueChange={setSubject} value={subject || "all"}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map((subj) => (
          <SelectItem key={subj} value={subj} className="capitalize">
            {subj}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
