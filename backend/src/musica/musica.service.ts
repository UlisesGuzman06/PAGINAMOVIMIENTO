import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class MusicaService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll(categoria?: string) {
    let query = this.supabaseService
      .getClient()
      .from('canciones')
      .select('*')
      .eq('activa', true)
      .order('created_at', { ascending: false });

    if (categoria) {
      query = query.eq('categoria', categoria);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('canciones')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(dto: any) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('canciones')
      .insert([dto])
      .select();

    if (error) {
      console.error('Supabase Create Error:', error);
      throw error;
    }
    return data[0];
  }

  async update(id: string, dto: any) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('canciones')
      .update(dto)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  }

  async remove(id: string) {
    const { error } = await this.supabaseService
      .getClient()
      .from('canciones')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { deleted: true };
  }

  async uploadAudio(file: any) {
    if (!file) throw new Error('No file provided');
    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;

    const { data, error } = await this.supabaseService
      .getClient()
      .storage.from('musica-audios')
      .upload(filename, file.buffer, { contentType: file.mimetype });

    if (error) {
      throw new HttpException(error.message || 'Upload failed', HttpStatus.BAD_REQUEST);
    }

    const { data: publicUrlData } = this.supabaseService
      .getClient()
      .storage.from('musica-audios')
      .getPublicUrl(filename);

    return { url: publicUrlData.publicUrl };
  }
}
