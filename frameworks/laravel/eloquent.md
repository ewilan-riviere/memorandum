---
title: Eloquent
description: Eloquent ORM
---

# Eloquent

{{ $frontmatter.description }}

## Order by relationship

### Order by

```php
// 80ms
$moviesOrder = Movie::with(['video'])
  ->orderBy(Video::select('last_modified')->whereColumn('videos.id', 'movies.video_id'), 'desc')
  ->take(20)
  ->get()
  ->toArray();
```

### From relationship

```php
// 90ms
$videos = Video::with(['movie'])
  ->orderBy('last_modified', 'desc')
  ->take(20)
  ->get()
  ->toArray();
```

### Join

```php
$moviesJoin = Movie::with(['video'])
  ->join('videos', 'movies.video_id', '=', 'videos.id')
  ->orderBy('videos.last_modified', 'desc')
  ->take(20)
  ->get()
  ->toArray();
```
