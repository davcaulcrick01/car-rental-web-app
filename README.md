# Luxury Car Rental Web App

This is a Next.js-based web application for a luxury car rental service. It features a responsive design, custom styling with Tailwind CSS, and TypeScript for type safety.

## Project Structure

- `app/`: Contains the main application code
  - `layout.tsx`: The root layout component
  - `page.tsx`: The home page component
  - `globals.css`: Global styles and Tailwind directives
- `components/`: (Create this directory for your React components)
- `public/`: Static assets
- `package.json`: Project dependencies and scripts
- `postcss.config.mjs`: PostCSS configuration for Tailwind
- `tsconfig.json`: TypeScript configuration
- `.eslintrc.json`: ESLint configuration
- `tailwind.config.ts`: Tailwind CSS configuration

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd car-rental-web-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

- `npm run dev`: Runs the app in development mode
- `npm run build`: Builds the app for production
- `npm start`: Runs the built app in production mode
- `npm run lint`: Runs the linter to check for code quality issues

## Customization

- To modify the layout, edit `app/layout.tsx`
- To change global styles, edit `app/globals.css`
- To add new pages, create new files in the `app/` directory
- To create reusable components, add them to the `components/` directory

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deployment

This app can be easily deployed on platforms like Vercel or Netlify. Follow their respective documentation for deploying Next.js applications.

## Tagging  
# For minor version bump
git tag -a v0.1.0 -m "Minor version release"
git push origin v0.1.0

# For major version bump
git tag -a v1.0.0 -m "Major version release"
git push origin v1.0.0
