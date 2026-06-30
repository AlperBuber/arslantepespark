/// <reference types="vite/client" />

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "@/lib/supabase.js" {
  import type { SupabaseClient } from "@supabase/supabase-js";
  export const supabase: SupabaseClient;
}
