import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class OasisService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('oasis')
      .select('*')
      .order('fecha_inicio', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('oasis')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
  async findBySlug(slug: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('oasis')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  }

  async create(createOasisDto: any) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('oasis')
      .insert([createOasisDto])
      .select();
    
    if (error) {
      console.error('Supabase Create Error:', error);
      throw error;
    }
    return data[0];
  }

  async update(id: string, updateOasisDto: any) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('oasis')
      .update(updateOasisDto)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }

  async remove(id: string) {
    const { error } = await this.supabaseService
      .getClient()
      .from('oasis')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { deleted: true };
  }

  async uploadImage(file: any) {
    if (!file) throw new Error('No file provided');
    const filename = `${Date.now()}-${file.originalname.replace(/\\s+/g, '-')}`;
    
    const { data, error } = await this.supabaseService
      .getClient()
      .storage.from('oasis-images')
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
      });
      
    if (error) {
      console.error('Supabase Upload Error:', error);
      throw new HttpException(error.message || 'Upload failed', HttpStatus.BAD_REQUEST);
    }
    
    const { data: publicUrlData } = this.supabaseService
      .getClient()
      .storage.from('oasis-images')
      .getPublicUrl(filename);
      
    return { url: publicUrlData.publicUrl };
  }
}
