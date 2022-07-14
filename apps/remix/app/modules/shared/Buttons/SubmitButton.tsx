import { useFormContext, useIsSubmitting } from 'remix-validated-form';
import clsx from 'clsx';

export function SubmitButton({ className }: { className?: string }) {
  const isSubmitting = useIsSubmitting();
  const { isValid } = useFormContext();
  const disabled = isSubmitting || !isValid;

  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx(className, disabled && '!bg-gray3')}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  );
}
