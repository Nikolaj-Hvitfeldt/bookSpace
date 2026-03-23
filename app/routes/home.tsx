import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Address Book" },
    { name: "description", content: "React Router TypeScript boilerplate" },
  ];
}

export default function Home() {
  return (
    <div className="wrapper">
      <div className="home-header" /> Search bar and banner
      <div className="book-section mt-10" /> Book row Currently reading
      <div className="book-section mt-10" /> Book row Recommended
      <div className="book-section mt-10" /> Book row etc etc
    </div>
  );
}
