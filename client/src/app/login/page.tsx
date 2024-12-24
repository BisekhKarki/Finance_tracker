"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Enter password more than 6 characters"),
});

const page = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center">
      <div className=" w-1/3 px-3 py-5 bg-white mt-5 shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Signup</h1>
          <p className="text-gray-400 text-sm">Signup to continue</p>
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
                      <Input
                        {...field}
                        className="outline-none border-gray-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <p>
                Don't have an account?
                <span
                  className="underline text-blue-500 cursor-pointer"
                  onClick={() => router.push("/Signup")}
                >
                  Singup
                </span>
              </p>
              <Button className="w-full">Login</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default page;
