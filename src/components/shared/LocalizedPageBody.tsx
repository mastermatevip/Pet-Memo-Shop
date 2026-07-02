import type { PageSection } from "@/lib/localized-content";

export function LocalizedPageBody({ sections }: { sections: PageSection[] }) {
  return (
    <div className="prose-memorial space-y-6">
      {sections.map((section, index) => {
        if (section.type === "h2") {
          return <h2 key={index}>{section.text}</h2>;
        }
        if (section.type === "ul" && section.items) {
          return (
            <ul key={index}>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{section.text}</p>;
      })}
    </div>
  );
}
