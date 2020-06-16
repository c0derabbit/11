---
layout: post.njk
title: "Fathom: a better alternative to Google Analytics"
date: 2020-02-02
---
Almost everyone says they take privacy seriously, but almost everyone has an annoying cookie notice because they collect a bit more information than they are allowed to without explicit consent.[^1]

Fathom co-founder [Paul Jarvis](https://twitter.com/pjrvs/) [explains  the problem](https://usefathom.com/blog/blackhole) way better than I could:

> “I’m not sure when it happened, but tracking users and people across the internet has become almost the default thing to do.”

But this post is not (entirely) about tracking and GDPR. I’d just like to argue why Fathom is enough and, more importantly, how to implement it.

## Part one: finding a better way

### What’s wrong with Google Analytics?

When using Google Analytics, we share a lot of information with Google about how my visitors use my website. We have no reason to do so, because we should collect (and share) as little information as possible[^2] to fulfil our needs. 

If we need to know how many visitors we have over a given period, how long they stay, what pages they view, and what their bounce rate is, that’s all we need to know. Sharing this with anyone will not add any value. It’s a bit like knowing a personal fact about a co-worker and telling someone we trust, but can we *really* trust them?[^3]

### The good news: analytics can respect privacy

There exist solid self-hosted alternatives that provide full ownership and control of the information we collect:

* **[Matomo](https://matomo.org/why-matomo/)** for when you do this for the marketing department, and
* **[Fathom](https://usefathom.com)** for the minimalist.

As a bonus, both are open-source.[^4]

I have not tried Matomo, but it looks like an enterprise-ready tool featuring A/B testing, heat maps, user paths, geography, device and browser information etc. The full package.

On the other side of the spectrum, Fathom is really bare-bones, it only gives you the key numbers, and it does that on a single screen.

![](/img/fathom.png "Screenshot of my own Fathom dashboard, right after setting it up")

### Where Fathom lacks and why that’s OK

Where I would find it lacking in an enterprise setting is probably geography and user agent information. But how important are these?

#### Geography

What do we use location analytics for? Localisation/i18n could be one thing, but that should be done proactively (e.g. if we want to sell in Germany, we should show prices in € and translate).

#### User agent (browser, device, screen size etc.)

Looking at user agent stats can only underline the importance of cross-browser testing, responsiveness and accessibility. Even if 99.99% of visitors visit from desktop, we should still make sure the website or web app is at least usable on mobile and screen readers. There is some added value in this information though: showing some charts to stakeholders who don’t believe that the web should be universally accessible.

All in all, the important numbers are there. It would probably be challenging to convince a marketing department to switch to Fathom (although I may give Matomo a try). But in may well be possible — after all, privacy concerns are gaining momentum. How many companies can truthfully say that privacy is more important for them than knowing who is visiting?

- - -

## Part two: self-hosting Fathom

**💡 Note: this costs money**, $5/month on DigitalOcean’s smallest droplet.

I’m not a routine self-hoster, but setting up Fathom was pretty straightforward (except for the https part — I had to figure out the correct order of steps to be taken).

DigitalOcean conveniently has a [Fathom Analytics image](https://cloud.digitalocean.com/marketplace/5c520a5b3201e30d52590370?i=7012c3). Just click create, choose the cheapest plan available, setup SSH keys, and create droplet.

![](/img/droplets.gif "Clicking the left arrow reveals cheaper droplets.")

### Configuration

Follow the getting started guide: `ssh root@your_droplet_ip`, and follow prompts.

### Setting up HTTPS

This is an absolute must to make the tracker script work on HTTPS websites.

1. Create an A record for the domain you want to point at your Fathom instance. With [Zeit](https://zeit.co/domains/) domains, this is done by `now dns add your-domain.com A xxx.xxx.xxx.xxx`, where the last parameter is the IP address of your droplet.
2. `ssh` into the Fathom instance, and run `certbot --nginx -d your-domain.com`, which will ask you a couple of questions and issue an SSL cert using Let’s Encrypt.
3. Now is a good time to add a firewall on DigitalOcean. Navigate to [Networking → Firewalls](https://cloud.digitalocean.com/networking/firewalls), click ‘Create Firewall’, and add a new inbound rule for HTTPS. Apply to your Fathom droplet and you’re done!

### Adding analytics to a website

In the top right corner, click ‘Add another site’. Fathom will spit out a tracking code that you can add to your site’s HTML. Alternatively, if using Gatsby, [there’s a plugin for that](https://www.gatsbyjs.org/packages/gatsby-plugin-fathom/).

- - -

#### Notes

[^1]: If you’d like to dig deeper in this topic, [ICO’s guide on individual rights](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/) is exhaustive and human-readable. [^2]: See GDPR [data minimisation principle](https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/data-minimisation/) [^3]: I spent five minutes searching for the perfect *The Office* gif to illustrate this, to no avail. Please email me if you find it. [^4]: GitHub repos: [matomo-org/matomo](https://github.com/matomo-org/matomo) and [usefathom/fathom](https://github.com/usefathom/fathom)
