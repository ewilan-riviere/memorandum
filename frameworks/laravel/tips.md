---
title: Tips
description: Some tips with Laravel
---

# Tips

{{ $frontmatter.description }}

## Shorcut Where relationships

```php
// Before:

User::whereHas('posts', function ($query) {
  $query->where('published_at', '>', now());
})->get();

// After
User::whereRelation('posts', 'published_at', '>', now());
```
