"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/Toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "lucide-react";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { prismaClient } from "@/database/client";
import { ModalProvider } from "@/components/modal-provider";

interface UserResponse {
  id: string | null;
  error: AxiosError | null;
}

export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const user = await getUserInfo();
        setUserInfo(user);
      } catch (error) {
        // Handle errors, por exemplo, redirecione para a página de login se não estiver autenticado
        console.error("Erro ao obter informações do usuário", error);
      }
    }

    fetchUserInfo();
  }, []);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { error } = await getUser();
      if (error) {
        router.push("/login");
        return;
      }
      setIsSuccess(true);
    })();
  }, [router]);

  if (!isSuccess) {
    return;
  }

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

  return (
    <div>
      <div className="flex flex-row items-center justify-end p-3 m-0 gap-5">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-row items-center gap-6 outline-none list-image-none">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{userInfo.name.substr(0, 1)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-3">
            <DropdownMenuLabel className="mb-0 pb-0">
              {userInfo.name}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-xs font-thin mt-0 pt-0">
              {userInfo.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={handleLogout}>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ModalProvider />
      {children}
    </div>
  );
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

export async function getUserInfo() {
  try {
    const response = await axios.get("/api/user");
    return response.data;
  } catch (error) {
    // Handle errors, por exemplo, redirecione para a página de login se não estiver autenticado
    console.error("Erro ao obter informações do usuário", error);
    throw error;
  }
}
