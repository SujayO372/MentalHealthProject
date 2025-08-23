// import { createClient } from '@supabase/supabase-js'

// // For Vite, environment variables must start with VITE_
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Missing Supabase environment variables")
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)


// src/lib/supabase.jsx 
import { createClient } from '@supabase/supabase-js'

// For Vite, environment variables must start with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

