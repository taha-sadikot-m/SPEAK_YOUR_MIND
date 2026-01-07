# SQL Script to Create Neon Database Table
# Run this in your Neon SQL Editor: https://console.neon.tech

-- Create the inquiry_submissions table
CREATE TABLE IF NOT EXISTS inquiry_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  organization VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email ON inquiry_submissions(email);
CREATE INDEX IF NOT EXISTS idx_created_at ON inquiry_submissions(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_inquiry_submissions_updated_at 
    BEFORE UPDATE ON inquiry_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Verify table creation
SELECT * FROM inquiry_submissions LIMIT 1;
