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