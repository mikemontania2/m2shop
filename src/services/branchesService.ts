import branchesData from '../data/sucursales.json';

export interface Branch {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  coverage?: [number, number][];
}

class BranchesService {
  private read(): Branch[] {
    const saved = localStorage.getItem('branches');
    return saved ? (JSON.parse(saved) as Branch[]) : (branchesData as Branch[]);
  }

  private write(list: Branch[]): void {
    localStorage.setItem('branches', JSON.stringify(list));
  }

  getBranches(): Branch[] { return this.read(); }
  getBranch(id: string): Branch | undefined { return this.read().find(b => b.id === id); }
  upsertBranch(branch: Branch): void {
    const list = this.read();
    const idx = list.findIndex(b => b.id === branch.id);
    if (idx >= 0) list[idx] = branch; else list.push(branch);
    this.write(list);
  }
  deleteBranch(id: string): void { this.write(this.read().filter(b => b.id !== id)); }
}

export default new BranchesService();
