Tracking JS
===========

This simple file is a self contained Google Analytics initialiser with basic Event Tracking and Enhanced Link Tracking enabled by default.

Currently, Tracking JS only supports Universal Analytics.

Usage
---------

To use Tracking JS, simply include a meta the meta tag that defines your Google Tracking ID like so:

<pre><code>&#x3C;meta name=&#x22;ga-trackingid&#x22; content=&#x22;[Your Tracking ID]&#x22;&#x3E;</code></pre>

Then, copy the tracking-js.min.js file to your scripts folder and include using a &#x3C;script&#x3E; tag at the bottom of your HTML file, just before the closing &#x3C;/body&#x3E; tag. 

Here's an example:

<pre><code>&#x3C;!doctype html&#x3E;
&#x3C;html&#x3E;
&#x9;&#x3C;head&#x3E;
&#x9;&#x9;&#x3C;title&#x3E;My Webpage&#x3C;/title&#x3E;
&#x9;&#x9;&#x3C;meta name=&#x22;ga-trackingid&#x22; content=&#x22;UA-00000000-01&#x22;&#x3E;
&#x9;&#x3C;/head&#x3E;
&#x9;&#x3C;body&#x3E;
&#x9;&#x9;&#x3C;h1&#x3E;Tracking.JS Test Page&#x3C;/h1&#x3E;
&#x9;&#x9;&#x3C;script src=&#x22;scripts/tracking-js.min.js&#x22;&#x3E;&#x3C;/script&#x3E;
&#x9;&#x3C;/body&#x3E;
&#x3C;/html&#x3E;</code></pre>

Features
------------

You can use the ga-features meta tag to enable any of the following list of features:

- [Demographics and Interest Reports](https://support.google.com/analytics/answer/2444872?authuser=2) (displayfeatures)
- [Enhanced Link Attribution](https://support.google.com/analytics/answer/2558867?hl=en) (linkid)
- [Event Tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/events) of non-hit links (events) **

To enable all features, you can use a comma-separated list (no spaces):

<pre><code>&#x3C;meta name=&#x22;ga-features&#x22; content=&#x22;displayfeatures,linkid,events&#x22;&#x3E;</code></pre>

** <small>Event Tracking (events) includes: 

- Outbound links
- a[href^=javascript]
- a[href^=tel]
- a[href^=mailto]
- a[href^=#]
- a[href$=zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav].
</small>

User ID
------------

If you wish to take advantage of Google Analytics's [User ID](https://developers.google.com/analytics/devguides/collection/analyticsjs/user-id) tracking feature, you can simply set the ga-userid variable using the following meta tag:

<pre><code>&#x3C;meta name=&#x22;ga-userid&#x22; content=&#x22;[your user id]&#x22;&#x3E;</code></pre>

Custom Dimensions and Metrics
-------------------------------

You can capture your [Custom Dimensions and Metrics](https://developers.google.com/analytics/devguides/platform/customdimsmets) using meta tags in the following fashion:

<pre><code>&#x3C;meta name=&#x22;ga-dimension1&#x22; content=&#x22;[dimension 1 value]&#x22;&#x3E;
&#x3C;meta name=&#x22;ga-dimension2&#x22; content=&#x22;[dimension 2 value]&#x22;&#x3E;
&#x3C;meta name=&#x22;ga-metric1&#x22; content=&#x22;[metric 1 value]&#x22;&#x3E;</code></pre>

Campaigns
------------

To track which campaigns are driving traffic to your website, you can use the [Custom Campaign tags](https://support.google.com/analytics/answer/1033863?hl=en) (<small>e.g. http://example.com/?utm_campaign=My+Campaign&amp;utm_medium=email</small>). However, if you want to set campaign fields manually, you can use the following meta tags:

<pre><code>&#x3C;meta name=&#x22;campaignName&#x22; content=&#x22;[your campaign name]&#x22;&#x3E;
&#x3C;meta name=&#x22;campaignSource&#x22; content=&#x22;[your campaign source]&#x22;&#x3E;
&#x3C;meta name=&#x22;campaignMedium&#x22; content=&#x22;[your campaign medium]&#x22;&#x3E;
&#x3C;meta name=&#x22;campaignContent&#x22; content=&#x22;[your campaign content]&#x22;&#x3E;
&#x3C;meta name=&#x22;campaignKeyword&#x22; content=&#x22;[your campaign keyword]&#x22;&#x3E;</code></pre>

Debugging
------------

You can turn Google Analytics's debugging on by including the following meta tag:

<pre><code>&#x3C;meta name=&#x22;ga-debug&#x22; content=&#x22;true&#x22;&#x3E;</code></pre>

Similarly, if you want Google Analytics's full stack track in the console, include the following meta tag as well as the above:

<pre><code>&#x3C;meta name=&#x22;ga-trace&#x22; content=&#x22;true&#x22;&#x3E;</code></pre>