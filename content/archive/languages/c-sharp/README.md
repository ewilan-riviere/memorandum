---
title: Introduction
description: ''
position: 1
category: 'C#'
---

# Visual Studio

## Snippets

Write snippet and execute with <kbd>Tab</kbd>

To write attribute

```bash
prop
```

To write constructor

```bash
ctor
```

```csharp
using System;

namespace bo_1
{
    public class Personne
    {
        // attributs privés
        private int age;
        private string prenom;
        // private string nom;

        // prop auto-implémentée
        public string Nom { get; set; }

        // 'age' privé donc
        public int Age
        {
            get { return age; }
            set { age = value; }
        }

        public Personne()
        {

        }

        public Personne(string prenom)
        {
            this.prenom = prenom;
        }
    }
}
```

## Syntax

Declaration

```csharp
Point point;
```

Initialisation

```csharp
point = new Point();
```

```csharp
Point point = new Point();
```

Affectation

```csharp
pointA = pointB;
```
