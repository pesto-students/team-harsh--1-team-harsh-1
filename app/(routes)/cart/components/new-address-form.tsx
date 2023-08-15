"use client"

import * as z from "zod"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { ComboboxForm } from "@/components/combobox";
import axios from "axios";
import toast from "react-hot-toast";
import { Address } from "@/types";

interface CartItemInfoProps {
  editFormData?: Address;
  setEditFormData: Dispatch<SetStateAction<Address | undefined>>
  setIsUpdate: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({
  name: z.string({required_error: "Name is required",}).min(3, { message: "At least 3 character long." }),
  phone: z.string({required_error: "Phone number is required",}).length(10, { message: "Must be 10 digit." }),
  city: z.string({required_error: "City is required"}).min(3, { message: "At least 3 character long." }),
  state: z.string({required_error: "State is required"}).min(1, { message: "State is required" }),
  pin: z.string({required_error: "Pin is required"}).length(6, { message: "Must be 6 digit ." }),
  full_address: z.string().min(5, { message: "Must be at least 5 character." }),
});

type ProductFormValues = z.infer<typeof formSchema>

const NewAddressForm: React.FC<CartItemInfoProps> = ({ editFormData, setEditFormData, setIsUpdate }) => {
  const [loading, setLoading] = useState(false)


  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: editFormData
  });

  useEffect(()=>{
    form.reset(editFormData)
  },[editFormData])

  const onSubmit = async (data: ProductFormValues) => {
    const toastMessage = editFormData?.id ? 'Address updated successfully.' : 'Address created successfully.';

    try {
      setLoading(true);
      if (editFormData?.id) {
        await axios.patch(`/api/address/${editFormData.id}`, data);
      } else {
        await axios.post(`/api/address`, data);
      }
      setIsUpdate(prev => !prev)
      setEditFormData(undefined)
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };



  return ( 
    <div className="flex-col">
      <div className="flex-1 pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled={loading} placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="[&::-webkit-inner-spin-button]:appearance-none" type="number" disabled={loading} placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input disabled={loading} placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ComboboxForm form={form} />

              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl >
                      <Input className="[&::-webkit-inner-spin-button]:appearance-none" type="number" disabled={loading} placeholder="Pin code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="full_address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Full address...." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className="ml-auto" type="submit">
              { editFormData?.id ? "Edit" : " Add" }
            </Button>
            <Button variant="outline" disabled={loading} onClick={()=>setEditFormData(undefined)} className="ml-2" >
              Cancel
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default NewAddressForm;
