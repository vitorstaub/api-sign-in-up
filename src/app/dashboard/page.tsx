"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/Toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"

import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";

import jwt from "jsonwebtoken";
import { useStoreModal } from "@/components/use-store-modal";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/logout");
      toast.success("Deslogado com sucesso");
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Ocorreu um erro inesperado");
      }
    }
  };

  jwt.decode

//  const onOpen = useStoreModal((state) => state.onOpen);
//  const isOpen = useStoreModal((state) => state.isOpen);
//
//  useEffect(() => { 
//    if (!isOpen) {
//      onOpen();
//    }
//  }, [isOpen, onOpen]);
//
//  return (
//    <div>
//
//    </div>
//  );
}
