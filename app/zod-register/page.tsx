'use client'

import React from 'react'
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/zodSchemas"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



const page = () => {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          name: "",
            email: "",
            password: "",
        },
      });
    
      const onSubmit = (values: z.infer<typeof loginSchema>) => {
        console.log(values);
      }

  return (
    <div>
        <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SignupFormField
          name="email"
          label="Email"
          placeholder="Email"
          inputType="email"
          formControl={form.control}
        />

        <SignupFormField
          name="name"
          label="name"
          placeholder="Username"
          description="At least 3 characters."
          formControl={form.control}
        />
        <SignupFormField
          name="password"
          label="Password"
          placeholder="Password"
          description="At least 8 characters."
          inputType="password"
          formControl={form.control}
        />
        <Button type="submit">Signup</Button>

        </form>
        </Form>
    </div>
  )
}


interface SignupFormFieldProps {
    name: FieldPath<z.infer<typeof loginSchema>>;
    label: string;
    placeholder: string;
    description?: string;
    inputType?: string;
    formControl: Control<z.infer<typeof loginSchema>, any>; 
  }
  
  
  const SignupFormField: React.FC<SignupFormFieldProps> = ({
    name,
    label,
    placeholder,
    description,
    inputType,
    formControl,
  }) => {
    return (
      <FormField
        control={formControl}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                type={inputType || "text"}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

export default page
