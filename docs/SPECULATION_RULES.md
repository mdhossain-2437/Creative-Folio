# Speculation Rules API Adoption

## Current State

The site currently uses Next.js built-in prefetching:
- `<Link>` components with `prefetch` behavior
- Route prefetching via `RoutePrefetcher` component
- Dynamic imports for code splitting

## Speculation Rules API

The Speculation Rules API provides a declarative way to hint to browsers about:
- Prefetching resources
- Prerendering pages
- Navigational intent

### Browser Support
- Chrome/Edge: Supported (Chrome 121+)
- Firefox: Not supported
- Safari: Not supported

### Implementation Considerations

1. **Fallback Required**: Since Firefox and Safari don't support it, we need fallback logic
2. **Complexity**: Adding speculation rules adds complexity without clear benefit for this site
3. **Current Performance**: The existing Next.js prefetching already provides good performance

## Recommendation

**Defer Speculation Rules API adoption** until:
1. Browser support reaches >90% market share
2. Clear performance benefit is demonstrated for this specific site
3. The complexity can be justified

The current Next.js prefetching strategy combined with the existing `RoutePrefetcher` component provides adequate performance for the current navigation patterns.

## Future Implementation

When adoption makes sense, the implementation would involve:
1. Create `/speculation-rules` route handler
2. Add `<link rel="speculationrules">` to layout
3. Define rules for key navigation paths
4. Add feature detection for browser support
