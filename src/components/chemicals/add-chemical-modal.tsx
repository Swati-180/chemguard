
"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFirestore } from "@/firebase"
import { collection, addDoc } from "firebase/firestore"
import { toast } from "@/hooks/use-toast"
import { Loader2, Beaker } from "lucide-react"

interface AddChemicalModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddChemicalModal({ isOpen, onClose }: AddChemicalModalProps) {
  const db = useFirestore()
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      batchId: formData.get("batchId"),
      quantity: Number(formData.get("quantity")),
      unit: formData.get("unit"),
      manufacturer: formData.get("manufacturer"),
      expiryDate: formData.get("expiryDate"),
      location: formData.get("location"),
      status: formData.get("status"),
      createdAt: new Date().toISOString()
    }

    try {
      await addDoc(collection(db, "chemical_inventory"), data)
      toast({ title: "Manifest Updated", description: "New chemical batch successfully registered in the neural registry." })
      onClose()
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to register batch. Check security credentials." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a0f18] border-white/10 text-white max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <DialogHeader>
          <DialogTitle className="text-xl font-headline font-bold uppercase tracking-widest flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <Beaker className="w-5 h-5" />
            </div>
            Register New Batch
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Chemical Name</Label>
              <Input name="name" required className="bg-white/5 border-white/10 h-11 text-xs" placeholder="e.g. Hydrochloric Acid" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Batch ID</Label>
              <Input name="batchId" required className="bg-white/5 border-white/10 h-11 text-xs font-mono" placeholder="[B-XXXX]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Quantity</Label>
              <div className="flex gap-2">
                <Input name="quantity" type="number" required className="bg-white/5 border-white/10 h-11 text-xs" />
                <Select name="unit" defaultValue="L">
                  <SelectTrigger className="w-20 bg-white/5 border-white/10 h-11 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0a0f18] border-white/10">
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="gal">gal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Status</Label>
              <Select name="status" defaultValue="In Stock">
                <SelectTrigger className="bg-white/5 border-white/10 h-11 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0f18] border-white/10">
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Quarantined">Quarantined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Manufacturer</Label>
              <Input name="manufacturer" className="bg-white/5 border-white/10 h-11 text-xs" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Expiry Date</Label>
              <Input name="expiryDate" type="date" className="bg-white/5 border-white/10 h-11 text-xs" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Storage Location</Label>
            <Input name="location" className="bg-white/5 border-white/10 h-11 text-xs" placeholder="e.g. Vault 4, Section B" />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={onClose} className="text-[10px] font-bold uppercase tracking-widest h-12">Cancel</Button>
            <Button disabled={loading} type="submit" className="bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 h-12 px-8 text-[10px] font-bold uppercase tracking-[0.2em] min-w-[160px]">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Finalize Registry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
