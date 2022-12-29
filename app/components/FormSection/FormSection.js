export default function FormSection({ children, ...props }) {
  return (
    <section className="form-section" {...props}>
      {children}
    </section>
  );
}
