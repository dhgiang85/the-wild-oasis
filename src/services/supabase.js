import {createClient} from "@supabase/supabase-js";

export const REACT_APP_SUPABASE_URL = "https://obstoqdtmlgxsaleumlk.supabase.co"
const REACT_APP_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ic3RvcWR0bWxneHNhbGV1bWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMTgxOTksImV4cCI6MjA1Njg5NDE5OX0.lbeZ6XU0PHGdRov8CvsneiMtqlRZcbFoQc5du0uf6ww"
const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseKey = REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;