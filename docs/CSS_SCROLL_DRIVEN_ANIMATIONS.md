# CSS Scroll-Driven Animations Migration

## Current State

The site currently uses JavaScript-driven scroll animations:
- GSAP for complex timeline animations
- Framer Motion for React component animations
- Custom SmoothScrollProvider with Lenis for smooth scrolling
- Scroll position tracking via custom hooks

## CSS Scroll-Driven Animations

CSS scroll-driven animations allow animations to be driven by scroll position:
- `animation-timeline: scroll()` - drive animation by scroll progress
- `view-timeline` - drive animation by element visibility
- Off-main-thread execution for better performance

### Browser Support
- Chrome/Edge: Supported (Chrome 115+)
- Firefox: Behind flag (not enabled by default)
- Safari: Not supported

### Current Animation Patterns

The site uses several scroll-driven patterns:
1. **Reveal animations**: Elements fade/slide in as they enter viewport
2. **Parallax effects**: Background elements move at different speeds
3. **Scroll-linked animations**: Animations tied to scroll position
4. **Smooth scrolling**: Lenis provides custom scroll behavior

## Migration Challenges

### 1. Animation Complexity
- GSAP timelines are complex and would need CSS equivalents
- Some animations use easing functions not available in CSS
- Sequenced animations would need restructuring

### 2. Smooth Scrolling Integration
- Lenis smooth scrolling conflicts with native scroll timelines
- Would need to either disable smooth scrolling or find hybrid approach
- Current smooth scroll is a key UX feature

### 3. Feature Detection
- Requires extensive feature detection and fallbacks
- Fallback to JS animations for unsupported browsers
- Dual maintenance of CSS and JS animation paths

### 4. Performance Benefits
- Current animations are already optimized with IntersectionObserver
- Frame gating prevents excessive rAF calls
- Performance benefits may be marginal given existing optimizations

## Recommendation

**Defer CSS scroll-driven animations migration** until:
1. Browser support reaches >90% market share (Firefox/Safari support)
2. Smooth scrolling integration is resolved
3. Clear performance benefit is demonstrated
4. Migration effort can be justified

The current GSAP + Framer Motion + Lenis setup provides:
- Excellent cross-browser compatibility
- Complex animation capabilities
- Smooth scrolling UX
- Adequate performance with existing optimizations

## Future Implementation

When adoption makes sense:
1. Start with simple reveal animations (easiest to migrate)
2. Use feature detection with @supports
3. Keep JS fallbacks for unsupported browsers
4. Gradually migrate complex animations
5. Consider hybrid approach for smooth scrolling
