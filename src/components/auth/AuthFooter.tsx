import { Link } from 'react-router'
import { Button } from '../ui/button'

interface AuthFooterProps {
  question: string
  linkText: string
  linkTo: string
  className?: string
  isButtonDisabled?: boolean
  buttonText?: string
  onSubmit?: () => void
  disabled?: boolean
  hideSubmitButton?: boolean
}

export const AuthFooter = ({
  question,
  linkText,
  linkTo,
  className,
  isButtonDisabled,
  onSubmit,
  buttonText,
  disabled,
  hideSubmitButton
}: AuthFooterProps) => (
  <div className="flex flex-col gap-4">
    {!hideSubmitButton && (
      <Button
        type="submit"
        className="focus-visible:foutline-none h-10 w-full !bg-orange-600 outline-none hover:!border-orange-700 focus:!outline-none"
        onClick={onSubmit}
        disabled={disabled || isButtonDisabled}
      >
        {buttonText}
      </Button>
    )}

    <p className={`text-center text-sm text-gray-500 ${className ?? ''}`}>
      {question}
      <Link
        to={linkTo}
        className="ml-1 text-sm !text-orange-600"
      >
        {linkText}
      </Link>
    </p>
  </div>
)
