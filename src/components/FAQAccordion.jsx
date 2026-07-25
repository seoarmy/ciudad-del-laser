import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.q} className="border border-gray-lighter rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-carbon"
              aria-expanded={isOpen}
            >
              {faq.q}
              <ChevronDown
                size={18}
                className={`shrink-0 ml-3 text-orange transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && <p className="px-5 pb-4 text-sm text-gray-text">{faq.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
