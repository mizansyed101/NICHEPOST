-- User Preferences Table
CREATE TABLE user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    niche_keywords TEXT[] DEFAULT '{}',
    post_interval INTEGER DEFAULT 3, -- in hours
    time_slots JSONB DEFAULT '{"start": "09:00", "end": "21:00"}',
    social_platforms TEXT[] DEFAULT '{"twitter", "linkedin", "instagram"}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts Queue Table
CREATE TABLE posts_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content JSONB NOT NULL, -- { twitter: "...", linkedin: "...", instagram: "..." }
    status TEXT DEFAULT 'queued', -- queued, posted, failed
    niche TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for scheduler performance
CREATE INDEX idx_posts_queue_scheduled_at ON posts_queue(scheduled_at) WHERE status = 'queued';
CREATE INDEX idx_posts_queue_user_id ON posts_queue(user_id);
