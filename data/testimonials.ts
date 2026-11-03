export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "CTO" or "Founder". */
  role?: string;
  /** Company or project. Leave out if the client wants to stay anonymous. */
  company?: string;
};

/**
 * Add real client quotes here. The Testimonials section renders nothing while this list is empty,
 * so it is safe to deploy as is. Only add quotes you have permission to publish.
 *
 * Example:
 *   { quote: "Gregory shipped on time and the system just works.", name: "Jane Doe", role: "Operations Manager" },
 */
export const testimonials: Testimonial[] = [];
