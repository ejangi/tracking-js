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

Debugging
------------

You can turn Google Analytic's debugging on by including the following meta tag:

<pre><code>&#x3C;meta name=&#x22;ga-debug&#x22; content=&#x22;true&#x22;&#x3E;</code></pre>

Similarly, if you want Google Analytic's full stack track in the console, include the following meta tag as well as the above:

<pre><code>&#x3C;meta name=&#x22;ga-trace&#x22; content=&#x22;true&#x22;&#x3E;</code></pre>