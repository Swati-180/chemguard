
"use client"

import { Button } from "@/components/ui/button"
import { Beaker, Plus, Loader2 } from "lucide-react"

interface EmptyInventoryStateProps {
  onAdd: () => void
  isLoading?: boolean
}

export function EmptyInventoryState({ onAdd, isLoading }: EmptyInventoryStateProps) {
  if (isLoading) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center gap-4 bg-white/[0.02] rounded-2xl border border-dashed border-white/10">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-xs font-bold text-primary/60 uppercase tracking-[0.4em] animate-pulse">Scanning Neural Registry</p>
      </div>
    )
  }

  return (
    <div className="h-[600px] flex flex-col items-center justify-center text-center p-8 bg-white/[0.02] rounded-2xl border border-dashed border-white/10 group transition-all hover:bg-white/[0.04]">
      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
        <Beaker className="w-10 h-10 text-muted-foreground/40" />
      </div>
      <h3 className="text-xl font-headline font-bold text-white uppercase tracking-widest mb-2">No Chemical Manifest Found</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed uppercase tracking-tighter font-medium">
        The current sector registry is empty. Deploy a new batch or sync with global logistics to populate the inventory matrix.
      </p>
      <Button 
        onClick={onAdd}
        className="bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 font-headline font-bold uppercase tracking-widest h-12 px-8 gap-3"
      >
        <Plus className="w-4 h-4" /> Add First Chemical
      </Button>
    </div>
  )
}
