"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import backedUrl from "@/lib/apiurl";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Enter password more than 6 characters"),
});

const Page = () => {
  const router = useRouter();
  const [open, close] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`${backedUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem("Token", data.token);
        return router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error: unknown) {
      toast.error(String(error));
    }
  };

  return (
    <div className="flex justify-center">
      <div className=" w-1/3 px-3 py-5 bg-white mt-5 shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Login</h1>
          <p className="text-gray-400 text-sm">Login to continue</p>
        </div>
        <div className="mt-5 px-5">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="outline-none border-gray-500"
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={open ? "text" : "password"}
                          {...field}
                          className="outline-none border-gray-500"
                        />
                        <div className="absolute top-2 right-1  cursor-pointer">
                          {open ? (
                            <Eye onClick={() => close(!open)} type="button" />
                          ) : (
                            <EyeOff
                              onClick={() => close(!open)}
                              type="button"
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p>
                Dont have an account?
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => router.push("/Signup")}
                >
                  Singup
                </span>
              </p>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
