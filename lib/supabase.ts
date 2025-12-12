import { createClient } from "@supabase/supabase-js"
import { createServerClient as createServerClientFromSSR } from "@supabase/ssr"
import { cookies } from "next/headers"
import { cache } from "react"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl!, supabaseAnonKey!) : null

export const createBrowserClient = () => {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables are not set.")
    throw new Error("Supabase is not configured. Please set environment variables.")
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export const createServerClient = cache(() => {
  if (!isSupabaseConfigured || !supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables are not set. Using dummy client.")
    return {
      from: () => ({
        select: () => ({
          eq: () => ({ data: [], error: { message: "Supabase not configured" } }),
          order: () => ({ data: [], error: { message: "Supabase not configured" } }),
          limit: () => ({ data: [], error: { message: "Supabase not configured" } }),
          single: () => ({ data: null, error: { message: "Supabase not configured" } }),
        }),
      }),
    }
  }

  try {
    return createServerClientFromSSR(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet) {
          try {
            const cookieStore = cookies()
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            console.error("Error setting cookies:", error)
          }
        },
      },
    })
  } catch (error) {
    console.error("Error creating server client:", error)
    // Fallback to basic client
    return createClient(supabaseUrl!, supabaseAnonKey!)
  }
})
