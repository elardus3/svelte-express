## First design choice

My first attempt was a frontend-first solution. The fetch products endpoint was called once only on component
initialization, or via retry button if a random error is encountered at first. The text searching, filtering and sorting
was done client side only as a zero lag approach, implying rudimentary caching. A more sophisticated caching mechanism,
presumably the Tanstack library frequently used in React and Vue apps, would be an option too.

However, this first design choice didn't tick all the API endpoint requirements as stated, thus a second solution was
attempted... leading to a more backend focused implementation as the Svelte portion was completed quickly in comparison.

## Type strictness

I attempted a fully type strict solution, though the backend can be improved in a future version.

## Increase component usage

Using reusable or repeating components like product cards and the user input form section would lead to a cleaner
entry point code, I decided to get a less elegant working prototype done at first.

## Autocomplete text search

This proposal needs more discussion as I'm unsure a standard HTML dropdown will provide adequate non-keyboard focused
input. As a future improvement, multiple space separated words of search text could be handled, currently a single
continuous chunk is catered for.

## Debounce search

Instead of calling the endpoint on each keystroke search value change, a debounce throttle tactic will ease off
unnecessary api calls.

## UI layout

The user interface layout lend itself to improvement during the next code iteration.

## API route automated tests

I'm unsure whether mocking the API unit tests was done correctly, please review.

## AI usage

No specific AI tools were used. My IDE WebStorm has intelligent auto-completion that I do accept or adapt when suggested.
