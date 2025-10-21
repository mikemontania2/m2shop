import cardsData from '../data/cards.json';

export interface Card {
  id: string;
  userId: number;
  holder: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
}

class CardService {
  private read(): Card[] {
    const saved = localStorage.getItem('cards');
    return saved ? (JSON.parse(saved) as Card[]) : (cardsData as Card[]);
  }
  private write(list: Card[]): void {
    localStorage.setItem('cards', JSON.stringify(list));
  }

  getByUser(userId: number): Card[] { return this.read().filter(c => c.userId === userId); }
  upsert(card: Card): void {
    const list = this.read();
    const idx = list.findIndex(c => c.id === card.id);
    if (idx >= 0) list[idx] = card; else list.push(card);
    this.write(list);
  }
  delete(id: string): void { this.write(this.read().filter(c => c.id !== id)); }
}

export default new CardService();
