/* This example requires Tailwind CSS v2.0+ */
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
interface Props {
  path: string;
  title: string;
}

export default function BackButton({ path, title }: Props) {
  return (
    <nav className="flex items-center" aria-label="Breadcrumb">
      <div className="flex items-center">
        <Link to={path}>
          <span
            className="flex items-center gap-3 mr-4 text-base font-medium text-gray-500 hover:text-gray-700"
            aria-current={"page"}
          >
            <ChevronLeftIcon
              className="flex-shrink-0 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            {title}
          </span>
        </Link>
      </div>
    </nav>
  );
}
