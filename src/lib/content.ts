import { promises as fs } from 'fs';
import path from 'path';

export interface ContentItem {
  id: string;
  title: string;
  content: string;
  category: 'nutrition' | 'exercise' | 'meditation' | 'biblical-health';
  excerpt?: string;
  tags?: string[];
  publishedAt?: Date;
}

export interface ContentCategory {
  name: string;
  slug: string;
  description: string;
  articles: ContentItem[];
}

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

export async function getAllContent(): Promise<ContentItem[]> {
  const categories = ['nutrition', 'exercise', 'meditation', 'biblical-health'];
  const allContent: ContentItem[] = [];

  for (const category of categories) {
    const categoryPath = path.join(CONTENT_DIR, category);
    try {
      const files = await fs.readdir(categoryPath);
      for (const file of files) {
        if (file.endsWith('.md')) {
          const filePath = path.join(categoryPath, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const id = file.replace('.md', '');
          
          allContent.push({
            id,
            title: extractTitle(content),
            content,
            category: category as any,
            excerpt: extractExcerpt(content),
            tags: extractTags(content),
            publishedAt: new Date()
          });
        }
      }
    } catch (error) {
      console.warn(`Category ${category} not found or empty`);
    }
  }

  return allContent;
}

export async function getContentByCategory(category: string): Promise<ContentItem[]> {
  const allContent = await getAllContent();
  return allContent.filter(item => item.category === category);
}

export async function getContentById(id: string): Promise<ContentItem | null> {
  const allContent = await getAllContent();
  return allContent.find(item => item.id === id) || null;
}

export async function getCategories(): Promise<ContentCategory[]> {
  const categories = [
    {
      name: 'Nutrition',
      slug: 'nutrition',
      description: 'Biblical foods and healing recipes'
    },
    {
      name: 'Exercise',
      slug: 'exercise',
      description: 'Movement as worship and health'
    },
    {
      name: 'Meditation',
      slug: 'meditation',
      description: 'Prayer, mindfulness, and spiritual practices'
    },
    {
      name: 'Biblical Health',
      slug: 'biblical-health',
      description: 'Scripture-based health principles'
    }
  ];

  const categoriesWithArticles = await Promise.all(
    categories.map(async cat => ({
      ...cat,
      articles: await getContentByCategory(cat.slug)
    }))
  );

  return categoriesWithArticles;
}

function extractTitle(content: string): string {
  const titleMatch = content.match(/^# (.+)$/m);
  return titleMatch ? titleMatch[1] : 'Untitled';
}

function extractExcerpt(content: string): string {
  // Remove markdown headers and get first paragraph
  const cleanContent = content.replace(/^#.*$/gm, '').trim();
  const firstParagraph = cleanContent.split('\n\n')[0];
  return firstParagraph ? firstParagraph.substring(0, 150) + '...' : '';
}

function extractTags(content: string): string[] {
  const tagMatch = content.match(/tags:\s*\[(.*)\]/);
  if (tagMatch) {
    return tagMatch[1].split(',').map(tag => tag.trim().replace(/"/g, ''));
  }
  return [];
}

export async function searchContent(query: string): Promise<ContentItem[]> {
  const allContent = await getAllContent();
  const lowercaseQuery = query.toLowerCase();
  
  return allContent.filter((item: ContentItem) => 
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.content.toLowerCase().includes(lowercaseQuery) ||
    item.tags?.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))
  );
} 