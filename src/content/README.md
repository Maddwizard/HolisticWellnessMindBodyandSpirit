# Content Directory

This directory contains all the educational content for the Natural Health Alternatives platform, organized by category.

## Structure

```
src/content/
├── nutrition/           # Biblical foods and healing recipes
├── exercise/           # Movement as worship and health
├── meditation/         # Prayer, mindfulness, and spiritual practices
└── biblical-health/    # Scripture-based health principles
```

## Content Guidelines

### File Format
- All content files should be in Markdown (`.md`) format
- Use descriptive filenames (e.g., `biblical-foods.md`, `movement-as-worship.md`)

### Content Structure
Each markdown file should include:

1. **Title** - Main heading with `#`
2. **Introduction** - Brief overview of the topic
3. **Biblical Foundation** - Scripture references and principles
4. **Practical Applications** - How to apply the principles
5. **Safety Guidelines** - Important health and safety notes
6. **Disclaimer** - Educational content only, not medical advice

### Example Structure
```markdown
# Article Title

## Introduction
Brief overview of the topic...

## Biblical Foundation
- **Scripture**: Reference
- **Principle**: Key principle
- **Application**: How to apply

## Practical Applications
Step-by-step guidance...

## Safety Guidelines
Important safety notes...

## Disclaimer
This content is for educational purposes only and is not intended as medical advice.
```

## Categories

### Nutrition
- Biblical foods and their health benefits
- Healing recipes and meal plans
- Dietary principles from scripture

### Exercise
- Movement as spiritual practice
- Biblical principles of physical health
- Exercise routines and guidance

### Meditation
- Prayer and mindfulness practices
- Biblical meditation techniques
- Spiritual wellness practices

### Biblical Health
- Scripture-based wellness principles
- Holistic health from a faith perspective
- Integration of faith and health

## Content Management

The content is automatically parsed by the `src/lib/content.ts` utility, which:
- Extracts titles, excerpts, and metadata
- Provides search functionality
- Organizes content by category
- Generates content listings for the website

## Adding New Content

1. Create a new `.md` file in the appropriate category directory
2. Follow the content structure guidelines
3. Include proper disclaimers and safety notes
4. Test the content parsing by running the development server

## Important Notes

- All content must include appropriate medical disclaimers
- Biblical references should be accurate and properly cited
- Content should be educational, not prescriptive
- Always emphasize consulting healthcare professionals 