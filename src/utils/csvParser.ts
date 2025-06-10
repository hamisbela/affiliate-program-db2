import fs from 'fs';
import path from 'path';

export interface CSVAffiliateProgram {
  AffiliateProgram: string;
  Product_type: string;
  Commission: string;
  Cookie: string;
  Signup: string;
  Description: string;
  Categories: string;
}

export interface ParsedProgram {
  name: string;
  productType: string;
  commission: string;
  cookieDuration: string;
  signupLink: string;
  description: string;
  categories: string[];
}

export function parseCSV(): ParsedProgram[] {
  try {
    const csvPath = path.join(process.cwd(), 'affiliate-programs.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
    
    const programs: ParsedProgram[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      
      if (values.length >= 7) {
        const program: ParsedProgram = {
          name: values[0] || '',
          productType: values[1] || '',
          commission: values[2] || '',
          cookieDuration: values[3] || '',
          signupLink: values[4] || '',
          description: values[5] || '',
          categories: values[6] ? values[6].split(',').map(cat => cat.trim()) : []
        };
        programs.push(program);
      }
    }
    
    return programs;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
}

function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

export function getAllCategories(): string[] {
  const programs = parseCSV();
  const categorySet = new Set<string>();
  
  programs.forEach(program => {
    program.categories.forEach(category => {
      if (category) {
        categorySet.add(category);
      }
    });
  });
  
  return Array.from(categorySet).sort();
}

export function getProgramsByCategory(category: string): ParsedProgram[] {
  const programs = parseCSV();
  return programs.filter(program => 
    program.categories.some(cat => 
      cat.toLowerCase() === category.toLowerCase()
    )
  );
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}