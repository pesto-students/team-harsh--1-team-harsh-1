import React, { memo } from "react"

import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"
import useCart from "@/hooks/use-cart"

export interface InputProps{
    pid: string
    qty: number
  }

const QuantityInput = memo(({ pid, qty = 1 }:InputProps) => {
    const {updateItemQuantity} = useCart();

    const onclickBtn = (val: number) => {
      updateItemQuantity(pid, val)
    }

    return (
      <div className="mt-2 flex justify-start align-middle">
        <button disabled={qty===1} className="bg-slate-300 disabled:cursor-not-allowed  px-2 mr-1 h-7 border rounded-md" onClick={()=>onclickBtn(qty-1)} >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="number"
          className={cn(
            "flex disabled h-7 w-10 rounded-md border bg-transparent px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          )}
          disabled
          value={qty}
          onKeyDown={(e)=> {if(e.key === 'e' ||e.key ==='E') e.preventDefault()}}
        />
        <button disabled={qty===10} className="bg-slate-300 disabled:cursor-not-allowed px-2 ml-1 h-7 border rounded-md" onClick={()=>onclickBtn(qty+1)} >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    )
  }
)
QuantityInput.displayName = "QuantityInput"

export { QuantityInput }
