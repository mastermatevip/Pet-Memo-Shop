import { SiteImage } from "@/components/shared/SiteImage";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import type { CategoryCard as CategoryCardType } from "@/types";

interface CategoryCardProps {
  category: CategoryCardType;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
      <Link href={`/collections/${category.slug}`} className="block relative aspect-[3/2] overflow-hidden">
        <SiteImage
          src={category.image}
          alt={category.imageAlt}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-btn/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-serif text-xl text-btn-text mb-1">{category.title}</h3>
          <p className="text-highlight text-sm">{category.description}</p>
        </div>
      </Link>
      <div className="p-4">
        <Button href={`/collections/${category.slug}`} variant="outline" size="sm" className="w-full">
          Shop {category.title.split(" ")[0]}
        </Button>
      </div>
    </div>
  );
}
