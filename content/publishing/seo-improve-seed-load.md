# How to Improve Your Website’s Page Load Speed

From [javascript.plainenglish.io](https://javascript.plainenglish.io/how-to-improve-your-websites-page-load-speed-8fa81caf3ed2)

By [Zoltan Bettenbuk](https://zoltanbettenbuk.medium.com/?source=post_page-----8fa81caf3ed2--------------------------------)

If you have ever experienced a slow-loading website, you understand how page speed can impact user experience. No one wants to wait 10 seconds — or even more — to access the information they are looking for.

**Pages that load fast have better user retention and lower bounce rates, and win users’ trust faster.**

No matter how strong your design or content is, if your website performs poorly, users won’t invest any time on your site.

In fact, [one study](https://www.websitebuilderexpert.com/building-websites/website-load-time-statistics/) found that eCommerce sites with a one-second delay will experience “11% fewer page views, 16% decrease in customer satisfaction and 7% fewer conversions”.

What’s more, page speed is also becoming a ranking factor in the form of [Core Web Vitals](https://www.searchenginejournal.com/google-core-web-vitals-ranking-signals/387142/).

Because user experience is so important, Google is actively tracking load speed indicators like Large Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). Having a GOOD score on the three factors is a must. You can measure how well your website is performing through the [core web vitals report in Google Search Console](https://support.google.com/webmasters/answer/9205520?hl=en).

# 3 Tools to Measure Page Speed

You can’t optimize your website speed without first understanding how well you perform. There are three simple tools you can use:

## 1\. [Google Search Console](https://search.google.com/search-console/about)

Although it technically doesn’t measure site speed, you can use the new core web vitals report to find loading issues you need to take care of. Google Search Console will score your overall site and provide you with a list of URLs that need to be optimized.

## 2\. [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

Developed by Google, PageSpeed Insights is a site speed tester capable of identifying underlying load speed issues. It’s as simple as entering the URL you want to inspect, and the tool will crawl your site and create a full report.

The tool will generate a Desktop and Mobile score and a few recommendations to optimize the page. Here’s what we are aiming for:

![](https://miro.medium.com/max/60/0*dpNGYrZv8J19eQnn?q=20)

![](https://miro.medium.com/max/732/0*dpNGYrZv8J19eQnn)

![](https://miro.medium.com/max/1464/0*dpNGYrZv8J19eQnn)

And here’s what we need to avoid:

![](https://miro.medium.com/max/60/0*39Jp1Nw8fFfXzxHE?q=20)

![](https://miro.medium.com/max/735/0*39Jp1Nw8fFfXzxHE)

![](https://miro.medium.com/max/1470/0*39Jp1Nw8fFfXzxHE)

## 3\. [GTmetrix](https://gtmetrix.com/)

If you want more advanced features or if you want to test your page speed on specific locations, GTmetrix is a helpful tool.

It will test your website’s page load speed from different locations so you can focus on increasing your website’s user experience within the geographies you’re targeting. What makes this tool so helpful is the advanced settings. You can set the location, device, screen resolution, and more to gather more accurate information that you can act on.

# 8 Steps to Improve Your Website’s Page Load Speed

With the basics out of the way, let’s explore eight ways to improve your site’s load speed:

## 1\. Optimize your images

When talking about [image optimization](http://www.canirank.com/blog/optimize-images-web-better-seo/) for site speed, we’re referring to three things:

## Image file size

Images are a great way to add context, explain complex topics, or just give breathing space between blocks of content. However, heavy images will slow down your page.

You should aim for the smallest file size possible. **A good mark for big images is 150kb to 500kb per image**. After all, you’ll probably have several images, and they will all contribute to your page’s overall size.

If you need to compress them, [TinyPNG](https://tinypng.com/) is a great free tool you can start using. Just download your images from your server, compress them, and reload them.

**Tip:** Use the opportunity to optimize their names, alt attributes, and formats.

## File format

It’s not uncommon to use PNG images when creating content. They are easier to handle, after all.

The problem? These are heavy image types contributing to slow load speeds. Without getting into a whole debate on image extensions, we recommend using JPGs. These have become the standard format for images on the web. They do not lose quality, and their file size is small.

**Note:** A semi-new format getting a lot of attention are WebPs. This format is extremely light, being [33% lighter than JPGs](https://developers.google.com/speed/webp/docs/webp_study). The downside is the format still has compatibility issues with some browsers.

## Image dimensions

Yes. Your image resolution is important. However, unless it’ll cover all the screen real estate of your users, you don’t really need a 4000 x 4000 image.

Make sure to upload a decent image that doesn’t lose quality while scaling. I.e., 800 x 1200 images are the most common on articles.

In addition, you must state your images’ dimensions right within the image tag. The browser will calculate the space it needs to “save” for the image before it loads, reducing your page’s CLS (cumulative layout shift).

You can add the width and height attributes. For example:

<! — set a 640:360 i.e a 16:9 — aspect ratio → <img src=”puppy.jpg” width=”640" height=”360" alt=”Puppy with balloons” />

Here’s a comprehensive guide on [CLS optimization](https://web.dev/optimize-cls/) you can use from the web.dev team.

# 2\. Minify your CSS and JavaScript

Minifying your CSS and JavaScript files is meant to reduce the amount of time it takes the browser to load every element it needs to show your site.

Because machines are not sensitive to stylistic choices, we can create smaller-sized files by removing white spaces, deleting comments, using shorter names, and basically stripping out any part of our code unnecessary for our machines to run it.

Of course, you don’t want to minify the actual code you’re working on, as it will become almost impossible to read.

You want to create a minified version of your files and implement them on your live project instead. To do so, we recommend two simple tools:

* [https://cssminifier.com/](https://cssminifier.com/)
* [https://javascript-minifier.com/](https://javascript-minifier.com/)

These are straightforward tools that only require you to add your code in the “Input” box and then hit minify to convert your code into a minified version you can copy and paste on your project.

**Tip:** In addition to minifying your files, you can also [enable Gzip compression](https://gtmetrix.com/enable-text-compression.html#how-to-enable-text-compression) to reduce your file sizes further.

# 3\. Beware of third-party scripts

If you’re using tools like Google Analytics, you’re already using third-party scripts.

These scripts are super helpful to add new functionality to your site. Yet, they still are snippets of code that need to get rendered or read on the client-side, contributing to page speed load time. Ensure the code you’re adding is optimized and essential. Delete anything that is not being used.

# 4\. Use a VPS hosting service

The servers your hosting provider uses are vital for your site speed. If the machines are slow to respond to a user’s request, then the browser will receive the information slowly, no matter how fast the user’s internet connection is.

Another factor is the plan you’re using. Commonly, shared plans are inexpensive as the hosting provider rents the same server for several clients, which is more than sufficient for low-traffic sites.

However, if you truly need to improve your site speed, you’ll need access to more resources from your server. Even more so, you’ll need consistency in the amount of resources your site has access to.

The first thing to come to mind is a dedicated server. You’re basically renting an entire server for yourself. But this can be expensive, and, for most use cases, it is way more than you’ll need.

So what’s the best option? A [VPS hosting service](https://www.hostinger.com/tutorials/what-is-vps-hosting).

A Virtual Private Server is exactly what it sounds like. Essentially, the hosting provider creates a layer on the server’s OS, giving you complete control over your virtual machine’s resources and separating it from the rest of the users. This prevents other sites taking resources from yours and allows you to customize your server the way you need.

# 5\. Use a Content Delivery Network (CDN)

Just as we pointed out above, your hosting is nothing more than a machine that stores your site’s data and delivers it through the internet once a browser makes a request.

What it means for your site’s speed is the further your hosting is from the user, the more time it will take the data to get delivered. That’s where a CDN or content delivery network comes to play.

In simple terms, [a CDN is a worldwide network of servers that delivers your site assets](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) (like images, HTML files, JSON files, and more) to your end-users from their nearest server.

You’ll find several options out there, but if you’re in a hurry, we recommend you explore [Cloudflare](https://www.cloudflare.com/cdn/).

If you’re not using a content delivery network, it might be the quickest win you can get.

# 6\. Defer JavaScript loading

When your site loads, the browser downloads every asset your website needs, including JavaScript files.

However, your primary focus needs to be providing your user with the information they want to see on the page. That’s why deferring your JavaScript is so useful to [shorten page load times](https://prerender.io/better-response-times/).

In simple terms, deferring a file prevents it from loading until other (more essential) elements are loaded. You can make your HTML and CSS load first so the user can access the content faster, and only then will the scripts load to add the extra functionality you envisioned for your page.

You can do this by using the _defer_ attribute. Here’s an in-depth guide on [how to efficiently load JavaScript with _defer_](https://flaviocopes.com/javascript-async-defer/).

**Tip:** Another way to load javascript efficiently is to add your scripts right before closing the body tag. This will make the browser parse the whole site before fetching and executing your script.

# 7\. Enable browser caching

Every time a user accesses your website, the browser needs to download all the files that compose your page. What if you can make the browser store the data so that the next time the user types your URL, the browser already has all the information it needs to show its content?

For that, you need to [enable browser caching from your .htaccess file by setting an expiration date for your assets](https://www.hostinger.com/tutorials/website/improving-website-performance-leveraging-browser-cache#Leveraging_Browser_Cache_Using_htaccess).

![](https://miro.medium.com/max/60/0*DWPkOyWdsfLCycH4?q=20)

![](https://miro.medium.com/max/694/0*DWPkOyWdsfLCycH4)

![](https://miro.medium.com/max/1388/0*DWPkOyWdsfLCycH4)

_Image from_ [_Hostinger_](https://www.hostinger.com/)

This will tell the browser to keep those files until the set time.

**Note:** This is a great way to increase your website’s loading speed for returning users.

# 8\. Use lazy loading

Now, let’s reduce the loading time for first-time visitors, shall we?

We want to make the browser render the top of the page first (above the fold content) before loading the rest of the page.

So, instead of waiting for all images and videos to load for the page to be interactive, the browser will ensure that the first portion of the site the user sees loads instantly. This process is what we call lazy loading.

The great thing about it is that we can implement it natively using the _loading_ attribute in our images and iframes.

`<img src=”myimage.jpg” loading=”lazy” alt=”…” />`

`<iframe src=”content.html” loading=”lazy”></iframe>`

These attributes will tell the browser only to download the elements once the user has scrolled to the element and it is now visible on the viewport.

If you want to learn more, here are [five more ways to implement lazy loading](https://www.sitepoint.com/five-techniques-lazy-load-images-website-performance/) by the team at Sitepoint.

## Conclusion

Of course, these are not the only ways to improve website performance.

In fact, there are other methods like using [prefetching techniques](https://soorajchandran.medium.com/speeding-up-your-website-using-prefetching-techniques-8077058b7418) to tell the browser to fetch some elements ahead of time. Nevertheless, after going through these eight steps, your website’s page speed should be more than optimal.

Although site speed is vital to reduce bounce rates and increase user retention, after hitting 85–90 in PageSpeed Insights, for example, you won’t see any significant benefits. Keep that in mind when benchmarking your site and invest your resources intelligently.

I hope you have found this useful. If you have, or feel that there are other methods that we should discuss, please be sure to let us know in the comments.

**About the author:** Zoltan Bettenbuk is the CTO of [Prerender](https://prerender.io/), a software tool that allows search engines to better crawl and index JavaScript websites. He also the CTO at [Scraper API](https://www.scraperapi.com/), which allows developers to collect data from web pages with a simple API call.

_More content at_ [**_plainenglish.io_**](https://plainenglish.io/)
