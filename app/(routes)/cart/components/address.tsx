"use client"

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NewAddressForm from "./new-address-form";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Skeleton from "@/components/ui/skeleton";
import { Address } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface CartItemInfoProps {
  selectedAddressId: string,
  setSelectedAddressId: Dispatch<SetStateAction<string>>
}

const AddressForm: React.FC<CartItemInfoProps> = ({ selectedAddressId, setSelectedAddressId }) => {
  const [loading, setLoading] = useState<boolean|string>(false)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [editFormData, setEditFormData] = useState<Address>()
  const [isUpdate, setIsUpdate] = useState(false)

  async function fetchAddresses() {
    setLoading(true);
    try {
      const response = await axios.get('/api/address');
      setAddresses(response?.data || [])
      setSelectedAddressId(response.data?.[0]?.id)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(()=>{
    setEditFormData(undefined)
    fetchAddresses();
  },[isUpdate])


  const onDelete = async (id: string) => {
    try {
      setLoading(id);
      await axios.delete(`/api/address/${id}`);
      fetchAddresses()
      toast.success('Address deleted successfully')
    } catch (error: any) {
      console.error(error)
      toast.error("somethings went wrong!")
      setLoading(false)
    }
  }


  const onClickAddNewForm = () => {
    setEditFormData({ id: '', userId: '', name: '', phone: '', city: '', state: '', pin: '', full_address: '' })
  }


  return ( 
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-900">
        Delivery address
      </h2>
      
      <div className="my-3 pt-2 space-y-2 border-t border-gray-200">
        { loading === true ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-[160px]" />
          </div>
        ):(
        <>
          {addresses?.length === 0 && <p className="text-center text-sm">No address found!</p>}
          <RadioGroup className="space-y-2 mb-2 max-h-72 overflow-y-auto scroll-m-2" onValueChange={setSelectedAddressId} value={selectedAddressId}>
            {addresses?.map(item=> (
              <div key={item.id} className="flex items-start justify-between space-x-2">
                <div className="flex items-start space-x-3 ">
                  <div><RadioGroupItem className="align-middle" value={item.id} id={item.id} /></div>
                  <Label className="cursor-pointer text-base" htmlFor={item.id}>
                    <span className="font-bold">{item.name}, {item.pin}</span> <br/>
                    <p className="font-normal text-sm">{item.full_address}, {item.city}</p>
                  </Label>
                </div>
                <div className="flex space-x-3">
                  <Trash2 color="red" className={cn("h-5 cursor-pointer", loading === item?.id && 'opacity-25')} onClick={()=> onDelete(item?.id) } />
                  <Pencil color="blue" className="h-5 cursor-pointer" onClick={()=> setEditFormData(item)} />
                </div>
              </div>
            ))}
          </RadioGroup>
          <Button variant="outline" className="mt-3 mb-4 h-9 px-2 text-sky-500 hover:text-sky-700" onClick={onClickAddNewForm}>
            <Plus className="mr-1 h-4 w-4" /> Add a new address
          </Button>
        </>
        )}
      </div>
      {editFormData && <NewAddressForm {...{ editFormData, setEditFormData, setIsUpdate}} /> }
      
    </div>
  );
}

export default AddressForm;
