# Contact Management Application

A modern, feature-rich contact management application built with Next.js 16, React 19, and TypeScript. This application provides an intuitive interface for managing your professional and personal contacts with advanced features like search, pagination, and detailed contact views.

## 🚀 Live Demo

**[View Live Application](https://tria-task-plum.vercel.app/)**

## ✨ Notable Features

- **📱 Responsive Design**: Fully responsive UI that works seamlessly across desktop, tablet, and mobile devices
- **🔍 Real-time Search**: Instantly search contacts by name, email, company, or phone number
- **📄 Smart Pagination**: Efficient pagination with customizable items per page (10, 25, 50, 100)
- **👤 Detailed Contact Views**: Side panel with comprehensive contact information including lead scores, tags, and metadata
- **🌓 Dark Mode Support**: Beautiful light and dark themes with smooth transitions
- **🎨 Modern UI**: Built with Schad CN components and styled with Tailwind CSS for a polished look
- **⚡ Performance Optimized**: Utilizes React 19 features and Next.js 16 optimizations for blazing-fast performance
- **🎯 Type-Safe**: Fully typed with TypeScript for better developer experience and fewer bugs
- **💾 Client-Side State Management**: Efficient state management with React hooks and context
- **🎭 Smooth Animations**: Delightful micro-interactions and animations throughout the app

## 🛠️ Tech Stack & Libraries

### Core Framework
- **[Next.js 16](https://nextjs.org/)** - Latest version with App Router for optimal performance and SEO
- **[React 19.2](https://react.dev/)** - Cutting-edge React features including improved server components
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety and enhanced developer experience

### UI Components & Styling
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives for building high-quality design systems
  - `@radix-ui/react-avatar` - Avatar components with fallback support
  - `@radix-ui/react-dialog` - Modal dialogs for add/edit forms
  - `@radix-ui/react-dropdown-menu` - Accessible dropdown menus
  - `@radix-ui/react-select` - Custom select components
  - `@radix-ui/react-checkbox` - Accessible checkboxes
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework with modern features
- **[tw-animate-css](https://www.npmjs.com/package/tw-animate-css)** - Smooth animations and transitions
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon set

### Utilities
- **[clsx](https://github.com/lukeed/clsx)** - Utility for constructing className strings conditionally
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind CSS classes without style conflicts
- **[class-variance-authority](https://cva.style/docs)** - CSS-in-TS variant API for component styling

## 📦 Project Structure

```
tria/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and Tailwind imports
│   │   ├── layout.tsx           # Root layout with providers
│   │   └── page.tsx             # Main contact management page
│   ├── components/
│   │   ├── AddContactForm.tsx   # Form for adding new contacts
│   │   ├── ContactDetailPanel.tsx # Side panel for viewing contact details
│   │   ├── ContactList.tsx      # Table view of contacts
│   │   ├── Pagination.tsx       # Pagination controls
│   │   ├── SearchBar.tsx        # Search input component
│   │   ├── ThemeSwitcher.tsx    # Dark/light mode toggle
│   │   └── ui/                  # Reusable UI components (shadcn/ui)
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── services/
│   │   └── contactService.ts    # Contact data service layer
│   └── types/
│       └── contact.ts           # TypeScript type definitions
├── public/                       # Static assets
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShahidMollick/tria-task.git
   cd tria-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Design Choices & Assumptions

### Architecture Decisions

1. **Client-Side State Management**: Used React hooks (`useState`, `useEffect`, `useMemo`) for state management as the application is relatively small and doesn't require complex state orchestration. This keeps the bundle size minimal and the code straightforward.

2. **Mock Data Service**: Implemented a service layer (`contactService.ts`) that currently uses mock data but can be easily swapped with a real API integration. This separation of concerns makes future backend integration seamless.

3. **Component Composition**: Followed a modular component structure with clear separation of concerns:
   - UI components are reusable and agnostic to business logic
   - Business logic components handle data fetching and state management
   - Service layer abstracts data operations

4. **Pagination Strategy**: Implemented client-side pagination which works well for the current dataset size. For larger datasets, this can be easily converted to server-side pagination by modifying the `contactService`.

5. **Search Implementation**: Real-time client-side search with debouncing for optimal performance. Searches across multiple fields (name, email, company, phone) for better user experience.

### UI/UX Decisions

1. **Radix UI over Material-UI**: Chose Radix UI for its:
   - Unstyled, accessible components by default
   - Smaller bundle size
   - Greater styling flexibility with Tailwind CSS
   - Better TypeScript support

2. **Dark Mode**: Implemented using CSS variables and Tailwind's dark mode support for seamless theme switching without page reloads.

3. **Responsive Design**: Mobile-first approach with breakpoints that ensure usability across all device sizes.

4. **Animations**: Subtle animations for better user feedback without compromising performance.

### Assumptions

- Contact data is currently stored in memory (mock data)
- No authentication/authorization is required at this stage
- Email and phone formats are not strictly validated (can be added as needed)
- All users have permission to view/add contacts
- The application is intended for single-user use (no multi-tenancy)

## 🔮 Future Enhancements

- **Backend Integration**: Connect to a real API (REST or GraphQL)
- **Authentication**: Add user authentication and authorization
- **Advanced Filtering**: Filter by status, company, lead score, etc.
- **Bulk Operations**: Select multiple contacts for bulk actions
- **Import/Export**: CSV/Excel import and export functionality
- **Contact Groups**: Organize contacts into custom groups
- **Activity Timeline**: Track interactions and notes for each contact
- **Email Integration**: Send emails directly from the app
- **Analytics Dashboard**: Visualize contact data and metrics

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 👤 Author

**Shahid Mollick**

- GitHub: [@ShahidMollick](https://github.com/ShahidMollick)

---

Built with ❤️ using Next.js, React, and TypeScript
