import { palettes, gradients, type Palette, type InsertPalette, type Gradient, type InsertGradient, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPalettes(): Promise<Palette[]>;
  getPalette(id: number): Promise<Palette | undefined>;
  createPalette(palette: InsertPalette): Promise<Palette>;
  updatePaletteUsage(id: number): Promise<void>;
  getTrendingPalettes(): Promise<Palette[]>;
  
  getGradients(): Promise<Gradient[]>;
  getGradient(id: number): Promise<Gradient | undefined>;
  createGradient(gradient: InsertGradient): Promise<Gradient>;
  updateGradientUsage(id: number): Promise<void>;
  getTrendingGradients(): Promise<Gradient[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private palettes: Map<number, Palette>;
  private gradients: Map<number, Gradient>;
  private currentUserId: number;
  private currentPaletteId: number;
  private currentGradientId: number;

  constructor() {
    this.users = new Map();
    this.palettes = new Map();
    this.gradients = new Map();
    this.currentUserId = 1;
    this.currentPaletteId = 1;
    this.currentGradientId = 1;
    
    // Initialize with some sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample palettes
    const samplePalettes: InsertPalette[] = [
      {
        name: "Modern Minimalist",
        description: "Clean and sophisticated grayscale palette",
        colors: ["#1a1a1a", "#666666", "#999999", "#cccccc", "#ffffff"],
        tags: ["minimal", "grayscale", "clean"]
      },
      {
        name: "Ocean Breeze",
        description: "Calming blue tones inspired by the sea",
        colors: ["#1e3a8a", "#2563eb", "#60a5fa", "#67e8f9", "#ecfeff"],
        tags: ["blue", "ocean", "calming"]
      },
      {
        name: "Sunset Warmth",
        description: "Vibrant warm colors of golden hour",
        colors: ["#ea580c", "#fb923c", "#fde047", "#f472b6", "#a855f7"],
        tags: ["warm", "sunset", "vibrant"]
      },
      {
        name: "Forest Fresh",
        description: "Natural green tones from nature",
        colors: ["#166534", "#16a34a", "#4ade80", "#bef264", "#f7fee7"],
        tags: ["green", "nature", "fresh"]
      },
      {
        name: "Royal Purple",
        description: "Luxurious purple shades for elegance",
        colors: ["#581c87", "#7c3aed", "#a855f7", "#c084fc", "#f3e8ff"],
        tags: ["purple", "luxury", "elegant"]
      },
      {
        name: "Autumn Vibes",
        description: "Warm fall colors with earthy tones",
        colors: ["#b91c1c", "#ea580c", "#eab308", "#f59e0b", "#fef3c7"],
        tags: ["autumn", "warm", "earthy"]
      }
    ];

    samplePalettes.forEach(palette => this.createPalette(palette));

    // Sample gradients
    const sampleGradients: InsertGradient[] = [
      {
        name: "Sunset Glow",
        description: "Warm gradient from pink to yellow",
        colors: [{color: "#ec4899", position: 0}, {color: "#ef4444", position: 50}, {color: "#eab308", position: 100}],
        direction: 135,
        type: "linear"
      },
      {
        name: "Ocean Depth",
        description: "Cool blue to green gradient",
        colors: [{color: "#4ade80", position: 0}, {color: "#3b82f6", position: 100}],
        direction: 45,
        type: "linear"
      },
      {
        name: "Cotton Candy",
        description: "Soft purple to pink gradient",
        colors: [{color: "#a855f7", position: 0}, {color: "#ec4899", position: 50}, {color: "#ef4444", position: 100}],
        direction: 90,
        type: "linear"
      },
      {
        name: "Dark Matter",
        description: "Deep black gradient with subtle variations",
        colors: [{color: "#374151", position: 0}, {color: "#111827", position: 50}, {color: "#000000", position: 100}],
        direction: 180,
        type: "linear"
      }
    ];

    sampleGradients.forEach(gradient => this.createGradient(gradient));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPalettes(): Promise<Palette[]> {
    return Array.from(this.palettes.values());
  }

  async getPalette(id: number): Promise<Palette | undefined> {
    return this.palettes.get(id);
  }

  async createPalette(insertPalette: InsertPalette): Promise<Palette> {
    const id = this.currentPaletteId++;
    const palette: Palette = { 
      ...insertPalette, 
      id, 
      usageCount: 0, 
      isTrending: false 
    };
    this.palettes.set(id, palette);
    return palette;
  }

  async updatePaletteUsage(id: number): Promise<void> {
    const palette = this.palettes.get(id);
    if (palette) {
      palette.usageCount = (palette.usageCount || 0) + 1;
      this.palettes.set(id, palette);
    }
  }

  async getTrendingPalettes(): Promise<Palette[]> {
    return Array.from(this.palettes.values())
      .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
      .slice(0, 6);
  }

  async getGradients(): Promise<Gradient[]> {
    return Array.from(this.gradients.values());
  }

  async getGradient(id: number): Promise<Gradient | undefined> {
    return this.gradients.get(id);
  }

  async createGradient(insertGradient: InsertGradient): Promise<Gradient> {
    const id = this.currentGradientId++;
    const gradient: Gradient = { 
      ...insertGradient, 
      id, 
      usageCount: 0, 
      isTrending: false 
    };
    this.gradients.set(id, gradient);
    return gradient;
  }

  async updateGradientUsage(id: number): Promise<void> {
    const gradient = this.gradients.get(id);
    if (gradient) {
      gradient.usageCount = (gradient.usageCount || 0) + 1;
      this.gradients.set(id, gradient);
    }
  }

  async getTrendingGradients(): Promise<Gradient[]> {
    return Array.from(this.gradients.values())
      .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
      .slice(0, 4);
  }
}

export const storage = new MemStorage();
