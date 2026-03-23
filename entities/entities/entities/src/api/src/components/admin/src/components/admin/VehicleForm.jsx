import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, Save } from 'lucide-react';

export default function VehicleForm({ vehicle, onSave, onCancel }) {
  const [form, setForm] = useState(vehicle || {
    name: '', brand: '', year: '', price: '', daily_rate: '',
    category: 'sale', fuel_type: 'diesel', transmission: 'manual',
    mileage: '', image_url: '', video_url: '', description: '',
    is_featured: false, status: 'available',
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form };
    if (data.year) data.year = Number(data.year);
    if (data.price) data.price = Number(data.price);
    if (data.daily_rate) data.daily_rate = Number(data.daily_rate);
    if (data.mileage) data.mileage = Number(data.mileage);
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-serif text-lg font-semibold">
          {vehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
        </h3>
        <button type="button" onClick={onCancel}><X size={20} /></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs tracking-wider">MARQUE</Label>
          <Input value={form.brand} onChange={e => handleChange('brand', e.target.value)} required />
        </div>
        <div>
          <Label className="text-xs tracking-wider">MODÈLE</Label>
          <Input value={form.name} onChange={e => handleChange('name', e.target.value)} required />
        </div>
        <div>
          <Label className="text-xs tracking-wider">CATÉGORIE</Label>
          <Select value={form.category} onValueChange={v => handleChange('category', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sale">Vente</SelectItem>
              <SelectItem value="rental">Location</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs tracking-wider">ANNÉE</Label>
          <Input type="number" value={form.year} onChange={e => handleChange('year', e.target.value)} />
        </div>
        <div>
          <Label className="text-xs tracking-wider">PRIX (MAD)</Label>
          <Input type="number" value={form.price} onChange={e => handleChange('price', e.target.value)} />
        </div>
        <div>
          <Label className="text-xs tracking-wider">TARIF JOURNALIER (MAD)</Label>
          <Input type="number" value={form.daily_rate} onChange={e => handleChange('daily_rate', e.target.value)} />
        </div>
        <div>
          <Label className="text-xs tracking-wider">CARBURANT</Label>
          <Select value={form.fuel_type} onValueChange={v => handleChange('fuel_type', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="gasoline">Essence</SelectItem>
              <SelectItem value="hybrid">Hybride</SelectItem>
              <SelectItem value="electric">Électrique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs tracking-wider">TRANSMISSION</Label>
          <Select value={form.transmission} onValueChange={v => handleChange('transmission', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manuelle</SelectItem>
              <SelectItem value="automatic">Automatique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs tracking-wider">KILOMÉTRAGE</Label>
          <Input type="number" value={form.mileage} onChange={e => handleChange('mileage', e.target.value)} />
        </div>
        <div>
          <Label className="text-xs tracking-wider">STATUT</Label>
          <Select value={form.status} onValueChange={v => handleChange('status', v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Disponible</SelectItem>
              <SelectItem value="sold">Vendu</SelectItem>
              <SelectItem value="rented">Loué</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-xs tracking-wider">LIEN IMAGE</Label>
        <Input value={form.image_url} onChange={e => handleChange('image_url', e.target.value)}
          placeholder="https://..." />
      </div>
      <div>
        <Label className="text-xs tracking-wider">LIEN VIDÉO</Label>
        <Input value={form.video_url} onChange={e => handleChange('video_url', e.target.value)}
          placeholder="https://..." />
      </div>
      <div>
        <Label className="text-xs tracking-wider">DESCRIPTION</Label>
        <Textarea value={form.description} onChange={e => handleChange('description', e.target.value)} rows={3} />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={form.is_featured}
          onChange={e => handleChange('is_featured', e.target.checked)}
          className="rounded" id="featured" />
        <label htmlFor="featured" className="text-sm">Véhicule vedette (Hero)</label>
      </div>

      <Button type="submit" className="w-full" style={{ backgroundColor: '#9E0000' }}>
        <Save size={16} className="mr-2" />
        {vehicle ? 'Mettre à jour' : 'Ajouter'}
      </Button>
    </form>
  );
}
