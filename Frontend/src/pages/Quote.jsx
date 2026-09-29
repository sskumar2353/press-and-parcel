import PageHero from "../components/PageHero";
import QuoteForm from "../components/QuoteForm";

export default function Quote() {
  return (
    <>
      <PageHero eyebrow="GET A QUOTE" title="Start with the requirement." text="Give us the essentials. For custom jobs, we can refine specifications after the initial enquiry." />
      <section className="section">
        <div className="container quote-page">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
