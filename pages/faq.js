import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../app/globals.css';

const faqs = [
    { question: 'What is Next.js?', answer: 'Next.js is a React framework for building web applications.' },
    { question: 'How does Tailwind CSS work?', answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.' },
    { question: 'What is the purpose of getStaticProps?', answer: 'getStaticProps is used to fetch data at build time in Next.js.' },
    { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces, developed by Facebook.' },
    { question: 'How do you create a new Next.js project?', answer: 'You can create a new Next.js project using the command: npx create-next-app.' },
    { question: 'What is the difference between SSR and SSG?', answer: 'SSR (Server-Side Rendering) renders pages on each request, while SSG (Static Site Generation) generates HTML at build time.' },
    { question: 'What is a custom hook in React?', answer: 'A custom hook is a reusable function in React that starts with "use" and can call other hooks.' },
    { question: 'How do you style components in Next.js?', answer: 'You can style components in Next.js using CSS, Sass, styled-components, or Tailwind CSS.' },
    { question: 'What is the role of a Head component in Next.js?', answer: 'The Head component is used to modify the <head> of a page, such as adding meta tags, titles, and links to stylesheets.' },
    { question: 'What is API route in Next.js?', answer: 'API routes in Next.js allow you to build API endpoints as serverless functions that can be called from the frontend.' },
    { question: 'What is the purpose of useEffect in React?', answer: 'The useEffect hook in React is used to perform side effects, such as data fetching, after the component renders.' },
    { question: 'How can you manage state in a Next.js application?', answer: 'State in a Next.js application can be managed using React’s useState and useReducer hooks, as well as global state management libraries like Redux or Context API.' },
    { question: 'What is hot reloading in Next.js?', answer: 'Hot reloading in Next.js allows you to see changes in your code instantly without refreshing the entire application.' },
    { question: 'How does Next.js handle routing?', answer: 'Next.js uses a file-based routing system where each file in the "pages" directory corresponds to a route in the application.' },
];

export default function Faq() {
    const router = useRouter();
    const { query: urlQuery } = router.query;
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (urlQuery) {
            setQuery(urlQuery);
        }
    }, [urlQuery]);

    useEffect(() => {
        const newQuery = query ? { query } : {};
        if (query) {
            router.push({
                pathname: router.pathname,
                query: newQuery,
            }, undefined, { shallow: true });
        }
    }, [query]);

    const [expandedItems, setExpandedItems] = useState({});
    const toggleExpand = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(query.toLowerCase())
    );

    const expandAll = () => {
        const allExpanded = {};
        filteredFaqs.forEach((_, index) => {
            allExpanded[index] = true;
        });
        setExpandedItems(allExpanded);
    };

    const collapseAll = () => {
        setExpandedItems({});
    };

    return (
        <div className="max-w-4xl mx-auto py-6 xs:px-2 sm:px-4 min-h-screen">
            <h1 className="sm:text-xl sm:text-1xl md:text-2xl lg:text-3xl font-bold mb-6">Frequently Asked Questions</h1>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-6"
            />
            <div className="flex space-x-2 mb-6">
                <button onClick={expandAll} className="px-4 py-2 bg-blue-400 text-white rounded">Expand All</button>
                <button onClick={collapseAll} className="px-4 py-2 bg-red-400 text-white rounded">Collapse All</button>
            </div>
            <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                    <div key={index} onClick={() => toggleExpand(index)}>
                        <button className="flex justify-between w-full items-center">
                            <h2 className="text-xl text-left font-semibold cursor-pointer xs:text-base">{faq.question}</h2>
                            <span className="text-2xl">{expandedItems[index] ? '-' : '+'}</span>
                        </button>
                        <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600
                            ${expandedItems[index] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                        `}>
                            <p className="text-lg xs:text-base overflow-hidden text-gray-700">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
