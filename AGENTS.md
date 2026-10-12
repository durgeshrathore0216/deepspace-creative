<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep personal content and project definitions in the shared portfolio data module so customization does not require changing presentation logic.
- Keep the existing TanStack Start routing and deployment bootstrap; this environment does not support replacing it with Next.js.
- Dynamically import the Three.js scene behind ClientOnly so browser graphics never execute during server rendering.
- Use Lenis on the GSAP ticker and Framer Motion for interface transitions, with reduced-motion and coarse-pointer fallbacks.
- Contact is an explicit mail-client handoff, not a hosted submission; missing personal links must show honest unavailable states rather than fabricated destinations.
