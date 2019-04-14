---
nav_order: 95
---

# How does it work

## Overview
  - for drawing, we are using [webrender](https://github.com/servo/webrender) library, despite its name, it has very little to do with web, it doesn't do flexbox, nor text layout
  - webrender is about drawing as many rects and glyphs as possible (in parallel) using GPU
  - conceptually, every frame has to be drawn from scratch (in correct order), yet it's faster than usual approach
  - drawing UI on GPU is very different from classic approach, we implement few shader programs and then we "just" fill big buffers of floats
  - but everything has to be prepared and well-thought in advance (it's really hard work, not to mention there are bugs in GPU drivers, multiplied by platforms and versions you support, etc.)
  - webrender does this for us and provides an api

## webrender api
  - webrender retains some info about the scene so it can do scrolling/zooming and hitbox testing for us (without rebuilding the scene), so it is not entirely stateless but I wouldn't call it retained-mode either (we don't hold instances of anything)
  - api is useful for font-loading, text measurements, font glyph resolving but also for sending **transactions**
  - nothing is rendered unless transaction is sent (and async **processed**, which is when we swap buffers, etc.)
  - even scrolling/zooming has to be sent in trasaction
  - transaction can also "set" **display list** which is how scene will get rebuilt and re-rendered eventually
  - display list is a binary blob of display items and to make one, it's easiest to use a **builder** (provided by webrender) which has methods like push_rect() and similar
  - **all of this is done in rust**, to avoid crossing boundaries (communication with JS should be kept at minimum)

### drawing from JS
  - one obvious way would be to send JSON (or something) to native, parse it and build the display list on every UI change
    - this is simple and it would actually work but it's also very wasteful because everything has to be visited, generated, serialized, sent and parsed over and over again
  - another approach could be to implement some kind of DOM api which could be then used from JS
    - which sounds good at first but native is really a whole different world and just getting it right is a lot of work, not to mention there's always some overhead so it's impossible to tell if this would be any faster
  - in this light, IPC is not that bad if we can improve it
    - for example, we could have a (window-local) vector of all display items in their creation order
    - any UI change would send JSON (or something) to replace display item in-place (so it's like a bucket)
    - to generate a display list we just need indices of those items
    - this could/should be fast because everything is in the same area of memory so it should go through CPU caches
    - we can also separate the layout (position and dimensions) which will further reduce the need for updates
