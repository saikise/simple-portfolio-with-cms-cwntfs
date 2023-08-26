CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE series (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(255) NOT NULL
);

CREATE TABLE platforms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    icon VARCHAR(255) NOT NULL
);

CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    pinned BOOLEAN DEFAULT FALSE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL
);

-- A project can have many series
-- A series can have many projects
CREATE TABLE projects_series (
    project_id UUID REFERENCES projects(id),
    series_id UUID REFERENCES series(id),
    PRIMARY KEY (project_id, series_id)
);

-- A project can have many platforms
-- A platform can have many projects
CREATE TABLE projects_platforms (
    project_id UUID REFERENCES projects(id),
    platform_id UUID REFERENCES platforms(id),
    url VARCHAR(255) NOT NULL,
    PRIMARY KEY (project_id, platform_id)
);

-- Lock all tables with RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE series ENABLE ROW LEVEL SECURITY;
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects_series ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects_platforms ENABLE ROW LEVEL SECURITY;

-- Reference: https://supabase.com/docs/guides/auth/row-level-security#authenticated-and-anonymous-roles
-- Allow authenticated users to CRUD all tables
CREATE POLICY "Allow authenticated users to CRUD their own profile" 
ON profiles FOR ALL TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY "Allow authenticated users to CRUD series"
ON series FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to CRUD platforms"
ON platforms FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to CRUD projects"
ON projects FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to CRUD projects_series"
ON projects_series FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to CRUD projects_platforms"
ON projects_platforms FOR ALL TO authenticated USING (true);

-- Allow anonymous users to read all tables
CREATE POLICY "Allow anonymous to read profiles"
ON profiles FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous to read series"
ON series FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous to read platforms"
ON platforms FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous to read projects"
ON projects FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous to read projects_series"
ON projects_series FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anonymous to read projects_platforms"
ON projects_platforms FOR SELECT TO anon USING (true);

-- Automatically create a profile when a new user is created
CREATE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users 
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Add bucket for images
INSERT INTO storage.buckets (id, name) 
VALUES ('images', 'images');

-- Allow everyone to read images
CREATE POLICY "Allow public access to images" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to CRUD images
CREATE POLICY "Allow authenticated users to CRUD images" ON storage.objects FOR ALL TO authenticated USING (
  auth.role() = 'authenticated'
) WITH CHECK (
  auth.role() = 'authenticated'
);