"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthWrapper from "@/components/auth/auth-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { LoginSchema } from "@/types/auth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { login } from "@/features/auth/authSlice";

const LoginForm = () => {
  const [eye, setEye] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch: AppDispatch = useDispatch();
  const submitHandler = async (values: z.infer<typeof LoginSchema>) => {
    dispatch(login(values));
    window.location.href = "/file-upload";
  };
  return (
    <AuthWrapper
      label="Authentication to Assignment"
      description="Log in into your File uploader"
    >
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(submitHandler)}
          autoComplete="off"
        >
          <div className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-muted-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="abc@gmail.com"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-muted-foreground">
                    Password
                  </FormLabel>
                  <div className="flex items-center relative">
                    <FormControl>
                      <Input
                        type={eye ? "text" : "password"}
                        placeholder="AaBbCc#@$123"
                        className="pr-12"
                        {...field}
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <div className="absolute right-0 w-12 flex items-center justify-center">
                      {eye ? (
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          onClick={(e) => {
                            e.preventDefault();
                            setEye(false);
                          }}
                        >
                          <Eye className="w-5 h-5" />
                        </Button>
                      ) : (
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          onClick={(e) => {
                            e.preventDefault();
                            setEye(true);
                          }}
                        >
                          <EyeOff className="w-5 h-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <Button type="submit" className="w-full">
              Login Now!
            </Button>
          </div>
          <div>
            You want to create Account ?{" "}
            <Link
              to={"/register"}
              className="text-sm text-blue-500 hover:underline"
            >
              click here
            </Link>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default LoginForm;
