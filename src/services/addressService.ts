import addressesData from '../data/addresses.json';

export interface Address {
  id: string;
  userId: number;
  street: string;
  number: string;
  cross: string;
  city: string;
  neighborhood: string;
  reference: string;
  lat?: number;
  lng?: number;
}

class AddressService {
  private read(): Address[] {
    const saved = localStorage.getItem('addresses');
    return saved ? (JSON.parse(saved) as Address[]) : (addressesData as Address[]);
  }
  private write(list: Address[]): void {
    localStorage.setItem('addresses', JSON.stringify(list));
  }

  getByUser(userId: number): Address[] { return this.read().filter(a => a.userId === userId); }
  upsert(address: Address): void {
    const list = this.read();
    const idx = list.findIndex(a => a.id === address.id);
    if (idx >= 0) list[idx] = address; else list.push(address);
    this.write(list);
  }
  delete(id: string): void { this.write(this.read().filter(a => a.id !== id)); }
}

export default new AddressService();
