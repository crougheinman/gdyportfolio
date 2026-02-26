# Reusable Navigation Menu

This portfolio website now includes a reusable navigation menu that can be shared across multiple HTML pages.

## How it works

1. **nav.html** - Contains the navigation menu HTML structure
2. **nav-loader.js** - JavaScript that loads and inserts the navigation into pages
3. **index.html** - Main page using the reusable navigation
4. **about.html** - Example secondary page using the same navigation

## How to use in new pages

To add the reusable navigation to any new HTML page:

1. Include the nav-loader.js script at the end of your HTML file:
```html
<script src="nav-loader.js"></script>
```

2. Add a placeholder div in your header where the navigation should appear:
```html
<nav id="navbar" class="nav-menu navbar">
  <div id="nav-placeholder">
    <!-- Navigation will be loaded here -->
  </div>
</nav>
```

3. Make sure the nav.html and nav-loader.js files are in the same directory as your HTML page, or update the paths accordingly.

## Benefits

- **DRY Principle**: Navigation code is written once and reused
- **Easy Maintenance**: Changes to navigation only need to be made in nav.html
- **Consistency**: All pages will have identical navigation
- **Performance**: Navigation loads asynchronously without blocking page render

## Customization

To modify the navigation menu, edit the `nav.html` file. Changes will automatically apply to all pages using this navigation system.