import { neon } from '@neondatabase/serverless';
import type { InquiryFormData, InquiryResponse } from '../types/inquiry';

export const submitInquiry = async (
  data: InquiryFormData
): Promise<InquiryResponse> => {
  try {
    // Validation
    if (!data.name || !data.email) {
      return {
        success: false,
        message: 'Name and email are required',
        error: 'Validation error'
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: 'Please enter a valid email address',
        error: 'Invalid email format'
      };
    }

    // Get database URL from environment
    const databaseUrl = import.meta.env.VITE_NEON_DATABASE_URL;
    
    if (!databaseUrl) {
      console.error('Database URL not configured');
      return {
        success: false,
        message: 'Database configuration error. Please contact support.',
        error: 'VITE_NEON_DATABASE_URL not set'
      };
    }

    // Connect to Neon database directly from client
    const sql = neon(databaseUrl);

    // Insert data into database
    const result = await sql`
      INSERT INTO inquiry_submissions (name, email, phone, organization, message)
      VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.organization || null}, ${data.message || null})
      RETURNING id, created_at
    `;

    console.log('✅ Inquiry submitted successfully:', result[0]);

    return {
      success: true,
      message: 'Thank you! Your inquiry has been submitted successfully.',
      id: result[0].id
    };

  } catch (error) {
    console.error('Database error:', error);
    
    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        return {
          success: false,
          message: 'Database table not found. Please run the setup script.',
          error: 'Table does not exist'
        };
      }
      
      if (error.message.includes('connect')) {
        return {
          success: false,
          message: 'Unable to connect to database. Please try again.',
          error: 'Connection error'
        };
      }
    }
    
    return {
      success: false,
      message: 'Failed to submit inquiry. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
