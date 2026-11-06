/**
 * Utility functions for formatting research content
 */

interface FormatSection {
  title?: string;
  content: string;
  type: 'quote' | 'summary' | 'paragraph' | 'list' | 'header';
}

/**
 * Converts plain text content to well-formatted HTML
 */
export const formatResearchContent = (content: string): string => {
  if (!content) return '';
  
  // Split content into sections and paragraphs
  const sections = parseContentSections(content);
  
  return sections.map(section => {
    switch (section.type) {
      case 'quote':
        return `<blockquote class="border-l-4 border-cc-navy dark:border-cc-gold pl-4 py-2 bg-gray-50 dark:bg-gray-800/50 italic text-gray-700 dark:text-gray-300 my-4">${section.content}</blockquote>`;
      
      case 'summary':
        return `<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-6">
          ${section.title ? `<h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">${section.title}</h3>` : ''}
          <div class="text-blue-800 dark:text-blue-200">${formatParagraphs(section.content)}</div>
        </div>`;
      
      case 'header':
        return `<h3 class="text-xl font-semibold text-cc-navy dark:text-white mt-6 mb-4 flex items-center gap-2">
          <span class="w-1 h-6 bg-cc-gold"></span>
          ${section.content}
        </h3>`;
      
      case 'list':
        return `<div class="my-4">${formatList(section.content)}</div>`;
      
      default:
        return `<div class="my-4">${formatParagraphs(section.content)}</div>`;
    }
  }).join('');
};

/**
 * Parse content into different sections based on patterns with enhanced detection
 */
const parseContentSections = (content: string): FormatSection[] => {
  // First, intelligently split the content into sentences and logical blocks
  const intelligentBlocks = splitIntoIntelligentBlocks(content);
  const sections: FormatSection[] = [];
  
  for (const block of intelligentBlocks) {
    const blockType = detectBlockType(block);
    
    switch (blockType) {
      case 'header':
        sections.push({
          type: 'header',
          content: block.replace(/^#+\s*/, '').trim()
        });
        break;
      
      case 'summary':
        const summaryTitle = extractSummaryTitle(block);
        sections.push({
          type: 'summary',
          title: summaryTitle,
          content: block.replace(new RegExp(`^${summaryTitle}:?\\s*`, 'i'), '').trim()
        });
        break;
      
      case 'quote':
        sections.push({
          type: 'quote',
          content: block.replace(/^[""]|[""]$/g, '').trim()
        });
        break;
      
      case 'list':
        sections.push({
          type: 'list',
          content: block
        });
        break;
      
      default:
        // Split long paragraphs into smaller, readable chunks
        const paragraphs = splitIntoParagraphs(block);
        paragraphs.forEach(paragraph => {
          if (paragraph.trim()) {
            sections.push({
              type: 'paragraph',
              content: paragraph.trim()
            });
          }
        });
        break;
    }
  }
  
  return sections;
};

/**
 * Split content into intelligent blocks based on natural breaks and financial context
 */
const splitIntoIntelligentBlocks = (content: string): string[] => {
  const blocks: string[] = [];
  
  // Transition phrases that indicate new topics
  const transitionPhrases = [
    'On the price front', 'Market activity', 'As a result', 'Consequently',
    'The market closed', 'Trading volumes', 'Weekly performance', 'Price movements',
    'Market summary', 'Looking ahead', 'In conclusion', 'Meanwhile', 'However',
    'On the other hand', 'Additionally', 'Furthermore', 'Subsequently'
  ];
  
  // Split by double line breaks first
  let sections = content.split(/\n\s*\n/).filter(section => section.trim());
  
  // Further split sections that contain multiple topics
  const refinedSections: string[] = [];
  
  for (const section of sections) {
    const sentences = section.split(/(?<=[.!?])\s+(?=[A-Z])/);
    let currentBlock = '';
    
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim();
      
      // Check if this sentence starts a new topic
      const startsNewTopic = transitionPhrases.some(phrase => 
        sentence.toLowerCase().startsWith(phrase.toLowerCase())
      );
      
      // Check if previous sentence ended a topic (contains financial data)
      const previousEndsWithFinancialData = currentBlock && 
        /[+-]?\d+\.?\d*%|GHS?[\d,]+\.?\d*|USD?[\d,]+\.?\d*/.test(currentBlock);
      
      if (startsNewTopic && currentBlock.trim()) {
        refinedSections.push(currentBlock.trim());
        currentBlock = sentence;
      } else if (previousEndsWithFinancialData && 
                 sentence.length > 50 && 
                 !sentence.toLowerCase().includes('the') && 
                 currentBlock.split(' ').length > 30) {
        // Break after financial data if next sentence is substantial and doesn't seem connected
        refinedSections.push(currentBlock.trim());
        currentBlock = sentence;
      } else {
        currentBlock += (currentBlock ? ' ' : '') + sentence;
      }
    }
    
    if (currentBlock.trim()) {
      refinedSections.push(currentBlock.trim());
    }
  }
  
  return refinedSections.length > 0 ? refinedSections : [content];
};

/**
 * Detect the type of content block
 */
const detectBlockType = (block: string): string => {
  const trimmed = block.trim();
  
  // Header detection
  if (trimmed.startsWith('#') || 
      (trimmed.length > 3 && trimmed.length < 100 && 
       trimmed === trimmed.toUpperCase() && 
       /^[A-Z\s:&\-]+$/.test(trimmed))) {
    return 'header';
  }
  
  // Quote detection
  if (trimmed.startsWith('"') || trimmed.startsWith('"') || 
      (trimmed.length < 200 && 
       (trimmed.toLowerCase().includes('market sentiment') || 
        trimmed.toLowerCase().includes('activity was') ||
        /^[A-Z][^.]*\.$/.test(trimmed) && trimmed.split(' ').length < 15))) {
    return 'quote';
  }
  
  // Summary detection
  if (/market\s+summary|summary|overview|key\s+highlights/i.test(trimmed.substring(0, 50))) {
    return 'summary';
  }
  
  // List detection
  if (/^[-*•]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed) || 
      trimmed.split('\n').some(line => /^[-*•]\s/.test(line.trim()) || /^\d+\.\s/.test(line.trim()))) {
    return 'list';
  }
  
  return 'paragraph';
};

/**
 * Extract summary title from block
 */
const extractSummaryTitle = (block: string): string => {
  const match = block.match(/^([^:]+):/);
  if (match) return match[1].trim();
  
  if (block.toLowerCase().includes('market summary')) return 'Market Summary';
  if (block.toLowerCase().includes('overview')) return 'Overview';
  if (block.toLowerCase().includes('highlights')) return 'Key Highlights';
  
  return 'Summary';
};

/**
 * Split a block into well-sized paragraphs
 */
const splitIntoParagraphs = (block: string): string[] => {
  // If block is already reasonable size, return as is
  if (block.length < 400) {
    return [block];
  }
  
  const sentences = block.split(/(?<=[.!?])\s+(?=[A-Z])/);
  const paragraphs: string[] = [];
  let currentParagraph = '';
  
  for (const sentence of sentences) {
    const testLength = currentParagraph.length + sentence.length;
    
    // If adding this sentence would make paragraph too long, start new one
    if (testLength > 300 && currentParagraph.trim()) {
      paragraphs.push(currentParagraph.trim());
      currentParagraph = sentence;
    } else {
      currentParagraph += (currentParagraph ? ' ' : '') + sentence;
    }
  }
  
  if (currentParagraph.trim()) {
    paragraphs.push(currentParagraph.trim());
  }
  
  return paragraphs;
};

/**
 * Format regular paragraphs with proper spacing
 */
const formatParagraphs = (text: string): string => {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(paragraph => `<p class="mb-4 leading-relaxed">${formatInlineElements(paragraph)}</p>`)
    .join('');
};

/**
 * Format list items properly
 */
const formatList = (text: string): string => {
  const items = text.split('\n').filter(line => line.trim());
  const listItems = items.map(item => {
    const cleanItem = item.replace(/^[-*•]\s*/, '').replace(/^\d+\.\s*/, '');
    return `<li class="mb-2 leading-relaxed">${formatInlineElements(cleanItem)}</li>`;
  }).join('');
  
  return `<ul class="list-disc list-inside space-y-2 pl-4">${listItems}</ul>`;
};

/**
 * Format inline elements like bold, percentages, currencies
 */
const formatInlineElements = (text: string): string => {
  return text
    // Format percentages
    .replace(/([+-]?\d+\.?\d*%)/g, '<span class="font-semibold text-cc-navy dark:text-cc-gold">$1</span>')
    // Format currencies (GHS, USD, etc.)
    .replace(/GHS?([\d,]+\.?\d*)/gi, '<span class="font-semibold text-green-600 dark:text-green-400">GHS$1</span>')
    .replace(/USD?([\d,]+\.?\d*)/gi, '<span class="font-semibold text-green-600 dark:text-green-400">USD$1</span>')
    // Format company names and tickers (words in parentheses or all caps)
    .replace(/\b([A-Z]{2,})\b/g, '<span class="font-medium text-cc-navy dark:text-white">$1</span>')
    // Format numbers with commas
    .replace(/\b(\d{1,3}(?:,\d{3})+(?:\.\d+)?)\b/g, '<span class="font-medium">$1</span>')
    // Format bold text (if marked with ** or __)
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-cc-navy dark:text-white">$1</strong>')
    .replace(/__(.*?)__/g, '<strong class="font-semibold text-cc-navy dark:text-white">$1</strong>');
};

/**
 * Format preview text with special styling
 */
export const formatPreviewText = (preview: string): string => {
  if (!preview) return '';
  
  return formatInlineElements(preview);
};