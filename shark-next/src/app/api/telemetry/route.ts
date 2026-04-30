import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { installation_id } = await req.json();
    
    if (!installation_id) {
      return NextResponse.json({ error: 'installation_id is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('telemetry')
      .insert([{ installation_id }]);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
