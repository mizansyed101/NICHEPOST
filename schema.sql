-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create User Settings Table
CREATE TABLE IF NOT EXISTS public.user_settings (
    email TEXT PRIMARY KEY REFERENCES auth.users(email) ON DELETE CASCADE,
    name TEXT,
    niches TEXT[] DEFAULT '{}',
    tone TEXT DEFAULT 'Professional',
    brand_url TEXT,
    reminders_enabled BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create Profiles Table (if not exists)
CREATE TABLE IF NOT EXISTS public.profiles (
    email TEXT PRIMARY KEY,
    credits INTEGER DEFAULT 5,
    plan TEXT DEFAULT 'FREE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (email, credits, plan)
  VALUES (new.email, 5, 'FREE')
  ON CONFLICT (email) DO NOTHING;
  
  INSERT INTO public.user_settings (email, name)
  VALUES (new.email, new.raw_user_meta_data->>'full_name')
  ON CONFLICT (email) DO NOTHING;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Enable RLS (Row Level Security)
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings" ON public.user_settings FOR SELECT USING (auth.jwt() ->> 'email' = email);
CREATE POLICY "Users can update own settings" ON public.user_settings FOR ALL USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.jwt() ->> 'email' = email);

-- 5. RPC for Admin Credit Bypass is not needed as we handle it in API, 
-- but a generic decrement function is helpful:
CREATE OR REPLACE FUNCTION decrement_credits(user_email TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET credits = credits - 1
  WHERE email = user_email AND credits > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
