import { FC } from "react";
import { Project } from "../../../graphql/types.generated";

const projects = [
  {
    id: 1,
    name: "Next.js",
    category: "JS framework",
    href: "#",
    price: "",
    imageSrc:
      "https://assets.vercel.com/image/upload/q_auto/front/assets/design/white-nextjs.png",
    imageAlt: "The React Framework for Production",
  },
  {
    id: 1,
    name: "Radix UI",
    category: "UI Kit",
    href: "#",
    price: "",
    imageSrc: "https://www.radix-ui.com/social/default.png",
    imageAlt:
      "Unstyled, accessible components for building high‑quality design systems and web apps in React.Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  {
    id: 2,
    name: "React",
    category: "JS library",
    href: "#",
    price: "",
    imageSrc: "https://create-react-app.dev/img/logo-og.png",
    imageAlt: "React",
  },
  {
    id: 3,
    name: "Nuxt",
    category: "JS framework",
    href: "#",
    price: "",
    imageSrc: "https://i.ytimg.com/vi/PkdY8vfNxQs/maxresdefault.jpg",
    imageAlt: "Nuxt",
  },
];

interface RecommendedProjectsProps {
  projects: Project[];
}

const RecommendedProjects: FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-5">
      <div className="flex items-center justify-between space-x-4">
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
          Selected for you
        </h2>
        <a
          href="#"
          className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View all<span aria-hidden="true"> &rarr;</span>
        </a>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        {projects.map((project) => (
          <div key={project.name} className="relative group">
            <div className="aspect-w-4 aspect-h-2 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={project.imageSrc}
                alt={project.imageAlt}
                className="object-center object-cover"
              />
              <div
                className="flex items-end opacity-0 p-4 group-hover:opacity-100"
                aria-hidden="true"
              >
                <div className="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center">
                  View
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
              <h3>
                <a href="#">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {project.name}
                </a>
              </h3>
              <p>{project.price}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">{project.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProjects;
