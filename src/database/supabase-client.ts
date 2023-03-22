import { createClient } from '@supabase/supabase-js';

const bucketUrl = process.env.SUPABASE_BUCKET_URL ?? '';
const buckectKey = process.env.SUPABASE_API_KEY ?? '';

export const supabase = createClient(bucketUrl, buckectKey);
export const BUSINESS_BUCKET_NAME = 'business';
