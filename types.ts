
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface RsvpData {
  name: string;
  unit: string;
  childrenCount: string;
  ages: string;
}
