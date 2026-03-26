-- users (handled by NextAuth + Supabase Auth)

-- user_settings
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    niches TEXT[] NOT NULL DEFAULT '{}',
    tone TEXT NOT NULL DEFAULT 'Professional',
    audience TEXT,
    posts_per_day INTEGER NOT NULL DEFAULT 1,
    time_slots TEXT[] NOT NULL DEFAULT '{}',
    timezone TEXT NOT NULL DEFAULT 'UTC',
    email TEXT NOT NULL,
    reminders_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- scheduled_posts
CREATE TABLE IF NOT EXISTS scheduled_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content_twitter TEXT,
    content_linkedin TEXT,
    content_reddit TEXT,
    content_telegram TEXT,
    content_facebook TEXT,
    content_whatsapp TEXT,
    content_threads TEXT,
    scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    platforms_posted TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- post_streaks
CREATE TABLE IF NOT EXISTS post_streaks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    current_streak INTEGER NOT NULL DEFAULT 0,
    longest_streak INTEGER NOT NULL DEFAULT 0,
    last_posted_date DATE,
    total_posts INTEGER NOT NULL DEFAULT 0
);
