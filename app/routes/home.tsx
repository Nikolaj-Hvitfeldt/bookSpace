import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Address Book" },
    { name: "description", content: "React Router TypeScript boilerplate" },
  ];
}

export default function Home() {
  return (
    <section>
      <h1>Address Book Boilerplate</h1>
      <p>Project initialized with React Router framework mode and TypeScript.</p>
    </section>
  );
}
