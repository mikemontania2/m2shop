import bannersData from '../data/banners.json';

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
    url: string; 
  active: boolean;
  order: number;
}

class BannerService {
  private readAll(): Banner[] {
    const saved = localStorage.getItem('banners');
    return saved ? (JSON.parse(saved) as Banner[]) : (bannersData as Banner[]);
  }

  private writeAll(list: Banner[]): void {
    localStorage.setItem('banners', JSON.stringify(list));
  }

  getBanners(): Banner[] {
    return this.readAll().filter(b => b.active).sort((a, b) => a.order - b.order);
  }

  getAllBanners(): Banner[] {
    return this.readAll();
  }

  getBannerById(id: number): Banner | undefined {
    return this.readAll().find(b => b.id === id);
  }

  upsertBanner(banner: Banner): void {
    const list = this.readAll();
    const idx = list.findIndex(b => b.id === banner.id);
    if (idx >= 0) list[idx] = banner; else list.push(banner);
    this.writeAll(list);
  }

  deleteBanner(id: number): void {
    const list = this.readAll().filter(b => b.id !== id);
    this.writeAll(list);
  }
}

export default new BannerService();
