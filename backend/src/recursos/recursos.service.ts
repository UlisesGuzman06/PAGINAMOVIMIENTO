import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class RecursosService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll(categoria?: string, tipo?: string) {
    let query = this.supabaseService
      .getClient()
      .from('recursos')
      .select('*')
      .eq('activo', true)
      .order('destacado', { ascending: false })
      .order('created_at', { ascending: false });

    if (categoria) query = query.eq('categoria', categoria);
    if (tipo) query = query.eq('tipo', tipo);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('recursos')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async create(dto: any) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('recursos')
      .insert([dto])
      .select();
    if (error) { console.error(error); throw error; }
    return data[0];
  }

  async update(id: string, dto: any) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('recursos')
      .update(dto)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  }

  async remove(id: string) {
    const { error } = await this.supabaseService
      .getClient()
      .from('recursos')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return { deleted: true };
  }

  async uploadArchivo(file: any) {
    if (!file) throw new Error('No file provided');
    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    const { data, error } = await this.supabaseService
      .getClient()
      .storage.from('recursos-archivos')
      .upload(filename, file.buffer, { contentType: file.mimetype });
    if (error) throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    const { data: pub } = this.supabaseService
      .getClient()
      .storage.from('recursos-archivos')
      .getPublicUrl(filename);
    return { url: pub.publicUrl };
  }
}
