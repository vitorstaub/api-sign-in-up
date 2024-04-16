"use client";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import axios, { AxiosError } from "axios";
import {
  LoginUserSchemaType,
  loginUserSchema,
} from "@/validations/validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function UserLoginForm() {
  const router = useRouter()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginUserSchemaType>({
    resolver: zodResolver(loginUserSchema),
    mode: "onChange",
  });

  async function handleLogin(value: LoginUserSchemaType) {
    try {
      const response = await axios.post("/api/login", value);
      toast.success(response.data.message)
      router.push("/dashboard")
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Ocorreu um erro inesperado");
      }
    }
  }

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only">Email</Label>
            <Input
              placeholder="nome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email")}
            ></Input>
            <p>
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </p>
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Email
            </Label>
            <Input
              placeholder="senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              {...register("password")}
            ></Input>
            <p>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </p>
            <Button disabled={isSubmitting}>
              {isSubmitting && (
                <Icons.spinner className="mr-2 h-4 animate-spin" />
              )}
              Entrar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
