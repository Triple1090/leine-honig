import { Plus, Mail } from "lucide-react";
import Button from "./Button";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export default async function FAQ() {
  const payload = await getPayload({ config: configPromise });

  const { docs: faqData } = await payload.find({
    collection: "faq-items",
    sort: "sortOrder",
    limit: 20,
  });

  return (
    <div className="mx-auto max-w-4xl" id="faq">
      <div className="mb-12 text-center">
        <h3 className="mb-2 text-2xl font-bold text-stone-900">
          Noch Fragen?
        </h3>
        <p className="text-stone-500">Alles Wichtige auf einen Blick.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {faqData.map((item) => (
          <details
            key={item.id}
            className="group hover:border-primary/20 open:border-primary/10 h-fit rounded-2xl border border-transparent bg-stone-50 transition-all duration-300 open:bg-white open:shadow-md"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between p-5 select-none">
              <span className="group-hover:text-primary pr-4 text-sm font-bold text-stone-800 transition-colors md:text-base">
                {item.question}
              </span>
              <div className="group-open:text-primary flex-shrink-0 text-stone-400 transition-transform duration-300 group-open:rotate-45">
                <Plus size={20} />
              </div>
            </summary>
            <div className="px-5 pt-0 pb-5 text-sm leading-relaxed text-stone-600">
              {item.answer}
            </div>
          </details>
        ))}
      </div>

      <div className="flex items-center justify-center pt-10">
        <Button href="/contactForm" icon={Mail}>
          Kontaktieren Sie uns!
        </Button>
      </div>
    </div>
  );
}
