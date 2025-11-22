import { createContext, useContext, useMemo, useState } from "react";

type StructureState = {
  structureId: string;
  roomId?: string;
  setStructureId: (v: string) => void;
  setRoomId: (v?: string) => void;
};

const Ctx = createContext<StructureState | null>(null);

export function StructureProvider({ children, initialStructure, initialRoom }:{
  children: any; initialStructure: string; initialRoom?: string;
}) {
  const [structureId, setStructureId] = useState(initialStructure);
  const [roomId, setRoomId] = useState<string | undefined>(initialRoom);
  const value = useMemo(() => ({ structureId, roomId, setStructureId, setRoomId }), [structureId, roomId]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStructure() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStructure must be used within StructureProvider");
  return v;
}
