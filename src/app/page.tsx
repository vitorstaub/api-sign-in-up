"use client"
import { Icons } from "@/components/icons";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface UserResponse {
    id: string | null;
    error: AxiosError | null;
}

export default function page() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { id, error } = await getUser();
      if (error) {
        router.push("/login");
        return;
      } else { router.push("/login"); } 
      setIsSuccess(true);
    })();
  }, [router]);

  if (!isSuccess) {
    return (
      <div>
        <Icons.spinner className="m-auto h-screen w-11 animate-spin" />
      </div>
    );
  }
  return <div></div>;
}

export async function getUser(): Promise<UserResponse> {
    try {
      const { data } = await axios.get("/api/auth/check");
  
      return {
        id: data,
        error: null,
      };
    } catch (e) {
      const error = e as AxiosError;
  
      return {
        id: null,
        error: error,
      };
    }
  }
